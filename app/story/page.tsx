import Reveal from '@/components/Reveal'
import EpisodeCard from '@/components/EpisodeCard'
import { episodes, overviewText } from '@/data/episodes'

export default function StoryPage() {
  return (
    <div>
      <h1 className="text-3xl font-black text-center text-gray-800 mt-4 mb-10">おはなし</h1>

      {/* あらすじ */}
      <Reveal>
        <div className="bg-gradient-to-br from-yellow-50 to-pink-50 rounded-3xl p-6 md:p-8 mb-12 border border-[#FFD93D]/30">
          <h2 className="text-xl font-black text-gray-800 mb-4">あらすじ</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{overviewText}</p>
        </div>
      </Reveal>

      {/* 各話 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {episodes.map((ep, i) => (
          <Reveal key={ep.id} delay={Math.min(i * 0.04, 0.3)}>
            <EpisodeCard episode={ep} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}
