import Reveal from '@/components/Reveal'
import { broadcasts, streams, staff, cast } from '@/data/about'

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-black text-gray-800 mb-4 border-b-2 border-[#FFD93D] pb-2">
      {children}
    </h2>
  )
}

function InfoTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#FFD93D]/30">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#FFD93D]/20">
            {headers.map((h) => (
              <th key={h} className="px-5 py-3 text-left font-black text-gray-700 whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-[#FFD93D]/20 even:bg-yellow-50/30">
              {row.map((cell, j) => (
                <td key={j} className="px-5 py-3 text-gray-700 whitespace-nowrap">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function DlList({ items }: { items: { role?: string; character?: string; name?: string; actor?: string }[] }) {
  return (
    <div className="bg-white rounded-2xl border border-[#FFD93D]/30 overflow-hidden">
      {items.map((item, i) => (
        <div key={i} className="flex border-b border-[#FFD93D]/20 last:border-0">
          <div className="w-44 flex-shrink-0 bg-[#FFD93D]/15 px-4 py-3 text-sm font-black text-gray-700">
            {item.role ?? item.character}
          </div>
          <div className="px-4 py-3 text-gray-700 text-sm">{item.name ?? item.actor}</div>
        </div>
      ))}
    </div>
  )
}

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <h1 className="text-3xl font-black text-center text-gray-800 mt-4">各種情報</h1>

      <Reveal>
        <SectionTitle>放送情報</SectionTitle>
        <p className="text-gray-500 text-sm mb-3">放送局や放送日時は以下の通りです。</p>
        <InfoTable
          headers={['放送局', '放送開始日', '放送日時']}
          rows={broadcasts.map((b) => [b.station, b.startDate, b.schedule])}
        />
      </Reveal>

      <Reveal delay={0.05}>
        <SectionTitle>配信情報</SectionTitle>
        <p className="text-gray-500 text-sm mb-3">配信サイトや配信日時は以下の通りです。</p>
        <InfoTable
          headers={['配信サイト', '配信開始日', '配信更新日時']}
          rows={streams.map((s) => [s.service, s.startDate, s.schedule])}
        />
      </Reveal>

      <Reveal delay={0.1}>
        <SectionTitle>スタッフ</SectionTitle>
        <DlList items={staff} />
      </Reveal>

      <Reveal delay={0.1}>
        <SectionTitle>キャスト</SectionTitle>
        <DlList items={cast} />
      </Reveal>
    </div>
  )
}
