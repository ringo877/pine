'use client'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import type { Episode } from '@/data/episodes'

export default function EpisodeCard({ episode }: { episode: Episode }) {
  return (
    <Link href={`/story/${episode.id}`} className="block h-full">
      <motion.div
        className="bg-white rounded-2xl shadow-sm border border-[#FFD93D]/30 overflow-hidden h-full flex flex-col hover:shadow-md hover:border-[#FF8FB1]/40 transition-all cursor-pointer"
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative h-36 bg-gradient-to-b from-yellow-50 to-pink-50">
          <Image
            src={episode.image}
            alt={`${episode.slug}キャプション`}
            fill
            className="object-contain p-3"
          />
        </div>
        <div className="p-4 flex flex-col flex-1">
          <p className="text-[#FF8FB1] text-xs font-black mb-1 tracking-wide">
            {episode.slug}
          </p>
          <h3 className="font-black text-gray-800 mb-2">「{episode.title}」</h3>
          <p className="text-gray-600 text-sm leading-relaxed flex-1 line-clamp-3">{episode.synopsis}</p>
          <p className="text-[#FF8FB1] text-xs mt-3 font-bold">詳しく見る →</p>
        </div>
      </motion.div>
    </Link>
  )
}
