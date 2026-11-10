import { Link } from 'react-router-dom'
import ArchMark from '../components/ArchMark'
import { usePage } from '../lib/content'

export default function NotFound() {
  const t = usePage('notFound').main || {}
  return (
    <section className="relative flex min-h-screen overflow-hidden flex-col items-center justify-center bg-white px-6 pt-24 text-center">
      <ArchMark animate className="relative h-32 w-auto" />
      <p className="mt-10 eyebrow">{t.eyebrow}</p>
      <h1 className="mt-4 text-5xl text-ink sm:text-7xl">
        {t.titleStart} <span className="italic text-terra-500">{t.titleAccent}</span>
      </h1>
      <p className="mt-6 max-w-md text-ink-soft">{t.text}</p>
      <Link to="/" className="btn-primary mt-10">{t.buttonLabel}</Link>
    </section>
  )
}
