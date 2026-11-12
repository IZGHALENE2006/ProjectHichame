import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { civilServices } from '../data/civilServices'
import type { CivilService } from '../data/civilServices'
import StructureCarousel from './StructureCarousel'
import ServiceIcon from './ServiceIcon'

gsap.registerPlugin(ScrollTrigger)

const containerClass = 'mx-auto w-full max-w-[1336px] px-5 sm:px-8 lg:px-12'
const eyebrowClass = 'mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#10518c] before:h-px before:w-7 before:bg-current'
const symbolClass = 'inline-flex size-12 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-[#edf4fc] text-[#10518c]'

function ServiceSection({ service }: { service: CivilService }) {
  return (
    <section
      id={service.id}
      aria-labelledby={`${service.id}-title`}
      className={`scroll-mt-52 border-b border-slate-200/70 py-12 sm:scroll-mt-56 sm:py-16 lg:py-20 ${service.id === 'thermique' ? 'bg-[#f5f7fb]' : 'bg-white'}`}
    >
      <div className={containerClass}>
        <header data-civil-reveal className="mb-8 max-w-4xl sm:mb-11">
          <p className={eyebrowClass}>{service.number} / {service.subtitle}</p>
          <h2 id={`${service.id}-title`} className="max-w-3xl text-[28px] leading-[1.2] font-semibold tracking-[-0.035em] text-[#15191f] sm:text-4xl">
            {service.title}
          </h2>
          <div className="mt-5 space-y-3 text-sm leading-[1.9] text-slate-600 sm:text-[15px]">
            {service.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </header>

        <div className={`grid items-start gap-8 lg:gap-14 ${service.image ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]' : ''}`}>
          {service.image && (
            <div data-civil-reveal className="min-w-0 lg:sticky lg:top-[216px] [@media(max-height:800px)]:!static">
              <figure className="m-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_8px_32px_rgba(16,40,70,0.04)]">
                <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 text-[10px] font-semibold tracking-[0.14em] text-slate-500 uppercase">
                  <span className="size-1.5 rounded-full bg-[#10518c]" />
                  {service.subtitle}
                </div>
                <div className={`flex items-center justify-center overflow-hidden bg-[#edf0f4] ${service.id === 'thermique' ? 'h-[380px] sm:h-[460px]' : 'aspect-[3/2]'}`}>
                  <img src={service.image.src} alt={service.image.alt} loading="lazy" className="h-full w-full object-contain" />
                </div>
                <figcaption className="flex items-center gap-4 border-t border-slate-100 p-5">
                  <span className={symbolClass}><ServiceIcon name={service.icon} /></span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800">{service.navTitle === 'Thermique' ? 'Performance énergétique' : 'Confort acoustique'}</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">{service.image.caption}</p>
                  </div>
                </figcaption>
              </figure>
            </div>
          )}

          <div data-civil-reveal className="min-w-0">
            <div className="mb-2 flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-lg bg-[#edf4fc] text-[#10518c] [&_svg]:size-5"><ServiceIcon name={service.icon} /></span>
              <h3 className="text-xl font-semibold tracking-tight text-slate-900">Nos prestations</h3>
            </div>
            <ul className="m-0 list-none divide-y divide-slate-200/80 p-0" aria-label={`Prestations : ${service.navTitle}`}>
              {service.prestations.map((item) => (
                <li key={item.title} className="flex gap-3 py-4">
                  <span className="mt-1 shrink-0 text-[#10518c] [&_svg]:size-4"><ServiceIcon name="check" /></span>
                  <div>
                    <h4 className="text-sm leading-relaxed font-semibold text-slate-800">{item.title}</h4>
                    <p className="mt-1 text-[13px] leading-[1.8] text-slate-600">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {service.id === 'structures' && (
            <div data-civil-reveal className="mx-auto w-full max-w-3xl">
              <StructureCarousel />
            </div>
          )}
        </div>

        <aside data-civil-reveal aria-label={`${service.commitment.title} : ${service.navTitle}`} className="mt-10 grid gap-5 rounded-xl border border-[#dce7f3] bg-[#eef4fb] p-6 sm:mt-12 sm:p-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,2fr)] lg:gap-10">
          <div>
            <span className="mb-3 inline-flex text-[#10518c]"><ServiceIcon name="shield" /></span>
            <h3 className="text-lg font-semibold tracking-tight text-slate-900">{service.commitment.title}</h3>
          </div>
          <div className="space-y-3 text-[13px] leading-[1.9] text-slate-600 sm:text-sm">
            {service.commitment.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {service.commitment.ambition && (
              <p className="border-t border-[#d3dfed] pt-4 text-[#163e64]">
                <strong className="font-semibold">Notre ambition : </strong>{service.commitment.ambition}
              </p>
            )}
          </div>
        </aside>
      </div>
    </section>
  )
}

function ServiceCivil() {
  const page = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!page.current) return
    const scope = page.current
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('[data-civil-intro]', { y: 18, opacity: 0, duration: 0.65, stagger: 0.1, ease: 'power2.out', clearProps: 'opacity,transform' })
      gsap.utils.toArray<HTMLElement>('[data-civil-reveal]', scope).forEach((element) => {
        gsap.from(element, {
          y: 22, opacity: 0, duration: 0.6, ease: 'power2.out', clearProps: 'opacity,transform',
          scrollTrigger: { trigger: element, start: 'top 94%', once: true },
        })
      })
    }, scope)
    return () => media.revert()
  }, [])



  return (
    <div ref={page} className="bg-white">
      <header className="overflow-hidden bg-[#0b1828] bg-[radial-gradient(ellipse_at_top_right,#153f64,transparent_65%)] pt-6 pb-12 text-white sm:pb-16">
        <div className={containerClass}>
          <nav aria-label="Fil d’Ariane" className="flex flex-wrap items-center gap-2 text-xs leading-relaxed text-[#adbed2] sm:gap-3">
            <Link to="/" className="inline-flex min-h-8 items-center hover:text-white">Accueil</Link>
            <span aria-hidden="true">/</span>
            <Link to="/services" className="inline-flex min-h-8 items-center hover:text-white">Nos services</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-white">Génie civil</span>
          </nav>
          <div className="pt-9 sm:pt-12">
            <p data-civil-intro className="mb-5 flex items-center gap-3 text-[10px] font-semibold tracking-[0.17em] text-[#9acbfa] uppercase before:h-px before:w-7 before:bg-current">Études & ingénierie du bâtiment</p>
            <h1 data-civil-intro className="text-[42px] leading-[1.1] font-semibold tracking-[-0.045em] sm:text-6xl">Génie <span className="text-[#8dc8ff]">civil.</span></h1>
            <p data-civil-intro className="mt-6 max-w-2xl text-[15px] leading-[1.9] text-[#b9c9db] sm:text-base">
              Des structures sûres, des bâtiments économes et des espaces confortables.
              Trois expertises complémentaires, une approche globale de votre projet.
            </p>
          </div>
        </div>
      </header>



      {civilServices.map((service) => <ServiceSection key={service.id} service={service} />)}

      <footer className="bg-[#0b1828] py-10 text-white sm:py-12">
        <div className={`${containerClass} flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between`}>
          <div>
            <p className="text-xl font-semibold tracking-tight">Une ingénierie complémentaire.</p>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#b9c9db]">Découvrez également nos études en courant fort et courant faible.</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link to="/services" className="inline-flex min-h-11 items-center gap-2 text-xs text-[#b9c9db] hover:text-white [&_svg]:size-4"><ServiceIcon name="arrow-left" /> Nos services</Link>
            <Link to="/services/electrique" className="inline-flex min-h-12 items-center gap-4 rounded-md border border-[#456584] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#183956] [&_svg]:size-4">Génie électrique <ServiceIcon name="arrow-right" /></Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ServiceCivil

