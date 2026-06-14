'use client'
import { motion } from 'motion/react'
import Image from 'next/image'
import type { Episode } from '@/data/episodes'

export default function EpisodeCard({ episode }: { episode: Episode }) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-sm border border-[#FFD93D]/30 overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative h-36 bg-gradient-to-b from-yellow-50 to-pink-50">
        <Image
          src={episode.image}
          alt={`第${episode.id}話キャプション`}
          fill
          className="object-contain p-3"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[#FF8FB1] text-xs font-black mb-1 tracking-wide">
          第{episode.id}話
        </p>
        <h3 className="font-black text-gray-800 mb-2">「{episode.title}」</h3>
        <p className="text-gray-600 text-sm leading-relaxed flex-1">{episode.synopsis}</p>
      </div>
    </motion.div>
  )
}
