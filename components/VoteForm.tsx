'use client'
import { useState, type FormEvent } from 'react'

const CHARACTERS = [
  'ぱいん', 'あぼかど', 'ぴーち', 'ぱぱいや',
  'グァバ先生', 'マンゴスチン女王', 'ライチ王子', '魔王ドリアン', 'その他',
]
const STORIES: [string, string][] = [
  ['第１話', '第1話「ぱいんちゃん」'],
  ['第２話', '第2話「あぼかど」'],
  ['第３話', '第3話「ぴーち」'],
  ['第４話', '第4話「ぱぱいや」'],
  ['第５話', '第5話「とっくん」'],
  ['第６話', '第6話「けっとう」'],
  ['第７話', '第7話「としょかん」'],
  ['第８話', '第8話「なかま」'],
  ['第９話', '第9話「らいち」'],
  ['第１０話', '第10話「おしろ」'],
  ['第１１話', '第11話「どりあん」'],
  ['第１２話', '第12話「けつい」'],
  ['第１３話', '第13話「たたかい」'],
]
const MEDIA = ['TV放送', 'ネット配信', 'BD・DVD', 'その他']

type Status = 'idle' | 'submitting' | 'success' | 'error'

const inputCls =
  'w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FFD93D] focus:border-transparent transition text-sm'
const labelCls = 'block font-black text-gray-700 mb-1.5 text-sm'
const Required = () => <span className="text-red-500 ml-1">※</span>

export default function VoteForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [mediaError, setMediaError] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    if (data.getAll('media').length === 0) {
      setMediaError(true)
      return
    }
    setMediaError(false)
    setStatus('submitting')

    const params = new URLSearchParams()
    for (const [key, value] of data.entries()) {
      params.append(key, value.toString())
    }

    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      })
      const json = (await res.json()) as { message: string }
      if (json.message === 'success') {
        setStatus('success')
        form.reset()
      } else {
        throw new Error()
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* お名前 */}
      <div>
        <label htmlFor="name" className={labelCls}>
          お名前<Required />
        </label>
        <input type="text" id="name" name="name" required className={inputCls} />
      </div>

      {/* 電話番号 */}
      <div>
        <label htmlFor="tel" className={labelCls}>
          電話番号<Required />
        </label>
        <input
          type="tel"
          id="tel"
          name="tel"
          required
          pattern="[0-9\-]{10,13}"
          title="電話番号を入力してください（例：090-1234-5678）"
          className={inputCls}
        />
      </div>

      {/* メールアドレス */}
      <div>
        <label htmlFor="email" className={labelCls}>
          メールアドレス<Required />
        </label>
        <input type="email" id="email" name="email" required className={inputCls} />
      </div>

      {/* 媒体 */}
      <div>
        <p className={labelCls}>
          媒体<Required />
        </p>
        <p className="text-xs text-gray-500 mb-3">
          どの媒体でアニメ「戦闘妖精ぱいんちゃん」を見ましたか？（複数選択可）
        </p>
        <div className="flex flex-wrap gap-4">
          {MEDIA.map((m) => (
            <label key={m} className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                name="media"
                value={m}
                onChange={() => setMediaError(false)}
                className="w-4 h-4 accent-[#FFD93D] cursor-pointer"
              />
              <span className="text-sm text-gray-700">{m}</span>
            </label>
          ))}
        </div>
        {mediaError && (
          <p className="text-red-500 text-sm mt-2">視聴媒体を1つ以上選択してください。</p>
        )}
      </div>

      {/* 好きなキャラクター */}
      <div>
        <label htmlFor="character" className={labelCls}>
          好きなキャラクター<Required />
        </label>
        <p className="text-xs text-gray-500 mb-2">
          最も好きなキャラクターをお選びください。
        </p>
        <select
          id="character"
          name="character"
          required
          defaultValue=""
          className={inputCls + ' bg-white'}
        >
          <option value="" disabled>
            選択してください
          </option>
          {CHARACTERS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <textarea
          name="character_reason"
          rows={3}
          className={inputCls + ' mt-2 resize-none'}
          placeholder="よろしければ、そのキャラを選んだ理由もお書きください。その他を選んだ場合は、具体的なキャラクター名もお書きください。"
        />
      </div>

      {/* 好きなおはなし */}
      <div>
        <label htmlFor="story" className={labelCls}>
          好きなおはなし<Required />
        </label>
        <p className="text-xs text-gray-500 mb-2">
          全13話の中で最も好きなお話をお選びください。
        </p>
        <select
          id="story"
          name="story"
          required
          defaultValue=""
          className={inputCls + ' bg-white'}
        >
          <option value="" disabled>
            選択してください
          </option>
          {STORIES.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <textarea
          name="story_reason"
          rows={3}
          className={inputCls + ' mt-2 resize-none'}
          placeholder="よろしければ、そのお話を選んだ理由もお書きください。"
        />
      </div>

      {/* 感想 */}
      <div>
        <label htmlFor="impression" className={labelCls}>
          感想
        </label>
        <p className="text-xs text-gray-500 mb-2">
          アニメ「戦闘妖精ぱいんちゃん」のご感想をご自由にお書きください。
        </p>
        <textarea
          id="impression"
          name="impression"
          rows={5}
          className={inputCls + ' resize-none'}
        />
      </div>

      {/* 送信 */}
      <div className="text-center pt-2">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="px-12 py-3 bg-[#FFD93D] text-gray-800 font-black rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
        >
          {status === 'submitting' ? '送信中...' : '送信する'}
        </button>
      </div>

      {status === 'success' && (
        <p className="text-center text-green-600 font-bold">
          送信が完了しました。ご応募ありがとうございました！
        </p>
      )}
      {status === 'error' && (
        <p className="text-center text-red-500">
          送信に失敗しました。しばらく経ってから再度お試しください。
        </p>
      )}
    </form>
  )
}
