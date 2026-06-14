import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { characters, terms } from '@/data/characters'

const all = [...characters, ...terms]

export function generateStaticParams() {
  return all.map((e) => ({ id: e.id }))
}

export default async function CharacterDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const entry = all.find((e) => e.id === id)
  if (!entry) notFound()

  const group = entry.type === 'character' ? characters : terms
  const idx = group.findIndex((e) => e.id === id)
  const prev = group[idx - 1]
  const next = group[idx + 1]

  const sectionLabel = entry.type === 'character' ? 'キャラクター' : '用語'

  return (
    <div className="max-w-2xl mx-auto">
      {/* パンくず */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/character" className="hover:text-[#FF8FB1] transition-colors">キャラクター</Link>
        <span>/</span>
        <span className="text-gray-500">{sectionLabel}</span>
        <span>/</span>
        <span className="text-gray-600">{entry.name}</span>
      </div>

      {/* メインカード */}
      <div className="bg-white rounded-3xl shadow-sm border border-[#FFD93D]/30 overflow-hidden">
        {/* 画像エリア */}
        <div className="relative h-80 md:h-[28rem] bg-gradient-to-b from-yellow-50 to-pink-50">
          <Image
            src={entry.image}
            alt={entry.name}
            fill
            className="object-contain p-2"
            priority
          />
        </div>

        {/* テキストエリア */}
        <div className="p-6 md:p-8">
          <span className="inline-block text-xs font-black tracking-widest text-white px-3 py-1 rounded-full mb-3"
            style={{ backgroundColor: entry.type === 'character' ? '#FF8FB1' : '#FFD93D', color: entry.type === 'character' ? 'white' : '#333' }}>
            {sectionLabel}
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-gray-800 mb-2">{entry.name}</h1>
          {entry.cv && (
            <p className="text-[#FF8FB1] font-bold mb-4">CV. {entry.cv}</p>
          )}
          <p className="text-gray-700 leading-loose text-base">{entry.description}</p>
        </div>
      </div>

      {/* 前後ナビ */}
      <div className="flex justify-between gap-4 mt-8">
        {prev ? (
          <Link
            href={`/character/${prev.id}`}
            className="flex-1 bg-white border border-[#FFD93D]/40 rounded-2xl p-4 hover:border-[#FFD93D] hover:shadow-sm transition-all group"
          >
            <p className="text-xs text-gray-400 mb-1">← 前へ</p>
            <p className="text-sm font-black text-gray-700 group-hover:text-[#FF8FB1] transition-colors">{prev.name}</p>
          </Link>
        ) : <div className="flex-1" />}

        {next ? (
          <Link
            href={`/character/${next.id}`}
            className="flex-1 bg-white border border-[#FFD93D]/40 rounded-2xl p-4 hover:border-[#FFD93D] hover:shadow-sm transition-all text-right group"
          >
            <p className="text-xs text-gray-400 mb-1">次へ →</p>
            <p className="text-sm font-black text-gray-700 group-hover:text-[#FF8FB1] transition-colors">{next.name}</p>
          </Link>
        ) : <div className="flex-1" />}
      </div>

      <div className="text-center mt-6">
        <Link href="/character" className="inline-block text-sm text-gray-400 hover:text-[#FF8FB1] transition-colors">
          ← キャラクター・用語一覧に戻る
        </Link>
      </div>
    </div>
  )
}
