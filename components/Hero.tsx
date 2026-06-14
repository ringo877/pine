'use client'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl py-12 px-6 md:py-16 md:px-10 my-4">
      {/* 背景グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFFBF0] via-yellow-50 to-pink-50 -z-10 rounded-3xl" />
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#FFD93D]/20 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#FF8FB1]/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* テキスト */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.p
            className="text-[#FF8FB1] font-black text-xs tracking-[0.3em] mb-3 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Anime Official Site
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl font-black text-gray-800 leading-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            妖精戦士<br />
            <span className="text-[#FF8FB1]">ぱいんちゃん</span>
          </motion.h2>
          <motion.p
            className="text-gray-500 mb-8 max-w-sm mx-auto md:mx-0 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            果物王国を救え！<br />ぱいんたちの大冒険が今始まる。
          </motion.p>
          <motion.div
            className="flex gap-3 justify-center md:justify-start flex-wrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link
              href="/story"
              className="px-6 py-3 bg-[#FFD93D] text-gray-800 font-black rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-sm"
            >
              おはなしを見る
            </Link>
            <Link
              href="/special"
              className="px-6 py-3 bg-[#FF8FB1] text-white font-black rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-sm"
            >
              人気投票へ ✨
            </Link>
          </motion.div>
        </motion.div>

        {/* ふわふわイメージ */}
        <motion.div
          className="flex-shrink-0"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Image
            src="/yousei.png"
            alt="妖精の画像"
            width={280}
            height={280}
            className="drop-shadow-xl"
            priority
          />
        </motion.div>
      </div>
    </section>
  )
}
