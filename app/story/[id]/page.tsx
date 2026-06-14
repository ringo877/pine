import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { episodes } from '@/data/episodes'

export function generateStaticParams() {
  return episodes.map((ep) => ({ id: String(ep.id) }))
}

export default async function EpisodePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const ep = episodes.find((e) => e.id === Number(id))
  if (!ep) notFound()

  const prev = episodes.find((e) => e.id === ep.id - 1)
  const next = episodes.find((e) => e.id === ep.id + 1)

  return (
    <div className="max-w-2xl mx-auto">
      {/* パンくず */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/story" className="hover:text-[#FF8FB1] transition-colors">おはなし</Link>
        <span>/</span>
        <span className="text-gray-600">{ep.slug}「{ep.title}」</span>
      </div>

      {/* メインカード */}
      <div className="bg-white rounded-3xl shadow-sm border border-[#FFD93D]/30 overflow-hidden">
        {/* 画像エリア */}
        <div className="relative h-80 md:h-[28rem] bg-gradient-to-b from-yellow-50 to-pink-50">
          <Image
            src={ep.image}
            alt={`${ep.slug}「${ep.title}」のイメージ`}
            fill
            className="object-contain p-2"
            priority
          />
        </div>

        {/* テキストエリア */}
        <div className="p-6 md:p-8">
          <p className="text-[#FF8FB1] text-sm font-black tracking-widest mb-2">{ep.slug}</p>
          <h1 className="text-2xl md:text-3xl font-black text-gray-800 mb-6">「{ep.title}」</h1>
          <p className="text-gray-700 leading-loose text-base">{ep.synopsis}</p>
        </div>
      </div>

      {/* 前後ナビ */}
      <div className="flex justify-between gap-4 mt-8">
        {prev ? (
          <Link
            href={`/story/${prev.id}`}
            className="flex-1 bg-white border border-[#FFD93D]/40 rounded-2xl p-4 hover:border-[#FFD93D] hover:shadow-sm transition-all group"
          >
            <p className="text-xs text-gray-400 mb-1">← 前の話</p>
            <p className="text-sm font-black text-gray-700 group-hover:text-[#FF8FB1] transition-colors">
              {prev.slug}「{prev.title}」
            </p>
          </Link>
        ) : <div className="flex-1" />}

        {next ? (
          <Link
            href={`/story/${next.id}`}
            className="flex-1 bg-white border border-[#FFD93D]/40 rounded-2xl p-4 hover:border-[#FFD93D] hover:shadow-sm transition-all text-right group"
          >
            <p className="text-xs text-gray-400 mb-1">次の話 →</p>
            <p className="text-sm font-black text-gray-700 group-hover:text-[#FF8FB1] transition-colors">
              {next.slug}「{next.title}」
            </p>
          </Link>
        ) : <div className="flex-1" />}
      </div>

      <div className="text-center mt-6">
        <Link
          href="/story"
          className="inline-block text-sm text-gray-400 hover:text-[#FF8FB1] transition-colors"
        >
          ← おはなし一覧に戻る
        </Link>
      </div>
    </div>
  )
}
