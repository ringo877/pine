export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import { getDb } from '@/db'
import { votes } from '@/db/schema'
import { sql } from 'drizzle-orm'

type TallyRow = { value: string; count: number }

async function tally(column: 'character' | 'story'): Promise<TallyRow[]> {
  const db = getDb()
  const rows = await db
    .select({
      value: votes[column],
      count: sql<number>`cast(count(*) as int)`,
    })
    .from(votes)
    .groupBy(votes[column])
    .orderBy(sql`count(*) desc`)
  return rows as TallyRow[]
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>
}) {
  const { key } = await searchParams
  if (key !== process.env.ADMIN_KEY) notFound()

  const db = getDb()
  const [total, characterTally, storyTally, recent] = await Promise.all([
    db.select({ count: sql<number>`cast(count(*) as int)` }).from(votes),
    tally('character'),
    tally('story'),
    db.select().from(votes).orderBy(sql`created_at desc`).limit(10),
  ])

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-10">
      <div>
        <h1 className="text-2xl font-black text-gray-800 mb-1">管理画面</h1>
        <p className="text-gray-500 text-sm">妖精戦士ぱいんちゃん 人気投票 集計結果</p>
      </div>

      {/* 総票数 */}
      <div className="bg-[#FFD93D]/20 rounded-2xl p-6 text-center">
        <p className="text-sm font-bold text-gray-600 mb-1">総投票数</p>
        <p className="text-5xl font-black text-gray-800">
          {total[0].count}<span className="text-xl ml-1">票</span>
        </p>
      </div>

      {/* キャラクター集計 */}
      <section>
        <h2 className="text-lg font-black text-gray-800 mb-4 border-b-2 border-[#FF8FB1] pb-2">好きなキャラクター</h2>
        <div className="space-y-2">
          {characterTally.map((row, i) => (
            <div key={row.value} className="flex items-center gap-3">
              <span className="w-6 text-center text-sm font-black text-[#FF8FB1]">{i + 1}</span>
              <div className="flex-1 bg-white rounded-xl border border-[#FFD93D]/30 px-4 py-2 flex justify-between">
                <span className="font-bold text-gray-700">{row.value}</span>
                <span className="font-black text-[#FF8FB1]">{row.count}票</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* おはなし集計 */}
      <section>
        <h2 className="text-lg font-black text-gray-800 mb-4 border-b-2 border-[#FFD93D] pb-2">好きなおはなし</h2>
        <div className="space-y-2">
          {storyTally.map((row, i) => (
            <div key={row.value} className="flex items-center gap-3">
              <span className="w-6 text-center text-sm font-black text-[#FFD93D]">{i + 1}</span>
              <div className="flex-1 bg-white rounded-xl border border-[#FFD93D]/30 px-4 py-2 flex justify-between">
                <span className="font-bold text-gray-700">{row.value}</span>
                <span className="font-black text-[#FFD93D]">{row.count}票</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 最新応募 */}
      <section>
        <h2 className="text-lg font-black text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">最新応募（直近10件）</h2>
        <div className="overflow-x-auto rounded-xl border border-[#FFD93D]/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#FFD93D]/20">
                {['日時', 'お名前', 'キャラ', 'おはなし', '媒体'].map((h) => (
                  <th key={h} className="px-4 py-2 text-left font-black text-gray-700 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recent.map((v) => (
                <tr key={v.id} className="border-t border-[#FFD93D]/20">
                  <td className="px-4 py-2 text-gray-500 whitespace-nowrap">{new Date(v.createdAt).toLocaleDateString('ja-JP')}</td>
                  <td className="px-4 py-2 text-gray-700">{v.name}</td>
                  <td className="px-4 py-2 text-gray-700">{v.character}</td>
                  <td className="px-4 py-2 text-gray-700">{v.story}</td>
                  <td className="px-4 py-2 text-gray-700">{v.media}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
