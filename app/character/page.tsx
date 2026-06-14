import Reveal from '@/components/Reveal'
import CharacterCard from '@/components/CharacterCard'
import { characters, terms } from '@/data/characters'

function SubHeading({ children, color = '#FFD93D' }: { children: React.ReactNode; color?: string }) {
  return (
    <h2 className="text-2xl font-black text-gray-800 mb-6 inline-block">
      <span className="relative pb-1.5">
        {children}
        <span
          className="absolute bottom-0 left-0 right-0 h-1 rounded-full"
          style={{ backgroundColor: color }}
        />
      </span>
    </h2>
  )
}

export default function CharacterPage() {
  return (
    <div>
      <h1 className="text-3xl font-black text-center text-gray-800 mt-4 mb-10">登場人物・用語</h1>

      <section className="mb-14">
        <SubHeading>登場人物</SubHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {characters.map((c, i) => (
            <Reveal key={c.id} delay={Math.min(i * 0.05, 0.3)}>
              <CharacterCard entry={c} />
            </Reveal>
          ))}
        </div>
      </section>

      <section>
        <SubHeading color="#FF8FB1">用語</SubHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {terms.map((t, i) => (
            <Reveal key={t.id} delay={Math.min(i * 0.05, 0.3)}>
              <CharacterCard entry={t} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
