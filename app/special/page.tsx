import Reveal from '@/components/Reveal'
import VoteForm from '@/components/VoteForm'

export default function SpecialPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-black text-center text-gray-800 mt-4 mb-4">スペシャル</h1>

      <Reveal>
        <div className="bg-gradient-to-br from-yellow-50 to-pink-50 rounded-3xl p-6 md:p-8 mb-8 border border-[#FFD93D]/30 text-center">
          <h2 className="text-2xl font-black text-[#FF8FB1] mb-3">✨ 人気投票 ✨</h2>
          <p className="text-gray-700 leading-relaxed text-sm">
            「戦闘妖精ぱいんちゃん」放送終了を記念して、人気投票を行います。
            投票して下さった方の中から抽選で10名様に、オリジナルグッズ「ぱいんちゃん変身セット」をプレゼントいたします。ぜひご応募ください！
          </p>
          <p className="mt-3 text-[#FF8FB1] font-black text-sm">締め切り：12月31日（木）まで</p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="bg-white rounded-3xl shadow-sm border border-[#FFD93D]/30 p-6 md:p-8">
          <VoteForm />
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="text-center text-gray-400 text-xs mt-6">
          ご協力ありがとうございました！　結果は後日当サイトにて発表を予定しております。
        </p>
      </Reveal>
    </div>
  )
}
