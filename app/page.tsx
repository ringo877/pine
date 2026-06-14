import Hero from '@/components/Hero'
import Reveal from '@/components/Reveal'
import { announcements } from '@/data/site'
import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* サイト紹介 */}
      <Reveal className="mt-10 text-center max-w-2xl mx-auto">
        <p className="text-gray-600 leading-relaxed">
          アニメ「妖精戦士ぱいんちゃん」の公式サイトです。<br />
          放送・配信情報やスタッフ・キャスト、おはなしのあらすじ、キャラクターや用語など、様々な情報をお届けします。
        </p>
        <p className="mt-3 text-xs text-gray-400">
          ※当サイト内の画像は、全て「いらすとや」さんからお借りしております。「いらすとや」{' '}
          <a
            href="https://www.irasutoya.com/"
            className="text-[#FF8FB1] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.irasutoya.com/
          </a>
        </p>
      </Reveal>

      {/* お知らせ */}
      <Reveal className="mt-12" delay={0.1}>
        <h2 className="text-2xl font-black text-gray-800 text-center mb-6">
          <span className="relative inline-block pb-1">
            お知らせ
            <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#FFD93D] rounded-full" />
          </span>
        </h2>
        <div className="bg-white rounded-2xl shadow-sm border border-[#FFD93D]/30 divide-y divide-[#FFD93D]/20">
          {announcements.map((a, i) => (
            <div key={i} className="px-6 py-4 flex items-center gap-4">
              <time className="text-[#FF8FB1] text-sm font-bold whitespace-nowrap">{a.date}</time>
              {a.href ? (
                <Link href={a.href} className="text-gray-700 hover:text-[#FF8FB1] transition-colors text-sm">
                  {a.text}
                </Link>
              ) : (
                <span className="text-gray-700 text-sm">{a.text}</span>
              )}
            </div>
          ))}
        </div>
      </Reveal>
    </>
  )
}
