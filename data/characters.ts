export type CharacterEntry = {
  id: string
  name: string
  cv?: string
  image: string
  description: string
  type: 'character' | 'term'
}

export const characters: CharacterEntry[] = [
  { id: 'chara1', name: 'ぱいん',         cv: '松葉葉子',     image: '/img/pineapple.png',  type: 'character', description: '本作の主人公。明るく元気なパイナップルの妖精。友達や家族が大好きで、困っている人を見ると放って置けない。平凡な妖精であったが、乗っ取られてしまった果物王国を救おうと奮起する。戦闘能力・知力はもともとあまり高くないが、冒険を通して身も心も強くなっていく。果物王国のすべての生き物が幸せに暮らせることを願っている。' },
  { id: 'chara2', name: 'あぼかど',       cv: 'アボガドロ２世', image: '/img/avocado.png',   type: 'character', description: 'ぱいんの仲間。しっかり者でクールなアボカドの妖精。頭脳明晰で様々な知識を有している。また、知性だけではなく高い戦闘能力も有しており、魔法学校ではトップの成績であった。しかし能力が高いあまり周囲の人間から距離を置かれていたため、今まで仲間と呼べる人間がいなかった。そのためぱいんたちと仲間になれたことを内心嬉しく思っている。' },
  { id: 'chara3', name: 'ぴーち',         cv: '千葉 美里',    image: '/img/peach.png',      type: 'character', description: 'ぱいんの仲間。心優しい桃の妖精。強い魔力を持つ。冒険では主に主人公たちのサポートをすることに徹している。争い事が苦手で、攻撃はあまり得意ではない。反面防御や治癒に強く、魔王ドリアンのガスを無効にすることができる。マンゴスチン女王を尊敬しており、平和な果物王国を愛していた。そのため魔王ドリアンに乗っ取られた後の状況に酷く絶望していたが、ぱいんたちに出会い共に果物王国を取り戻すことを決意する。' },
  { id: 'chara4', name: 'ぱぱいや',       cv: '田村 知子',    image: '/img/papaya.png',     type: 'character', description: 'ぱいんの仲間。戦うことが大好きなパパイヤの妖精。非常に高い戦闘能力を持つが、本気を出すとリミッターが外れ周りが見えなくなってしまうため注意が必要。自分の欲求に従い誰彼構わず襲うため、周りの妖精からは煙たがられていた。戦闘する機会があまりない平和な果物王国に飽き飽きしていた。魔王ドリアンが王国を襲いエネミーを放ってくれたことで戦闘ができるようになったため、この状況を好ましく思っている。しかし、ぱいんたちと接するうちにその考えも少しずつ変わっていく。' },
  { id: 'chara5', name: 'グァバ先生',     cv: '篠崎 真紀子',  image: '/img/guava.png',      type: 'character', description: 'ぱいんたちが通う魔法学校の先生。ぱいんたちに様々な知識を授ける。' },
  { id: 'chara6', name: 'マンゴスチン女王', cv: '荒川 理恵',  image: '/img/mangosteen.png', type: 'character', description: 'ぱいんたちの暮らす果物王国を統治する存在。厳しいが誰よりも果物王国の住民のことを思っているため、多くの妖精から慕われている。現在は魔王ドリアンに魔力を封じられているため、身動きが取れない。' },
  { id: 'chara7', name: 'ライチ王子',     cv: '三上 彼方',    image: '/img/raichi.png',     type: 'character', description: 'マンゴスチン女王の息子で、果物王国の次期皇帝。幼少期から皇帝となるための様々な教育を受けており、本人の才能も相まって膨大な能力の持ち主。国民からの期待も厚く、絶大な人気を誇る。今はマンゴスチン女王と同様、魔王ドリアンに魔力を封じられているため身動きが取れない。' },
  { id: 'chara8', name: '魔王ドリアン',   cv: '藤沢 基',      image: '/img/durian.png',     type: 'character', description: '果物王国を突如襲った魔王。嗅いだ者を気絶させる程の醜悪な臭いを放つ。強力な魔力を持つため、倒すことは非常に難しい。性格は冷徹で、自身の邪魔をするものには容赦ない。全ての妖精を自分の支配下に置くことが目的。何やら暗い過去があるらしいが……。' },
]

export const terms: CharacterEntry[] = [
  { id: 'chara9',  name: '果物王国', image: '/img/island.png',   type: 'term', description: 'ぱいんたち果物の妖精が暮らす王国。もともとはマンゴスチン女王が統治する平和な王国だった。しかし現在は魔王ドリアンに乗っ取られ、そこかしこにエネミーが跋扈する危険な場所と成り果てた。' },
  { id: 'chara10', name: '妖精',   image: '/img/yousei.png',    type: 'term', description: '果物王国に住む住民。皆何かしらの果物の妖精である。この国の妖精は皆魔法が使える。どのような魔法が使えるかは個人の生まれ持った素質やその後の訓練が関係している。' },
  { id: 'chara11', name: '魔法学校', image: '/img/school.jpg',  type: 'term', description: '果物王国の妖精が通うことを義務付けられている学校。教養科目や魔法を使う方法、体術などを学ぶ。' },
  { id: 'chara12', name: '図書館',  image: '/img/library.png',  type: 'term', description: '果物王国の王立図書館。ありとあらゆる種類の本が存在する。' },
  { id: 'chara13', name: 'お城',   image: '/img/oshiro.jpg',    type: 'term', description: '果物王国のお城。マンゴスチン女王やライチ王子が住んでいる。現在は魔王ドリアンに占領されており、近づくことができない。' },
  { id: 'chara14', name: 'エネミー', image: '/img/kaiju.png',   type: 'term', description: '妖精たちを襲う魔獣。もともとは人気の少ない山奥に住んでいたものを、魔王ドリアンが魔改造し果物王国の各地に放った。個体によって、姿形や能力、強さなどが違う。' },
]
