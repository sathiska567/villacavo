import { useState } from 'react'
import { motion } from 'framer-motion'
import { PageHero, Reveal, Img, SectionHeading, CtaBand, ease } from '../components/ui'
import Icon from '../components/Icon'
import Lightbox from '../components/Lightbox'
import { Fireflies } from '../components/magic'
import { useContent, usePage, lines, fill } from '../lib/content'

// The villa is booked as a whole, so this page shows its rooms as photos
// rather than separate room types.

// Grid tile sizes so every row is full, whatever the number of photos.
// Phones: 2 columns, first photo full width. Desktop (lg): 3 columns, first
// photo 2x2 with two beside it, then rows of three; a short last row widens.
// Images are absolutely positioned, so "aspect-auto" tiles stretch to the row.
function tile(i, n) {
  const m = n > 1 && (n - 1) % 2 === 1 && i === n - 1 ? 'col-span-2 aspect-[2/1]' : i === 0 ? 'col-span-2 aspect-square' : 'aspect-square'
  let lg = 'lg:col-span-1 lg:aspect-square'
  if (n === 1) lg = 'lg:col-span-3 lg:aspect-[16/7]'
  else if (i === 0) lg = 'lg:col-span-2 lg:row-span-2 lg:aspect-square'
  else if (n === 2) lg = 'lg:col-span-1 lg:row-span-2 lg:aspect-auto'
  else if (i >= 3) {
    const k = (n - 3) % 3
    const start = n - k
    if (k === 1 && i === start) lg = 'lg:col-span-3 lg:aspect-[3/1]'
    if (k === 2 && i === start) lg = 'lg:col-span-2 lg:aspect-auto'
  }
  return `${m} ${lg}`
}
export default function Rooms() {
  const { contact } = useContent()
  const { hero, photos, amenities, policies, cta } = usePage('rooms')
  const shots = (photos.images || []).filter(Boolean).map((src, i) => ({ src, alt: `${photos.alt || 'Villa Cavo room'} ${i + 1}` }))
  const [open, setOpen] = useState(null)
  return (
    <>
      {!hero.hidden && <PageHero eyebrow={hero.eyebrow} title={lines(hero.title)} text={hero.text} image={hero.image} square />}

      {!photos.hidden && shots.length > 0 && (
        <section className="relative overflow-hidden bg-white py-20 sm:py-28">
          <div className="container-luxe">
            {(photos.eyebrow || photos.title || photos.text) && (
              <SectionHeading center eyebrow={photos.eyebrow} title={photos.title} text={photos.text} />
            )}
            <div className="mt-12 grid grid-cols-2 gap-2 sm:mt-16 sm:gap-4 lg:grid-cols-3">
              {shots.map((g, i) => (
                <motion.button
                  key={`${g.src}-${i}`}
                  onClick={() => setOpen(i)}
                  data-cursor="Open"
                  aria-label={`Open photo ${i + 1}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, delay: (i % 4) * 0.08, ease }}
                  className={`group relative block w-full overflow-hidden ${tile(i, shots.length)}`}
                >
                  <Img
                    src={g.src}
                    alt={g.alt}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110"
                  />
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      )}

      <Lightbox items={shots} open={open} setOpen={setOpen} />

      {/* Amenities */}
      {!amenities.hidden && (
        <section className="relative overflow-hidden bg-terra-500 py-24 sm:py-32">
          <Fireflies count={16} />
          <div className="container-luxe relative">
            <SectionHeading center light eyebrow={amenities.eyebrow} title={amenities.title} />
            <div className="mx-auto mt-16 grid max-w-5xl gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {lines(amenities.items).map((a, i) => (
                <Reveal key={i} delay={(i % 3) * 0.08} className="flex items-center gap-4 border-b border-white/20 pb-5">
                  <Icon name="leaf" className="h-4 w-4 shrink-0 text-terra-100" />
                  <span className="text-[16px] text-white/90">{a}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Policies */}
      {!policies.hidden && (
        <section className="relative overflow-hidden bg-white py-24">
          <div className="container-luxe grid gap-10 md:grid-cols-3">
            {(policies.items || []).map((p, i) => (
              <Reveal key={i} delay={i * 0.1} className="border-l border-terra-500 pl-6">
                <h3 className="text-2xl text-ink">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{fill(p.text, contact)}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <CtaBand data={cta} />
    </>
  )
}
