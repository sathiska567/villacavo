import { PageHero, Reveal, SectionHeading, CurtainImg, ParallaxImg, MaskText, Ornament, CtaBand, Eyebrow } from '../components/ui'
import Icon from '../components/Icon'
import ArchMark from '../components/ArchMark'
import { Fireflies } from '../components/magic'
import { usePage, lines } from '../lib/content'

const pad = (n) => String(n).padStart(2, '0')

export default function About() {
  const { hero, intro, story, statement, values, haputale, closing, cta } = usePage('about')
  return (
    <>
      {!hero.hidden && (
        <PageHero eyebrow={hero.eyebrow} title={lines(hero.title)} text={hero.text} images={[hero.image1, hero.image2]} />
      )}

      {/* Intro */}
      {!intro.hidden && (
        <section className="relative overflow-hidden bg-white py-24 sm:py-32">
          <div className="container-luxe grid items-center gap-16 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionHeading eyebrow={intro.eyebrow} title={lines(intro.title)} />
              <Reveal delay={0.2}>
                {lines(intro.paragraphs).map((p, k) => (
                  <p key={k} className={`${k === 0 ? 'mt-8' : 'mt-4'} text-[16px] leading-relaxed text-ink-soft`}>{p}</p>
                ))}
                {intro.signature && <p className="mt-8 font-display text-3xl italic text-terra-500">{intro.signature}</p>}
              </Reveal>
            </div>
            <div className="lg:col-span-6">
              <CurtainImg src={intro.image} alt={intro.imageAlt} className="aspect-square w-full" />
            </div>
          </div>
        </section>
      )}

      {/* Story timeline */}
      {!story.hidden && (
        <section className="relative overflow-hidden bg-terra-500 py-24 sm:py-32">
          <ArchMark color="rgba(255,255,255,0.06)" accent="transparent" className="pointer-events-none absolute -left-16 top-0 h-full w-auto" />
          <Fireflies count={16} />
          <div className="container-luxe relative">
            <SectionHeading center light eyebrow={story.eyebrow} title={story.title} />
            <div className="mt-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
              {(story.items || []).map((s, i) => (
                <Reveal key={i} delay={i * 0.12} className="relative border-t border-white/30 pt-8">
                  <span className="absolute -top-[5px] left-0 h-[9px] w-[9px] rotate-45 bg-white" />
                  <p className="font-caps text-[12px] tracking-[0.3em] text-terra-100">{pad(i + 1)}</p>
                  <h3 className="mt-3 text-3xl text-white">{s.year}</h3>
                  <p className="mt-4 text-[16px] leading-relaxed text-white/80">{s.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Big statement */}
      {!statement.hidden && (
        <section className="relative">
          <ParallaxImg src={statement.image} alt="" className="h-[70vh] min-h-[460px]" strength={100} />
          <div className="absolute inset-0 bg-ink/45" />
          <div className="absolute inset-0 flex items-center">
            <div className="container-luxe text-center text-white">
              <MaskText lines={lines(statement.lines)} className="font-display text-4xl italic leading-[1.1] sm:text-6xl" />
            </div>
          </div>
        </section>
      )}

      {/* Values */}
      {!values.hidden && (
        <section className="relative overflow-hidden bg-white py-24 sm:py-32">
          <div className="container-luxe">
            <SectionHeading center eyebrow={values.eyebrow} title={values.title} />
            <Ornament className="mt-8" />
            <div className="mt-16 grid gap-10 md:grid-cols-3">
              {(values.items || []).map((v, i) => (
                <Reveal key={i} delay={i * 0.12} className="group text-center">
                  <div className="arch mx-auto flex h-28 w-24 items-end justify-center border border-terra-500/40 pb-6 text-terra-500 transition-colors duration-500 group-hover:bg-terra-500 group-hover:text-white">
                    <Icon name={v.icon} className="h-8 w-8" />
                  </div>
                  <h3 className="mt-8 text-3xl text-ink">{v.title}</h3>
                  <p className="mx-auto mt-4 max-w-xs text-[16px] leading-relaxed text-ink-soft">{v.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Haputale */}
      {!haputale.hidden && (
        <section className="bg-cream py-24 sm:py-32">
          <div className="container-luxe grid items-center gap-16 lg:grid-cols-2">
            <CurtainImg src={haputale.image} alt={haputale.imageAlt} className="aspect-[5/4]" />
            <div>
              <Eyebrow>{haputale.eyebrow}</Eyebrow>
              <MaskText lines={lines(haputale.title)} className="mt-5 text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-6xl" />
              <Reveal delay={0.2}>
                {lines(haputale.paragraphs).map((p, k) => (
                  <p key={k} className={`${k === 0 ? 'mt-8' : 'mt-4'} text-[16px] leading-relaxed text-ink-soft`}>{p}</p>
                ))}
                {(haputale.facts || []).length > 0 && (
                  <div className="mt-10 grid grid-cols-2 gap-6 border-t border-ink/10 pt-8">
                    {haputale.facts.map((f, k) => (
                      <div key={k}>
                        <p className="font-display text-3xl text-terra-500">{f.value}</p>
                        <p className="mt-1 font-caps text-[10px] tracking-[0.25em] text-ink-mute">{f.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {!closing.hidden && (
        <section className="relative overflow-hidden bg-white py-20">
          <Reveal className="container-luxe flex flex-col items-center text-center">
            <ArchMark className="h-20 w-auto" />
            <p className="mt-6 max-w-2xl font-display text-2xl italic leading-relaxed text-ink-soft sm:text-3xl">{closing.quote}</p>
          </Reveal>
        </section>
      )}

      <CtaBand data={cta} />
    </>
  )
}
