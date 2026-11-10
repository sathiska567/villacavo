import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal, Img, Eyebrow, MaskText } from '../components/ui'
import Icon from '../components/Icon'
import { useContent, usePage, lines, fill } from '../lib/content'

// Online booking calendar is not offered yet — guests send an enquiry by WhatsApp or email.
export default function Booking() {
  const { rooms, contact } = useContent()
  const { intro, form: copy } = usePage('booking')
  const interests = lines(copy.interests)
  const [params] = useSearchParams()
  const [form, setForm] = useState({
    room: params.get('room') || 'any',
    guests: '2',
    dates: '',
    name: '',
    email: '',
    phone: '',
    country: '',
    notes: '',
    interests: [],
  })
  const [error, setError] = useState('')
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const toggle = (x) =>
    setForm({ ...form, interests: form.interests.includes(x) ? form.interests.filter((e) => e !== x) : [...form.interests, x] })

  // The villa is booked as a whole; the suite step only shows if switched on in the admin.
  const showRooms = !!copy.showRoomStep
  const room = showRooms ? rooms.find((r) => r.slug && r.slug === form.room) : null
  const steps = showRooms ? ['01', '02', '03', '04'] : ['01', null, '02', '03']
  const message = `Hello Villa Cavo, I would like to make an enquiry.
${showRooms ? `Suite: ${room ? room.name : copy.anyRoomName}
` : ''}Guests: ${form.guests}
Preferred dates: ${form.dates || copy.flexibleText}
Interested in: ${form.interests.join(', ') || '-'}
Name: ${form.name}
Email: ${form.email || '-'}
Phone: ${form.phone || '-'}
Country: ${form.country || '-'}
Message: ${form.notes || '-'}`

  const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`
  const mailUrl = `mailto:${contact.email}?subject=${encodeURIComponent('Enquiry — ' + (room ? room.name : copy.summaryTitle))}&body=${encodeURIComponent(message)}`

  const send = (e) => {
    if (!form.name.trim()) {
      e.preventDefault()
      setError(copy.nameError)
      document.getElementById('enq-name')?.focus()
      return
    }
    setError('')
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-white pb-24 pt-32 sm:pt-40">
      <div className="container-luxe">
        <div className="max-w-3xl">
          <Reveal><Eyebrow>{intro.eyebrow}</Eyebrow></Reveal>
          <MaskText as="h1" lines={lines(intro.title)} className="mt-6 text-5xl leading-[0.95] text-ink sm:text-7xl" />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-ink-soft">{intro.text}</p>
          </Reveal>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="mt-16 grid gap-16 lg:grid-cols-12">
          <div className="space-y-14 lg:col-span-7">
            <Step n={steps[0]} title={copy.step1}>
              <div className="grid gap-8 sm:grid-cols-2">
                <Field label={copy.datesLabel}>
                  <input value={form.dates} onChange={set('dates')} className="input-luxe" placeholder={copy.datesPlaceholder} />
                </Field>
                <Field label={copy.guestsLabel}>
                  <select value={form.guests} onChange={set('guests')} className="input-luxe">
                    {lines(copy.guestOptions).map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </Field>
              </div>
            </Step>

            {showRooms && (
            <Step n={steps[1]} title={copy.step2}>
              <div className="grid gap-4 sm:grid-cols-2">
                {[{ slug: 'any', name: copy.anyRoomName, guests: copy.anyRoomText, image: copy.anyRoomImage }, ...rooms.filter((r) => r.slug)].map((r) => (
                  <label
                    key={r.slug}
                    className={`group relative flex cursor-pointer items-center gap-4 border p-3 transition-all ${form.room === r.slug ? 'border-terra-500 bg-terra-50' : 'border-ink/10 hover:border-terra-300'}`}
                  >
                    <input type="radio" name="room" value={r.slug} checked={form.room === r.slug} onChange={set('room')} className="sr-only" />
                    <Img src={r.image} alt="" className="h-20 w-20 shrink-0 object-cover" />
                    <div className="pr-6">
                      <p className="font-display text-xl leading-tight text-ink">{r.name}</p>
                      <p className="mt-1 text-xs text-ink-mute">{r.guests}{r.size ? ` · ${r.size}` : ''}</p>
                    </div>
                    {form.room === r.slug && (
                      <motion.span layoutId="room-check" className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-terra-500 text-[11px] text-white">✓</motion.span>
                    )}
                  </label>
                ))}
              </div>
            </Step>
            )}

            <Step n={steps[2]} title={copy.step3}>
              <div className="flex flex-wrap gap-3">
                {interests.map((x) => (
                  <button
                    type="button"
                    key={x}
                    onClick={() => toggle(x)}
                    className={`border px-4 py-2.5 text-sm transition-all ${form.interests.includes(x) ? 'border-terra-500 bg-terra-500 text-white' : 'border-ink/15 text-ink-soft hover:border-terra-500'}`}
                  >
                    {form.interests.includes(x) ? '✓ ' : '+ '}{x}
                  </button>
                ))}
              </div>
            </Step>

            <Step n={steps[3]} title={copy.step4}>
              <div className="grid gap-8 sm:grid-cols-2">
                <Field label={copy.nameLabel}><input id="enq-name" value={form.name} onChange={set('name')} className="input-luxe" /></Field>
                <Field label={copy.emailLabel}><input type="email" value={form.email} onChange={set('email')} className="input-luxe" /></Field>
                <Field label={copy.phoneLabel}><input value={form.phone} onChange={set('phone')} className="input-luxe" /></Field>
                <Field label={copy.countryLabel}><input value={form.country} onChange={set('country')} className="input-luxe" /></Field>
                <Field label={copy.messageLabel} className="sm:col-span-2">
                  <textarea rows={3} value={form.notes} onChange={set('notes')} className="input-luxe resize-none" placeholder={copy.messagePlaceholder} />
                </Field>
              </div>
              {error && <p className="mt-8 text-sm text-terra-600">{error}</p>}
              <a href={mailUrl} onClick={send} className="btn-primary mt-10 w-full sm:w-auto">
                <Icon name="mail" className="h-4 w-4" /> {copy.sendEmailLabel}
              </a>
            </Step>
          </div>

          {/* Summary + send */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="overflow-hidden border border-ink/10 bg-cream">
                <AnimatePresence mode="wait">
                  <motion.div key={form.room} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                    <Img src={room ? room.image : copy.anyRoomImage} alt="" className="aspect-[16/10] w-full object-cover" />
                  </motion.div>
                </AnimatePresence>
                <div className="p-6 sm:p-8">
                  <p className="eyebrow">{copy.summaryLabel}</p>
                  <h3 className="mt-3 text-3xl text-ink">{room ? room.name : copy.summaryTitle}</h3>
                  <dl className="mt-6 space-y-3 border-t border-ink/10 pt-6 text-sm">
                    {[
                      [copy.summaryDatesLabel, form.dates || copy.flexibleText],
                      [copy.summaryGuestsLabel, form.guests],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-4">
                        <dt className="text-ink-mute">{k}</dt>
                        <dd className="text-right text-ink">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  {form.interests.length > 0 && (
                    <p className="mt-4 text-xs leading-relaxed text-ink-soft">{copy.interestedLabel}: {form.interests.join(', ')}</p>
                  )}

                  {error && <p className="mt-6 text-sm text-terra-600">{error}</p>}
                  <div className="mt-8 grid gap-3">
                    <a href={whatsappUrl} onClick={send} target="_blank" rel="noreferrer" className="btn-primary w-full">
                      <Icon name="phone" className="h-4 w-4" /> {copy.whatsappButtonLabel}
                    </a>
                    <a href={mailUrl} onClick={send} className="btn-outline w-full">
                      <Icon name="mail" className="h-4 w-4" /> {copy.emailButtonLabel}
                    </a>
                  </div>
                  <ul className="mt-6 space-y-2 text-xs text-ink-mute">
                    {lines(copy.perks).map((t, k) => (
                      <li key={k} className="flex items-center gap-2"><Icon name="leaf" className="h-3.5 w-3.5 text-terra-500" />{fill(t, contact)}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </section>
  )
}

function Step({ n, title, children }) {
  return (
    <Reveal>
      <div className="mb-8 flex items-baseline gap-4 border-b border-ink/10 pb-4">
        <span className="font-caps text-xs text-terra-500">{n}</span>
        <h2 className="text-3xl text-ink">{title}</h2>
      </div>
      {children}
    </Reveal>
  )
}

function Field({ label, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="label-luxe">{label}</span>
      {children}
    </label>
  )
}
