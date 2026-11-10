import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Img, ease } from './ui'
import { lockScroll } from '../lib/scroll'

// Full-screen photo viewer. `items` is [{ src, alt }], `open` is the index shown (or null).
export default function Lightbox({ items, open, setOpen }) {
  const n = items.length

  useEffect(() => {
    if (open === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') setOpen((o) => (o + 1) % n)
      if (e.key === 'ArrowLeft') setOpen((o) => (o - 1 + n) % n)
    }
    window.addEventListener('keydown', onKey)
    lockScroll(true)
    return () => {
      window.removeEventListener('keydown', onKey)
      lockScroll(false)
    }
  }, [open, n, setOpen])

  return (
    <AnimatePresence>
      {open !== null && items[open] && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(null)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={open}
              className="max-h-[85vh] max-w-5xl"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, ease }}
              onClick={(e) => e.stopPropagation()}
            >
              <Img src={items[open].src} alt={items[open].alt} className="max-h-[78vh] w-auto object-contain" />
              {items[open].alt && <p className="mt-4 text-center font-display text-xl italic text-white/80">{items[open].alt}</p>}
            </motion.div>
          </AnimatePresence>
          {n > 1 &&
            [
              { l: '←', f: (e) => { e.stopPropagation(); setOpen((open - 1 + n) % n) }, c: 'left-4' },
              { l: '→', f: (e) => { e.stopPropagation(); setOpen((open + 1) % n) }, c: 'right-4' },
            ].map((b) => (
              <button key={b.l} onClick={b.f} aria-label={b.l === '←' ? 'Previous' : 'Next'} className={`absolute top-1/2 ${b.c} flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/30 text-xl text-white hover:bg-white hover:text-ink`}>
                {b.l}
              </button>
            ))}
          <button onClick={() => setOpen(null)} aria-label="Close" className="absolute right-6 top-6 font-caps text-[12px] tracking-[0.3em] text-white/80 hover:text-white">
            Close ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
