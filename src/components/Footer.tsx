import { Link } from 'react-router-dom'
import { siteContact } from '../data/siteContact'
import ServiceIcon from './ServiceIcon'

const navigation = [
  { label: 'Accueil', to: '/' },
  { label: 'Nos services', to: '/services' },
  { label: 'Génie civil', to: '/services/civil' },
  { label: 'Génie électrique', to: '/services/electrique' },
  { label: 'Recrutement', to: '/recrutement' },
  { label: 'Contact', to: '/contact' },
]

const missions = [
  { label: 'Statique et structures', to: '/services/civil#structures' },
  { label: 'Charpentes métalliques', to: '/services/civil#structures' },
  { label: 'Isolation thermique', to: '/services/civil#thermique' },
  { label: 'Isolation phonique et acoustique', to: '/services/civil#acoustique' },
  { label: 'Électricité — Courant fort', to: '/services/electrique#courant-fort' },
  { label: 'Électricité — Courant faible', to: '/services/electrique#courant-faible' },
]

const socialNetworks = [
  { name: 'LinkedIn', icon: 'linkedin', href: siteContact.socials.linkedin },
  { name: 'WhatsApp', icon: 'whatsapp', href: siteContact.socials.whatsapp },
  { name: 'Instagram', icon: 'instagram', href: siteContact.socials.instagram },
  { name: 'Facebook', icon: 'facebook', href: siteContact.socials.facebook },
] as const

const focusClass = 'focus-visible:!outline-sky-300 focus-visible:outline-offset-4'
const linkClass = `inline-flex min-h-11 items-center rounded-sm py-2 text-base leading-7 text-[#c0ccd6] underline-offset-4 transition-colors hover:text-white hover:underline motion-reduce:transition-none ${focusClass}`
const headingClass = 'mb-5 border-b border-white/10 pb-4 text-sm font-semibold tracking-[0.12em] text-white uppercase'
const contactIconClass = 'mt-1 shrink-0 [--icon-size:20px]'
const socialClass = `inline-flex size-11 items-center justify-center rounded-lg border [--icon-size:20px] ${focusClass}`
const socialColorClass = (icon: string) => icon === 'whatsapp'
  ? 'border-[#25d366]/30 bg-[#25d366]/10 text-[#25d366]'
  : 'border-white/15 bg-white/5 text-[#b7c7d5]'
const socialHoverClass = (icon: string) => icon === 'whatsapp'
  ? 'hover:border-[#25d366] hover:bg-[#25d366]/20 hover:text-[#59e88e]'
  : 'hover:border-[#63abe2] hover:bg-[#10518c]/30 hover:text-white'
const currentYear = new Date().getFullYear()

function Footer() {
  function scrollToTop() {
    document.querySelector<HTMLAnchorElement>('.navbar__brand')?.focus({ preventScroll: true })
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }

  return (
    <footer id="site-footer" className="scroll-mt-32 border-t border-[#193346] bg-[#07131d] text-[#c0ccd6]">
      <div className="mx-auto w-full max-w-[1760px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-x-12 gap-y-10 py-12 sm:grid-cols-2 sm:py-16 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)_minmax(0,0.7fr)_minmax(0,1fr)] xl:gap-x-10 xl:py-20">
          <div className="min-w-0">
            <Link to="/" aria-label="H&A Ingénieure — Accueil" className={`inline-flex max-w-full items-center gap-3.5 rounded-md ${focusClass}`}>
              <span className="flex size-[68px] shrink-0 items-center justify-center overflow-hidden rounded-md bg-white p-1.5">
                <img src="/logo.jpeg" alt="" width="1080" height="823" loading="lazy" className="h-auto w-full" />
              </span>
              <span className="min-w-0">
                <span className="block text-[22px] leading-tight font-bold tracking-tight text-white"><span className="text-[#63abe2]">H&A</span> Ingénieure</span>
                <span className="mt-1.5 block text-sm leading-5 text-[#c0ccd6]">Bureau d’études techniques</span>
              </span>
            </Link>
            <p className="mt-7 max-w-sm text-base leading-[1.9] text-[#c0ccd6]">Génie civil · Structures · Électricité · Isolation thermique et acoustique.</p>
            <p className="mt-3 max-w-sm text-[15px] leading-7 text-[#9eafbd]">Conception, études, suivi et conseil pour vos projets de construction.</p>

            <div className="mt-6 flex max-w-sm items-center gap-3 rounded2xl border border-white/15 bg-white/5 px-4 py-4">
              <div>
                <p className="text-sm leading-6 font-semibold text-[#edf4f9]">BET agréé par l’État</p>
                <p className="mt-0.5 text-[13px] leading-5 text-[#b7c7d5]">Domaines d’agrément : D14 · D15</p>
              </div>
            </div>

            <ul aria-label="Réseaux sociaux" className="mt-6 flex flex-wrap gap-2.5">
              {socialNetworks.map((network) => (
                <li key={network.name}>
                  {network.href ? (
                    <a href={network.href} target="_blank" rel="noopener noreferrer" aria-label={`${network.name} (nouvel onglet)`} className={`${socialClass} ${socialColorClass(network.icon)} ${socialHoverClass(network.icon)} transition-colors motion-reduce:transition-none`}><ServiceIcon name={network.icon} /></a>
                  ) : (
                    <span role="img" aria-label={`${network.name} — lien à venir`} title={`${network.name} — lien à venir`} className={`${socialClass} ${socialColorClass(network.icon)}`}><ServiceIcon name={network.icon} /></span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <nav aria-labelledby="footer-missions-title" className="min-w-0">
            <h2 id="footer-missions-title" className={headingClass}>Nos missions</h2>
            <ul className="space-y-1">
              {missions.map((mission) => <li key={mission.label}><Link to={mission.to} className={linkClass}>{mission.label}</Link></li>)}
            </ul>
          </nav>

          <nav aria-labelledby="footer-navigation-title" className="min-w-0">
            <h2 id="footer-navigation-title" className={headingClass}>Navigation</h2>
            <ul className="space-y-1">
              {navigation.map((item) => <li key={item.to}><Link to={item.to} className={linkClass}>{item.label}</Link></li>)}
            </ul>
          </nav>

          <section aria-labelledby="footer-contact-title" className="min-w-0">
            <h2 id="footer-contact-title" className={headingClass}>Contact</h2>
            <address className="space-y-5 pt-2 text-base leading-7 not-italic">
              <div className="flex items-start gap-3">
                <span className={`${contactIconClass} text-[#fb8b7f]`}><ServiceIcon name="mail" /></span>
                {siteContact.isPlaceholder ? <span className="min-w-0 break-all">{siteContact.email}</span> : <a href={`mailto:${siteContact.email}`} className={`min-w-0 break-all hover:text-white hover:underline ${focusClass}`}>{siteContact.email}</a>}
              </div>
              {siteContact.phones.map((phone) => (
                <div key={phone.label} className="flex items-start gap-3">
                  <span className={`${contactIconClass} text-[#60a5fa]`}><ServiceIcon name="phone" /></span>
                  <div className="flex min-w-0 flex-wrap items-baseline gap-x-2">
                    {siteContact.isPlaceholder ? <span>{phone.number}</span> : <a href={`tel:${phone.number.replace(/[^\d+]/g, '')}`} className={`hover:text-white hover:underline ${focusClass}`}>{phone.number}</a>}
                    <span className="text-xs text-[#9eafbd]">{phone.label}</span>
                  </div>
                </div>
              ))}
              <div className="flex items-start gap-3">
                <span className={`${contactIconClass} text-[#63abe2]`}><ServiceIcon name="map-pin" /></span>
                <div className="min-w-0">
                  <p className="whitespace-pre-line">{siteContact.address}</p>
                  {siteContact.openingHours && <p className="mt-3 text-sm leading-7 whitespace-pre-line text-[#9eafbd]">{siteContact.openingHours}</p>}
                </div>
              </div>
            </address>
            {siteContact.isPlaceholder && <p className="mt-5 pl-8 text-xs leading-5 text-[#9eafbd]">Coordonnées d’exemple</p>}
          </section>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-white/10 py-5 sm:flex-row sm:items-center sm:gap-6">
          <p className="text-xs leading-6 text-[#9eafbd]">© {currentYear} H&A Ingénieure. Tous droits réservés.</p>
          <button type="button" onClick={scrollToTop} className={`inline-flex min-h-11 cursor-pointer items-center gap-3 rounded-sm text-sm text-[#c0ccd6] transition-colors hover:text-white focus-visible:outline-2 motion-reduce:transition-none ${focusClass}`}>
            Retour en haut
            <span className="flex size-9 items-center justify-center rounded-md border border-white/15 bg-white/5 [--icon-size:16px]"><ServiceIcon name="arrow-up" /></span>
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
