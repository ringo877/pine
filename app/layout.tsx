import type { Metadata } from 'next'
import { M_PLUS_Rounded_1c } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const font = M_PLUS_Rounded_1c({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  title: '「妖精戦士ぱいんちゃん」公式サイト',
  description:
    'アニメ「妖精戦士ぱいんちゃん」の公式サイトです。放送・配信情報やスタッフ・キャスト、おはなしのあらすじ、キャラクターや用語など、様々な情報をお届けします。',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={font.className}>
      <body className="min-h-screen" style={{ backgroundColor: '#FFFBF0' }}>
        <Header />
        <main className="max-w-5xl mx-auto px-4 py-6 pb-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
