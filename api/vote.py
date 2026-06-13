from http.server import BaseHTTPRequestHandler
import json
import os
import smtplib
import urllib.parse
from email.mime.text import MIMEText

RECIPIENT_EMAIL = 'REDACTED_EMAIL'
GMAIL_ADDRESS = os.environ.get('GMAIL_ADDRESS', '')
GMAIL_APP_PASSWORD = os.environ.get('GMAIL_APP_PASSWORD', '')

CORS_HEADERS = [
    ('Access-Control-Allow-Origin', '*'),
    ('Access-Control-Allow-Headers', 'Content-Type'),
    ('Access-Control-Allow-Methods', 'POST, OPTIONS'),
]


class handler(BaseHTTPRequestHandler):

    def do_OPTIONS(self):
        self.send_response(200)
        for k, v in CORS_HEADERS:
            self.send_header(k, v)
        self.end_headers()

    def do_POST(self):
        try:
            length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(length).decode('utf-8')
            params = urllib.parse.parse_qs(body)

            def get(key):
                return params.get(key, ['（未入力）'])[0]

            name             = get('name')
            tel              = get('tel')
            email            = get('email')
            media            = '、'.join(params.get('media', ['（未選択）']))
            character        = get('character')
            character_reason = get('character_reason')
            story            = get('story')
            story_reason     = get('story_reason')
            impression       = get('impression')

            email_body = f"""「戦闘妖精ぱいんちゃん」人気投票 応募内容

■ お名前：{name}
■ 電話番号：{tel}
■ メールアドレス：{email}
■ 視聴媒体：{media}

■ 好きなキャラクター：{character}
　理由：{character_reason}

■ 好きなおはなし：{story}
　理由：{story_reason}

■ 感想：
{impression}
"""

            msg = MIMEText(email_body, 'plain', 'utf-8')
            msg['Subject'] = '【ぱいんちゃん】人気投票応募が届きました'
            msg['From'] = GMAIL_ADDRESS
            msg['To'] = RECIPIENT_EMAIL
            if email != '（未入力）':
                msg['Reply-To'] = email

            with smtplib.SMTP('smtp.gmail.com', 587) as smtp:
                smtp.starttls()
                smtp.login(GMAIL_ADDRESS, GMAIL_APP_PASSWORD)
                smtp.send_message(msg)

            self._json(200, {'message': 'success'})

        except Exception as e:
            print(f'Error: {e}')
            self._json(500, {'message': 'error'})

    def _json(self, status, data):
        body = json.dumps(data).encode('utf-8')
        self.send_response(status)
        for k, v in CORS_HEADERS:
            self.send_header(k, v)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)
