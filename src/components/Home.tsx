import './Home.css'

import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ServiceIcon from './ServiceIcon'

gsap.registerPlugin(ScrollTrigger)

const cards = [
  {
    icon: 'drafting',
    title: 'Le bureau d’études',
    description:
      'H&A INGÉNIEURE est un bureau d’études d’ingénierie en bâtiment et génie civil. Notre équipe d’ingénieurs et de projeteurs intervient dans les domaines suivants :',
    items: [
      'Béton armé',
      'Charpente métallique',
      'Électricité (CFO / CFA)',
      'Assainissement, réseaux et voirie',
    ],
  },
  {
    icon: 'building',
    title: 'Domaines d’activités',
    description:
      'Nous réalisons pour le compte de nos clients publics ou privés les études d’ingénierie pour les types d’ouvrages suivants :',
    items: [
      'Habitations individuelles ou groupements d’habitations',
      'Immeubles de logements',
      'Immeubles de bureaux',
      'Bâtiments à usages industriels',
      'Équipements publics (écoles, hôpitaux, gymnases)',
    ],
  },
  {
    icon: 'users',
    title: 'Nos clients',
    description:
      'Nous accompagnons les acteurs publics et privés dans leurs projets de construction :',
    items: [
      'Particuliers',
      'Entreprises',
      'Fonds d’investissements privés',
      'Maîtres d’ouvrage publics',
      'Agences d’architecture et bureaux d’études',
    ],
  },
] as const

function Home() {
  const cardGrid = useRef<HTMLDivElement>(null)
  const hero = useRef<HTMLElement>(null)
  const specialtyText = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const section = hero.current
    const text = specialtyText.current
    if (!section || !text) return

    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.home-hero__accent', {
        yPercent: 105, opacity: 0, duration: 0.9, delay: 0.2,
        ease: 'power3.out', clearProps: 'opacity,transform',
      })

      const typing = gsap.timeline({ repeat: -1, repeatDelay: 0.3 })
      for (const word of ['Génie civil', 'Génie électrique']) {
        const progress = { letters: 0 }
        const write = () => { text.textContent = word.slice(0, Math.round(progress.letters)) }
        typing.fromTo(progress, { letters: 0 }, {
          letters: word.length, duration: word.length * 0.09,
          ease: 'none', onUpdate: write,
        }, '+=0.3')
        typing.to(progress, {
          letters: 0, duration: word.length * 0.045,
          ease: 'none', onUpdate: write,
        }, '+=2')
      }

      let inView = true
      const updatePlayback = () => {
        const paused = document.hidden || !inView
        typing.paused(paused)
        section.dataset.motionPaused = String(paused)
      }
      const observer = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting
        updatePlayback()
      })
      observer.observe(section)
      document.addEventListener('visibilitychange', updatePlayback)
      updatePlayback()

      return () => {
        observer.disconnect()
        document.removeEventListener('visibilitychange', updatePlayback)
        delete section.dataset.motionPaused
        text.textContent = 'Génie civil'
      }
    }, section)
    return () => media.revert()
  }, [])

  useLayoutEffect(() => {
    if (!cardGrid.current) return
    const media = gsap.matchMedia()
    media.add({
      motion: '(prefers-reduced-motion: no-preference)',
      desktop: '(min-width: 801px)',
    }, (context) => {
      if (!context.conditions?.motion) return
      gsap.utils.toArray<HTMLElement>('.home-card-reveal', cardGrid.current).forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 36,
          duration: 0.7,
          delay: context.conditions?.desktop ? index * 0.12 : 0,
          ease: 'power2.out',
          clearProps: 'opacity,transform',
          scrollTrigger: { trigger: card, start: 'top 90%', once: true },
        })
      })
    }, cardGrid)
    return () => media.revert()
  }, [])

  return (
    <>
      <section ref={hero} className="home-hero" aria-labelledby="home-title">
        <img
          className="home-hero__photo"
          src="/photoAccueil.jpeg"
          alt="Équipe d’ingénieurs examinant les plans d’un projet sur un chantier"
          width="960"
          height="640"
          fetchPriority="high"
        />
        <div className="home-hero__overlay" />

        <div className="home-container home-hero__content">
          <p className="home-eyebrow home-eyebrow--light">
            <span className="sr-only">Génie civil et génie électrique</span>
            <span aria-hidden="true" className="home-hero__specialty">
              <span className="home-hero__specialty-animated">
                <span ref={specialtyText}>Génie civil</span>
                <span className="home-hero__cursor" />
              </span>
              <span className="home-hero__specialty-static">Génie civil & génie électrique</span>
            </span>
          </p>
          <h1 id="home-title">
            L’ingénierie au service<br />
            <span className="home-hero__accent-mask"><span className="home-hero__accent">de vos projets.</span></span>
          </h1>
          <p className="home-hero__description">
            Conception, études, suivi et conseil.<br />
            Votre bureau d’études en bâtiment et génie civil.
          </p>
          <a className="home-hero__link" href="#presentation">
            Découvrir notre bureau
            <ServiceIcon name="arrow-down" />
          </a>
        </div>

        <div className="home-accreditation">
          <div className="home-container home-accreditation__inner">
            <span className="home-accreditation__icon">
              <ServiceIcon name="shield" />
            </span>
            <div className="home-accreditation__text">
              <p className='text-6xl'>BET AGRÉÉ PAR L'ÉTAT : D14 D15</p>
            </div>
          </div>
        </div>
      </section>

      <section id="presentation" className="home-presentation" aria-labelledby="presentation-title">
        <div className="home-container">
          <div className="home-section-heading">
            <p className="home-eyebrow">H&A Ingénieure</p>
            <h2 id="presentation-title">Une expertise au plus près de vos projets.</h2>
          </div>

          <div ref={cardGrid} className="home-cards">
            {cards.map((card, index) => (
              <div className="`home-card-reveal`" key={card.title}>
                <article className="home-card">
                  <div className="home-card__top">
                    <span className="home-card__icon">
                      <ServiceIcon name={card.icon} />
                    </span>
                    <span className="home-card__number" aria-hidden="true">
                      0{index + 1}
                    </span>
                  </div>
                  <h3>{card.title}</h3>
                  <p className="home-card__description">{card.description}</p>
                  <ul className="home-card__list">
                    {card.items.map((item) => (
                      <li key={item}>
                        <ServiceIcon name="check" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Home

