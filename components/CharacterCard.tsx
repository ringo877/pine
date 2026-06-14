'use client'
import { motion } from 'motion/react'
import Image from 'next/image'
import type { CharacterEntry } from '@/data/characters'

export default function CharacterCard({ entry }: { entry: CharacterEntry }) {
  return (
    <motion.div
      className="bg-white rounded-3xl shadow-sm border border-[#FFD93D]/30 overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative h-44 bg-gradient-to-b from-yellow-50 to-pink-50 flex items-center justify-center p-3">
        <Image
          src={entry.image}
          alt={entry.name}
          width={160}
          height={160}
          className="object-contain h-36 w-auto"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-black text-gray-800 text-lg mb-1">{entry.name}</h3>
        {entry.cv && (
          <p className="text-[#FF8FB1] text-sm font-bold mb-2">CV. {entry.cv}</p>
        )}
        <p className="text-gray-600 text-sm leading-relaxed flex-1">{entry.description}</p>
      </div>
    </motion.div>
  )
}
