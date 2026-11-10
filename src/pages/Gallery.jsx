import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PageHero, Img, CtaBand, ease } from '../components/ui'
import Lightbox from '../components/Lightbox'
import { useContent, usePage, lines } from '../lib/content'

export default function Gallery() {
  const { gallery: all } = useContent()
  const { hero, grid, cta } = usePage('gallery')
  const gallery = all.filter((g) => g.src)
  const allLabel = grid.allLabel || 'All'
  const cats = [allLabel, ...new Set(gallery.map((g) => g.cat).filter(Boolean))]
  const [cat, setCat] = useState(allLabel)
  const [open, setOpen] = useState(null)
  const list = cat === allLabel ? gallery : gallery.filter((g) => g.cat === cat)

  return (
    <>
      {!hero.hidden && <PageHero eyebrow={hero.eyebrow} title={lines(hero.title)} text={hero.text} image={hero.image} />}

      {!grid.hidden && (
      <section className="relative overflow-hidden bg-white py-20 sm:py-28">
        <div className="container-luxe">
          <div className="flex flex-wrap justify-center gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`relative px-5 py-2.5 font-caps text-[11px] tracking-[0.3em] transition-colors ${cat === c ? 'text-white' : 'text-ink-soft hover:text-terra-500'}`}
              >
                {cat === c && <motion.span layoutId="gal-pill" className="absolute inset-0 bg-terra-500" transition={{ duration: 0.5, ease }} />}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>

          <motion.div layout className="mt-10 grid grid-cols-2 gap-2 sm:mt-14 sm:gap-4 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((g, i) => (
                <motion.button
                  layout
                  key={`${g.src}-${i}`}
                  onClick={() => setOpen(i)}
                  data-cursor="Open"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, delay: (i % 6) * 0.05, ease }}
                  className="group relative block w-full overflow-hidden"
                >
                  <Img
                    src={g.src}
                    alt={g.alt}
                    className="aspect-square w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/60 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:p-5">
                    <div className="text-left text-white">
                      <p className="font-caps text-[9px] tracking-[0.25em] text-terra-100 sm:text-[10px] sm:tracking-[0.3em]">{g.cat}</p>
                      <p className="font-display text-base leading-tight sm:text-2xl">{g.alt}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
      )}

      <Lightbox items={list} open={open} setOpen={setOpen} />

      <CtaBand data={cta} />
    </>
  )
}
