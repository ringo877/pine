import json
import boto3
import urllib.parse

RECIPIENT_EMAIL = 'REDACTED_EMAIL'
SENDER_EMAIL = 'REDACTED_EMAIL'  # SESで検証済みのアドレス
SES_REGION = 'ap-northeast-1'

CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
}


def lambda_handler(event, context):
    # CORSプリフライトリクエストへの対応
    method = event.get('requestContext', {}).get('http', {}).get('method', '')
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    try:
        body = event.get('body', '')
        if event.get('isBase64Encoded'):
            import base64
            body = base64.b64decode(body).decode('utf-8')

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

        ses = boto3.client('ses', region_name=SES_REGION)
        ses.send_email(
            Source=SENDER_EMAIL,
            Destination={'ToAddresses': [RECIPIENT_EMAIL]},
            Message={
                'Subject': {'Data': '【ぱいんちゃん】人気投票応募が届きました', 'Charset': 'UTF-8'},
                'Body': {'Text': {'Data': email_body, 'Charset': 'UTF-8'}},
            },
            ReplyToAddresses=[email] if email != '（未入力）' else [],
        )

        return {
            'statusCode': 200,
            'headers': {**CORS_HEADERS, 'Content-Type': 'application/json'},
            'body': json.dumps({'message': 'success'}),
        }

    except Exception as e:
        print(f'Error: {e}')
        return {
            'statusCode': 500,
            'headers': {**CORS_HEADERS, 'Content-Type': 'application/json'},
            'body': json.dumps({'message': 'error'}),
        }
