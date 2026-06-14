import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const RECIPIENT = 'REDACTED_EMAIL'

export async function POST(req: NextRequest) {
  try {
    const text = await req.text()
    const params = new URLSearchParams(text)

    const get = (key: string) => params.get(key) ?? '（未入力）'
    const name            = get('name')
    const tel             = get('tel')
    const email           = get('email')
    const media           = params.getAll('media').join('、') || '（未選択）'
    const character       = get('character')
    const characterReason = get('character_reason')
    const story           = get('story')
    const storyReason     = get('story_reason')
    const impression      = get('impression')

    const body = `「妖精戦士ぱいんちゃん」人気投票 応募内容

■ お名前：${name}
■ 電話番号：${tel}
■ メールアドレス：${email}
■ 視聴媒体：${media}

■ 好きなキャラクター：${character}
　理由：${characterReason}

■ 好きなおはなし：${story}
　理由：${storyReason}

■ 感想：
${impression}
`

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_ADDRESS,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: process.env.GMAIL_ADDRESS,
      to: RECIPIENT,
      subject: '【ぱいんちゃん】人気投票応募が届きました',
      text: body,
      ...(email !== '（未入力）' ? { replyTo: email } : {}),
    })

    return NextResponse.json({ message: 'success' })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ message: 'error' }, { status: 500 })
  }
}
