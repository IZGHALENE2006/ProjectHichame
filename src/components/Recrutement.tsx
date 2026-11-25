import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import ServiceIcon from './ServiceIcon'

const MAX_SIZE = 5 * 1024 * 1024
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyQGeG8bNJrXV_bzyQFkWWyXF9HNvt36qCQ85qmBzHKYSG3FrcRySiWFJsV220oPbEhAA/exec'
const ALLOWED = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

interface ApplicationInfo {
  Nom_complet: string
  email: string
  tel: string
  Domaine: string
  recherche: string
  presentation: string
}

const emptyApplication: ApplicationInfo = {
  Nom_complet: '', email: '', tel: '', Domaine: '', recherche: '', presentation: '',
}

const fieldClass = 'block min-h-12 w-full rounded-lg border border-slate-200 bg-[#f8fafc] px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#10518c] focus:bg-white focus:ring-4 focus:ring-blue-100/70 disabled:cursor-wait disabled:opacity-60 motion-reduce:transition-none'
const labelClass = 'mb-2 block text-[13px] font-medium text-slate-700'
const primaryButtonClass = 'inline-flex min-h-12 cursor-pointer items-center justify-center gap-3 rounded-lg bg-[#10518c] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#0b3e6b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#10518c] disabled:cursor-wait disabled:opacity-70 motion-reduce:transition-none'
const steps = [
  { title: 'Présentez votre parcours', description: 'Quelques informations sur vous et un CV à jour.' },
  { title: 'Nous étudions votre dossier', description: 'Chaque candidature fait l’objet d’une attention particulière.' },
  { title: 'Restons en contact', description: 'Nous revenons vers vous lorsqu’un poste correspond à votre profil.' },
]

function SectionTitle({ number, title }: { number: string; title: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="font-mono text-[10px] text-[#10518c]">{number}</span>
      <h3 className="text-[11px] font-semibold tracking-[0.11em] text-slate-600 uppercase">{title}</h3>
      <span className="h-px flex-1 bg-slate-100" />
    </div>
  )
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        reject(new Error('Lecture du fichier impossible.'))
        return
      }
      resolve(reader.result.split(',')[1])
    }
    reader.onerror = () => reject(new Error('Lecture du fichier impossible.'))
    reader.readAsDataURL(file)
  })
}

function formatFileSize(size: number) {
  return size >= 1024 * 1024
    ? `${(size / (1024 * 1024)).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} Mo`
    : `${Math.max(1, Math.round(size / 1024))} Ko`
}

function Recrutement() {
  const [application, setApplication] = useState<ApplicationInfo>(emptyApplication)
  const [cv, setCv] = useState<File | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [fileError, setFileError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null)
  const successTitle = useRef<HTMLHeadingElement>(null)
  const sending = useRef(false)
  const isLoading = status === 'loading'

  useEffect(() => {
    if (status === 'success') successTitle.current?.focus()
  }, [status])

  function selectCv(file: File) {
    if (isLoading) return
    setFileError('')
    setSubmitError('')
    if (!ALLOWED.includes(file.type)) {
      setCv(null)
      setFileError('Format non accepté. Choisissez un fichier PDF, DOC ou DOCX.')
      return
    }
    if (file.size > MAX_SIZE) {
      setCv(null)
      setFileError('Ce fichier dépasse 5 Mo. Veuillez choisir un CV plus léger.')
      return
    }
    setCv(file)
  }

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) selectCv(file)
    event.target.value = ''
  }

  function removeCv() {
    setCv(null)
    setFileError('')
    if (fileInput.current) fileInput.current.value = ''
  }

  function resetApplication() {
    setApplication({ ...emptyApplication })
    setCv(null)
    setFileError('')
    setSubmitError('')
    setStatus('idle')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sending.current || status === 'success') return
    if (!cv) {
      setFileError('Veuillez joindre votre CV pour envoyer votre candidature.')
      fileInput.current?.focus()
      return
    }

    sending.current = true
    setStatus('loading')
    setSubmitError('')
    setFileError('')
    const notification = toast.loading('Envoi de votre candidature…', {
      id: 'recruitment-submission',
      description: 'Votre CV est en cours de transmission.',
    })

    try {
      const cvBase64 = await fileToBase64(cv)
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          ...application,
          cvName: cv.name,
          cvType: cv.type,
          cvBase64,
        }),
      })
      if (!response.ok) throw new Error('Envoi non confirmé.')
      const data = await response.json()
      if (!data.success) throw new Error('Envoi non confirmé.')

      setStatus('success')
      toast.success('Candidature envoyée', {
        id: notification,
        description: 'Merci pour votre intérêt pour H&A Ingénieure.',
      })
    } catch {
      const message = 'Nous n’avons pas pu confirmer l’envoi. Vérifiez votre connexion puis réessayez.'
      setStatus('error')
      setSubmitError(message)
      toast.error('Envoi non confirmé', {
        id: notification,
        description: message,
        duration: 8000,
      })
    } finally {
      sending.current = false
    }
  }

  return (
    <section className="min-h-[calc(100svh-108px)] bg-[#f5f7fa] pt-6 pb-12 sm:pt-7 sm:pb-20" aria-labelledby="recruitment-title">
      <div className="mx-auto w-full max-w-[1336px] px-5 sm:px-8 lg:px-12">


        <div className="grid items-start gap-9 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-14">
          <div className="min-w-0">
            <p className="mb-5 flex items-center gap-3 text-[10px] font-semibold tracking-[0.16em] text-[#10518c] uppercase before:h-px before:w-7 before:bg-current">Carrières · Candidature spontanée</p>
            <h1 id="recruitment-title" className="text-[38px] leading-[1.12] font-semibold tracking-[-0.045em] text-[#15191f] sm:text-5xl xl:text-[54px]">
              Rejoignez<br /><span className="text-[#10518c]">notre équipe.</span>
            </h1>
            <p className="mt-6 max-w-xl text-[15px] leading-[1.9] text-slate-600">
              Ingénieurs, techniciens, spécialistes qualité ou stagiaires :
              envoyez-nous une candidature spontanée. Nous étudions chaque dossier
              et revenons vers vous lorsqu’un poste correspond à votre profil.
            </p>

            <figure className="relative mt-8 hidden overflow-hidden rounded-xl bg-[#0b1828] lg:block">
              <img src="/photoAccueil.jpeg" alt="Une équipe d’ingénieurs réunie autour des plans d’un chantier" width="960" height="640" className="aspect-[1.65] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081a2c]/95 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-sm font-semibold tracking-wide text-white">H&A Ingénieure</p>
                <p className="mt-1 text-xs text-blue-100">Génie civil & génie électrique</p>
              </figcaption>
            </figure>

            <div className="mt-8 hidden border-t border-slate-200 pt-7 lg:block">
              <h2 className="mb-6 text-[11px] font-semibold tracking-[0.12em] text-slate-500 uppercase">Votre candidature, simplement</h2>
              <ol className="space-y-6">
                {steps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#dce7f3] bg-white font-mono text-[10px] text-[#10518c]">0{index + 1}</span>
                    <div className="pt-0.5">
                      <h3 className="text-[13px] font-semibold text-slate-800">{step.title}</h3>
                      <p className="mt-1 text-xs leading-[1.8] text-slate-500">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_40px_rgba(16,40,70,0.04)]">
            {status === 'success' ? (
              <section aria-labelledby="application-success" className="px-6 py-12 text-center sm:px-10 sm:py-16">
                <span className="mx-auto mb-7 flex size-16 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 [--icon-size:32px]"><ServiceIcon name="check" /></span>
                <p className="mb-3 text-[10px] font-semibold tracking-[0.14em] text-[#10518c] uppercase">Merci de votre confiance</p>
                <h2 ref={successTitle} id="application-success" tabIndex={-1} className="text-3xl font-semibold tracking-tight text-slate-900 outline-none">Candidature envoyée.</h2>
                <p className="mx-auto mt-5 max-w-md text-sm leading-[1.9] text-slate-600">
                  Merci ! Votre candidature a bien été envoyée. Nous étudierons votre
                  dossier et reviendrons vers vous lorsqu’un poste correspondra à votre profil.
                </p>
                <div className="mt-8 flex flex-col items-center gap-4">
                  <Link to="/" className={primaryButtonClass}>Retour à l’accueil <ServiceIcon name="arrow-right" /></Link>
                  <button type="button" onClick={resetApplication} className="min-h-11 cursor-pointer rounded px-2 text-xs font-medium text-[#10518c] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#10518c]">Envoyer une autre candidature</button>
                </div>
              </section>
            ) : (
              <form onSubmit={handleSubmit} aria-labelledby="application-title" aria-busy={isLoading} className="p-5 sm:p-8 xl:p-9">
                <div className="mb-7 flex items-start gap-4 border-b border-slate-100 pb-6">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-[#edf4fc] text-[#10518c]"><ServiceIcon name="briefcase" /></span>
                  <div>
                    <h2 id="application-title" className="text-[23px] leading-tight font-semibold tracking-tight text-slate-900">Votre candidature</h2>
                    <p className="mt-2 text-xs leading-relaxed text-slate-500">Les champs marqués d’un <span className="font-semibold text-[#10518c]">*</span> sont obligatoires.</p>
                  </div>
                </div>

                <fieldset disabled={isLoading} className="min-w-0">
                  <legend className="sr-only">Informations de candidature</legend>
                  <div>
                    <label htmlFor="full-name" className={labelClass}>Nom et prénom <span className="text-[#10518c]">*</span></label>
                    <input id="full-name" name="Nom_complet" type="text" autoComplete="name" required placeholder="Votre nom et prénom" className={fieldClass} value={application.Nom_complet} onChange={(event) => setApplication({ ...application, Nom_complet: event.target.value })} />
                  </div>
                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <div className="min-w-0">
                      <label htmlFor="email" className={labelClass}>Email <span className="text-[#10518c]">*</span></label>
                      <input id="email" name="email" type="email" autoComplete="email" required placeholder="vous@exemple.com" className={fieldClass} value={application.email} onChange={(event) => setApplication({ ...application, email: event.target.value })} />
                    </div>
                    <div className="min-w-0">
                      <label htmlFor="phone" className={labelClass}>Téléphone <span className="ml-1 text-[10px] font-normal text-slate-400">(facultatif)</span></label>
                      <input id="phone" name="tel" type="tel" autoComplete="tel" placeholder="+212 6 00 00 00 00" className={fieldClass} value={application.tel} onChange={(event) => setApplication({ ...application, tel: event.target.value })} />
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="min-w-0">
                        <label htmlFor="domain" className={labelClass}>Domaine <span className="text-[#10518c]">*</span></label>
                        <select id="domain" name="Domaine" required className={fieldClass} value={application.Domaine} onChange={(event) => setApplication({ ...application, Domaine: event.target.value })}>
                          <option value="" disabled>Choisir un domaine</option>
                          <option value="G_civil">Génie civil</option>
                          <option value="G_electrique">Génie électrique</option>
                          <option value="Autre">Autre</option>
                        </select>
                      </div>
                      <div className="min-w-0">
                        <label htmlFor="search" className={labelClass}>Je recherche <span className="text-[#10518c]">*</span></label>
                        <select id="search" name="recherche" required className={fieldClass} value={application.recherche} onChange={(event) => setApplication({ ...application, recherche: event.target.value })}>
                          <option value="" disabled>Choisir une option</option>
                          <option value="Emploi">Un emploi</option>
                          <option value="Stage">Un stage</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-5">
                      <label htmlFor="presentation" className={labelClass}>Présentation <span className="ml-1 text-[10px] font-normal text-slate-400">(facultatif)</span></label>
                      <textarea id="presentation" name="presentation" rows={4} placeholder="Votre parcours, vos compétences et ce qui vous motive à nous rejoindre…" className={`${fieldClass} min-h-28 resize-y leading-relaxed`} value={application.presentation} onChange={(event) => setApplication({ ...application, presentation: event.target.value })} />
                    </div>
                  </div>

                  <div className="mt-8">
                    <SectionTitle number="" title="Votre CV" />
                    <div
                      className={`relative rounded-xl border transition-colors focus-within:ring-4 focus-within:ring-blue-100/70 motion-reduce:transition-none ${fileError ? 'border-red-300 bg-red-50/40' : isDragging ? 'border-[#10518c] bg-blue-50' : cv ? 'border-[#c7dced] bg-[#f2f7fc]' : 'border-dashed border-[#c8d7e7] bg-[#f8fafc] hover:border-[#10518c]'}`}
                      onDragOver={(event) => { event.preventDefault(); if (!isLoading) setIsDragging(true) }}
                      onDragLeave={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsDragging(false) }}
                      onDrop={(event) => {
                        event.preventDefault()
                        setIsDragging(false)
                        const file = event.dataTransfer.files[0]
                        if (file) selectCv(file)
                      }}
                    >
                      <input ref={fileInput} id="cv" name="cv" type="file" accept=".pdf,.doc,.docx" aria-label="Joindre votre CV (obligatoire)" aria-invalid={Boolean(fileError)} aria-describedby={fileError ? 'cv-help cv-error' : 'cv-help'} className="sr-only" onChange={handleFile} />
                      {cv ? (
                        <div className="flex items-center gap-3 p-4 sm:p-5">
                          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-white text-[#10518c]"><ServiceIcon name="document" /></span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-slate-800" title={cv.name}>{cv.name}</p>
                            <p className="mt-1 text-[11px] text-slate-500">{formatFileSize(cv.size)} · CV sélectionné</p>
                            <button type="button" onClick={() => fileInput.current?.click()} className="mt-1 min-h-8 cursor-pointer rounded text-xs font-medium text-[#10518c] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10518c]">Changer de fichier</button>
                          </div>
                          <button type="button" onClick={removeCv} aria-label="Retirer le CV sélectionné" className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-slate-500 hover:bg-white hover:text-red-600 focus-visible:outline-2 focus-visible:outline-[#10518c] [--icon-size:16px]"><ServiceIcon name="close" /></button>
                        </div>
                      ) : (
                        <label htmlFor="cv" className={`flex flex-col items-center px-4 py-7 text-center ${isLoading ? 'cursor-wait' : 'cursor-pointer'}`}>
                          <span className="mb-3 flex size-11 items-center justify-center rounded-full border border-[#dbe6f2] bg-white text-[#10518c]"><ServiceIcon name="upload" /></span>
                          <span className="text-[13px] font-semibold text-slate-700">{isDragging ? 'Déposez votre CV ici' : 'Glissez votre CV ici'} <span className="text-[#10518c]">*</span></span>
                          <span className="mt-1 text-xs leading-relaxed text-slate-500">ou <span className="font-medium text-[#10518c] underline decoration-blue-200 underline-offset-4">parcourez vos fichiers</span></span>
                        </label>
                      )}
                    </div>
                    <p id="cv-help" className="mt-2.5 text-[11px] leading-relaxed text-slate-500">PDF, DOC ou DOCX · 5 Mo maximum · Un seul fichier</p>
                    {fileError && <p id="cv-error" role="alert" className="mt-2 text-xs leading-relaxed text-red-700">{fileError}</p>}
                  </div>

                  {submitError && (
                    <div role="alert" className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-700">{submitError}</div>
                  )}

                  <button type="submit" disabled={isLoading} className={`${primaryButtonClass} mt-7 w-full [--icon-size:16px]`}>
                    {isLoading ? (
                      <><span aria-hidden="true" className="size-4 rounded-full border-2 border-white/40 border-t-white motion-safe:animate-spin" />Envoi en cours…</>
                    ) : (
                      <>Envoyer ma candidature <ServiceIcon name="send" /></>
                    )}
                  </button>
                </fieldset>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Recrutement
