import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { structureSlides } from '../data/civilServices'
import ServiceIcon from './ServiceIcon'

const controlClass = 'inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-[#10518c] transition-colors hover:border-[#10518c] hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#10518c] motion-reduce:transition-none'

function StructureCarousel() {
  const container = useRef<HTMLDivElement>(null)
  const slideElement = useRef<HTMLDivElement>(null)
  const direction = useRef(1)
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const [index, setIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [isVisible, setIsVisible] = useState(!document.hidden)
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const slide = structureSlides[index]
  const autoPlaying = isPlaying && !isHovered && isInView && isVisible && !reducedMotion

  const move = useCallback((step: number) => {
    direction.current = step
    setIndex((current) => (current + step + structureSlides.length) % structureSlides.length)
  }, [])

  function navigate(step: number) {
    setIsPlaying(false)
    move(step)
  }

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setReducedMotion(preference.matches)
    const updateVisibility = () => setIsVisible(!document.hidden)
    preference.addEventListener('change', updateMotion)
    document.addEventListener('visibilitychange', updateVisibility)
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { threshold: 0.2 })
    if (container.current) observer.observe(container.current)
    return () => {
      preference.removeEventListener('change', updateMotion)
      document.removeEventListener('visibilitychange', updateVisibility)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!autoPlaying) return
    const timer = window.setTimeout(() => move(1), 5500)
    return () => window.clearTimeout(timer)
  }, [index, autoPlaying, move])

  useEffect(() => {
    for (const step of [-1, 1]) {
      const image = new Image()
      image.src = structureSlides[(index + step + structureSlides.length) % structureSlides.length].src
    }
  }, [index])

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(slideElement.current,
        { opacity: 0, x: direction.current * 22 },
        { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out', clearProps: 'opacity,transform' },
      )
    })
    return () => media.revert()
  }, [index])

  return (
    <div
      ref={container}
      role="region"
      aria-roledescription="carrousel"
      aria-label="Études et modèles de structures"
      tabIndex={0}
      className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_8px_32px_rgba(16,40,70,0.04)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#10518c]"
      onPointerEnter={(event) => { if (event.pointerType !== 'touch') setIsHovered(true) }}
      onPointerLeave={() => setIsHovered(false)}
      onFocusCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null) && event.target.matches(':focus-visible')) setIsPlaying(false)
      }}
      onKeyDown={(event) => {
        if (event.key === 'Tab') setIsPlaying(false)
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault()
          navigate(event.key === 'ArrowRight' ? 1 : -1)
        }
      }}
    >
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
        <span className="text-[10px] font-semibold tracking-[0.14em] text-slate-500 uppercase">Études & modélisations</span>
        <span className="shrink-0 font-mono text-xs text-[#10518c]" aria-hidden="true">{String(index + 1).padStart(2, '0')} <span className="text-slate-400">/ 08</span></span>
      </div>

      <figure className="m-0">
        <div
          className="aspect-[4/3] touch-pan-y overflow-hidden bg-white"
          onPointerDown={(event) => {
            if (event.pointerType === 'touch') touchStart.current = { x: event.clientX, y: event.clientY }
          }}
          onPointerUp={(event) => {
            if (!touchStart.current) return
            const dx = event.clientX - touchStart.current.x
            const dy = event.clientY - touchStart.current.y
            touchStart.current = null
            if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) navigate(dx < 0 ? 1 : -1)
          }}
          onPointerCancel={() => { touchStart.current = null }}
        >
          <div ref={slideElement} className="h-full w-full p-3 sm:p-5">
            <img key={slide.src} src={slide.src} alt={slide.alt} className="h-full w-full object-contain" draggable={false} />
          </div>
        </div>
        <figcaption className="min-h-20 border-t border-slate-100 bg-slate-50/60 px-5 py-4" aria-live={isPlaying && !reducedMotion ? 'off' : 'polite'} aria-atomic="true">
          <span className="sr-only">Image {index + 1} sur {structureSlides.length}. </span>
          <p className="text-sm font-medium leading-relaxed text-slate-800">{slide.title}</p>
          <p className="mt-1 text-xs text-slate-500">Ingénierie, calcul et suivi technique</p>
        </figcaption>
      </figure>

      <div className="border-t border-slate-100 px-5 pt-2 pb-4">
        <div className="flex gap-1" aria-label="Choisir une image">
          {structureSlides.map((item, itemIndex) => (
            <button
              key={item.src}
              type="button"
              aria-label={`Afficher l’image ${itemIndex + 1} : ${item.title}`}
              aria-pressed={itemIndex === index}
              className="group flex min-h-9 min-w-0 flex-1 cursor-pointer items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10518c]"
              onClick={() => {
                setIsPlaying(false)
                direction.current = itemIndex >= index ? 1 : -1
                setIndex(itemIndex)
              }}
            >
              <span className={`h-1 w-full rounded-full transition-colors motion-reduce:transition-none ${itemIndex === index ? 'bg-[#10518c]' : 'bg-slate-200 group-hover:bg-blue-300'}`} />
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {!reducedMotion && (
              <button
                type="button"
                className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-md pr-3 text-xs font-medium text-slate-600 hover:text-[#10518c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10518c] [--icon-size:16px]"
                onClick={() => setIsPlaying((current) => !current)}
                aria-label={isPlaying ? 'Mettre le défilement en pause' : 'Reprendre le défilement automatique'}
              >
                <ServiceIcon name={isPlaying ? 'pause' : 'play'} />
                {isPlaying ? 'Pause' : 'Lecture'}
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button type="button" className={controlClass} onClick={() => navigate(-1)} aria-label="Image précédente"><ServiceIcon name="arrow-left" /></button>
            <button type="button" className={`${controlClass} !border-[#10518c] !bg-[#10518c] !text-white hover:!bg-[#0b3e6b]`} onClick={() => navigate(1)} aria-label="Image suivante"><ServiceIcon name="arrow-right" /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StructureCarousel
