import { useLayoutEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { gsap } from 'gsap'
import { siteContact } from '../data/siteContact'
import { createWhatsAppUrl } from '../utils/contactWhatsApp'
import ServiceIcon from './ServiceIcon'

const containerClass = 'mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12'
const labelClass = 'mb-2 block text-[13px] font-semibold text-slate-700'
const fieldClass = 'block min-h-12 w-full min-w-0 rounded-lg border border-slate-200 bg-[#f8fafc] px-3.5 py-3 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#10518c] focus:bg-white focus:ring-4 focus:ring-blue-100/60 motion-reduce:transition-none sm:text-sm'
const iconClass = 'flex size-11 shrink-0 items-center justify-center rounded-xl border [--icon-size:22px]'
const contactLinkClass = 'rounded-sm break-all text-[15px] leading-7 text-slate-600 transition-colors hover:text-[#10518c] hover:underline underline-offset-4 motion-reduce:transition-none'
const services = ['Génie civil & structures', 'Génie électrique', 'Isolation thermique', 'Isolation phonique & acoustique', 'Autre demande']

function Contact() {
  const page = useRef<HTMLDivElement>(null)
  const feedback = useRef<HTMLDivElement>(null)
  const [message, setMessage] = useState('')
  const [notice, setNotice] = useState('')
  const [whatsappUrl, setWhatsappUrl] = useState('')
  const whatsappAvailable = Boolean(createWhatsAppUrl(siteContact.whatsappNumber, ''))

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('[data-contact-reveal]', {
        y: 18, opacity: 0, duration: 0.7, stagger: 0.1,
        ease: 'power2.out', clearProps: 'opacity,transform',
      })
    }, page)
    return () => media.revert()
  }, [])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const value = (name: string) => String(data.get(name) ?? '').trim()

    for (const name of ['fullName', 'message']) {
      const field = form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement
      field.setCustomValidity(value(name) ? '' : 'Veuillez renseigner ce champ.')
    }
    if (!form.reportValidity()) return

    const text = [
      'Bonjour H&A Ingénieure,',
      'Je vous contacte au sujet de mon projet.',
      '',
      `Nom : ${value('fullName')}`,
      `Email : ${value('email')}`,
      ...(value('phone') ? [`Téléphone : ${value('phone')}`] : []),
      ...(value('company') ? [`Société : ${value('company')}`] : []),
      `Domaine : ${value('service')}`,
      '',
      'Message :',
      value('message'),
    ].join('\n')
    const url = createWhatsAppUrl(siteContact.whatsappNumber, text)

    if (!url) {
      setNotice('Le contact par WhatsApp sera bientôt disponible. Votre message reste dans le formulaire.')
      setWhatsappUrl('')
    } else {
      window.open(url, '_blank', 'noopener,noreferrer')
      setWhatsappUrl(url)
      setNotice('Votre message est prêt. Finalisez son envoi dans WhatsApp.')
    }
    requestAnimationFrame(() => feedback.current?.focus({ preventScroll: true }))
  }

  return (
    <div ref={page} className="bg-white">
      <section aria-labelledby="contact-title" className="relative isolate overflow-hidden bg-[#0b1828] text-white">
        <img src="/photoAccueil.jpeg" alt="" width="960" height="640" fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_46%]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(6,19,34,0.93),rgba(16,81,140,0.78),rgba(6,26,44,0.65))]" />
        <div className={`${containerClass} py-14 text-center sm:py-20 lg:py-[88px]`}>
          <p data-contact-reveal className="mb-4 flex items-center justify-center gap-3 text-[10px] font-semibold tracking-[0.18em] text-[#aed8ff] uppercase before:h-px before:w-7 before:bg-current after:h-px after:w-7 after:bg-current">Contact · H&A Ingénieure</p>
          <h1 data-contact-reveal id="contact-title" className="text-[38px] leading-[1.12] font-semibold tracking-[-0.045em] sm:text-[54px] lg:text-[60px]">Parlons de <span className="text-[#a7d5ff]">votre projet.</span></h1>
          <p data-contact-reveal className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#dfebf5] sm:text-base">Une étude, un conseil, un projet à concrétiser.<br className="hidden sm:block" /> Notre équipe est à votre écoute.</p>
        </div>
      </section>

      <section aria-labelledby="contact-heading" className="py-12 sm:py-16 lg:py-20">
        <div className={containerClass}>
          <div data-contact-reveal className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
            <p className="mb-3 text-[10px] font-semibold tracking-[0.16em] text-[#10518c] uppercase">Faisons connaissance</p>
            <h2 id="contact-heading" className="text-[27px] leading-tight font-semibold tracking-[-0.035em] text-[#15191f] sm:text-[34px]">Votre projet commence par un échange.</h2>
          </div>

          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 xl:gap-20">
            <aside data-contact-reveal aria-labelledby="contact-details-title" className="min-w-0 lg:pt-3">
              <h3 id="contact-details-title" className="text-2xl font-semibold tracking-tight text-[#15191f]">Restons en contact.</h3>
              <p className="mt-4 max-w-md text-sm leading-[1.9] text-slate-600">Décrivez-nous vos besoins en génie civil, en électricité ou en performance du bâtiment. Nous échangerons sur les prochaines étapes de votre projet.</p>

              <address className="mt-8 space-y-6 not-italic">
                <div className="flex items-start gap-4">
                  <span className={`${iconClass} border-[#f4d2ce] bg-[#fff3f1] text-[#c2413b]`}><ServiceIcon name="mail" /></span>
                  <div className="min-w-0">
                    <p className="mb-1 text-sm font-semibold text-slate-800">Écrivez-nous</p>
                    {siteContact.isPlaceholder ? <p className="break-all text-[15px] leading-7 text-slate-600">{siteContact.email}</p> : <a href={`mailto:${siteContact.email}`} className={contactLinkClass}>{siteContact.email}</a>}
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className={`${iconClass} border-blue-100 bg-blue-50 text-[#2563eb]`}><ServiceIcon name="phone" /></span>
                  <div className="min-w-0">
                    <p className="mb-1 text-sm font-semibold text-slate-800">Appelez-nous</p>
                    {siteContact.phones.map((phone) => (
                      <div key={phone.label} className="flex flex-wrap items-baseline gap-x-2">
                        {siteContact.isPlaceholder ? <span className="text-[15px] leading-7 text-slate-600">{phone.number}</span> : <a href={`tel:${phone.number.replace(/[^\d+]/g, '')}`} className={contactLinkClass}>{phone.number}</a>}
                        <span className="text-[11px] text-slate-500">{phone.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className={`${iconClass} border-[#dce8f4] bg-[#edf4fb] text-[#10518c]`}><ServiceIcon name="map-pin" /></span>
                  <div className="min-w-0">
                    <p className="mb-1 text-sm font-semibold text-slate-800">Notre bureau</p>
                    <p className="text-[15px] leading-7 whitespace-pre-line text-slate-600">{siteContact.address}</p>
                  </div>
                </div>
              </address>

              {siteContact.isPlaceholder && <p className="mt-4 text-xs leading-5 text-slate-500">Coordonnées d’exemple.</p>}

              {siteContact.openingHours && (
                <div className="mt-8 border-t border-slate-200 pt-6">
                  <h4 className="text-[11px] font-semibold tracking-[0.1em] text-[#10518c] uppercase">Horaires du bureau</h4>
                  <p className="mt-3 text-sm leading-7 whitespace-pre-line text-slate-600">{siteContact.openingHours}</p>
                </div>
              )}
              <div className="mt-7 flex items-start gap-3 rounded-xl border border-[#e0eaf4] bg-[#f4f8fc] p-5 text-[#10518c] [--icon-size:20px]">
                <ServiceIcon name="shield" />
                <div>
                  <p className="text-sm font-semibold">Un interlocuteur pour votre projet</p>
                  <p className="mt-1 text-xs leading-6 text-slate-600">Conception, études, suivi et conseil.</p>
                </div>
              </div>
            </aside>

            <div data-contact-reveal className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_48px_rgba(16,40,70,0.05)] sm:p-8 lg:p-9">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="mb-2 text-[10px] font-semibold tracking-[0.14em] text-[#10518c] uppercase">Votre demande</p>
                  <h3 id="contact-form-title" className="text-2xl font-semibold tracking-tight text-[#15191f]">Comment pouvons-nous vous aider ?</h3>
                </div>
                <span className={`${iconClass} hidden border-[#bce9cd] bg-[#eefbf3] text-[#128c4a] sm:flex`}><ServiceIcon name="whatsapp" /></span>
              </div>
              <p id="contact-form-help" className="mt-3 text-xs leading-6 text-slate-500">Les champs marqués d’un <span className="text-[#10518c]">*</span> sont obligatoires.</p>

              <form aria-labelledby="contact-form-title" aria-describedby="contact-form-help" className="mt-7" onSubmit={handleSubmit} onInput={(event) => {
                const field = event.target
                if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) field.setCustomValidity('')
                setNotice('')
                setWhatsappUrl('')
              }}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="min-w-0">
                    <label htmlFor="contact-name" className={labelClass}>Nom complet <span className="text-[#10518c]">*</span></label>
                    <input id="contact-name" name="fullName" type="text" autoComplete="name" required maxLength={100} placeholder="Votre nom et prénom" className={fieldClass} />
                  </div>
                  <div className="min-w-0">
                    <label htmlFor="contact-email" className={labelClass}>Email <span className="text-[#10518c]">*</span></label>
                    <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={160} placeholder="vous@exemple.com" className={fieldClass} />
                  </div>
                  <div className="min-w-0">
                    <label htmlFor="contact-phone" className={labelClass}>Téléphone <span className="font-normal text-slate-500">(facultatif)</span></label>
                    <input id="contact-phone" name="phone" type="tel" autoComplete="tel" maxLength={30} placeholder="+212 6 00 00 00 00" className={fieldClass} />
                  </div>
                  <div className="min-w-0">
                    <label htmlFor="contact-company" className={labelClass}>Société <span className="font-normal text-slate-500">(facultatif)</span></label>
                    <input id="contact-company" name="company" type="text" autoComplete="organization" maxLength={100} placeholder="Votre entreprise" className={fieldClass} />
                  </div>
                </div>
                <div className="mt-5">
                  <label htmlFor="contact-service" className={labelClass}>Votre projet concerne <span className="text-[#10518c]">*</span></label>
                  <select id="contact-service" name="service" defaultValue="" required className={fieldClass}>
                    <option value="" disabled>Choisir un domaine</option>
                    {services.map((service) => <option key={service} value={service}>{service}</option>)}
                  </select>
                </div>
                <div className="mt-5">
                  <label htmlFor="contact-message" className={labelClass}>Votre message <span className="text-[#10518c]">*</span></label>
                  <textarea id="contact-message" name="message" required rows={5} maxLength={1500} value={message} onChange={(event) => setMessage(event.target.value)} aria-describedby="contact-message-help" placeholder="Parlez-nous de votre projet : type de bâtiment, localisation, besoins…" className={`${fieldClass} min-h-36 resize-y leading-7`} />
                  <p id="contact-message-help" className="mt-2 text-right text-[11px] text-slate-500">{message.length} / 1 500 caractères</p>
                </div>

                {notice && (
                  <div ref={feedback} role="status" tabIndex={-1} className="mt-5 rounded-lg border border-[#cbdff1] bg-[#f0f6fc] p-4 text-sm leading-6 text-[#163e64] outline-none focus-visible:ring-2 focus-visible:ring-[#10518c]">
                    <p>{notice}</p>
                    {whatsappUrl && <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-sm font-semibold underline underline-offset-4 [--icon-size:16px]">Ouvrir la conversation <ServiceIcon name="arrow-right" /></a>}
                  </div>
                )}

                <button type="submit" aria-describedby="contact-whatsapp-help" className="mt-6 inline-flex min-h-13 w-full cursor-pointer items-center justify-center gap-3 rounded-lg bg-[#10518c] px-4 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#0b3e6b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#10518c] motion-reduce:transition-none [--icon-size:20px]">
                  <span className="inline-flex text-[#25d366]"><ServiceIcon name="whatsapp" /></span> Continuer sur WhatsApp
                </button>
                <p id="contact-whatsapp-help" className="mt-3 text-center text-xs leading-6 text-slate-500">Votre message sera prérempli dans WhatsApp.<br />Il vous restera à l’envoyer.</p>
                {!whatsappAvailable && <p className="mt-3 text-center text-xs leading-5 text-slate-500">Le contact par WhatsApp sera bientôt disponible.</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
