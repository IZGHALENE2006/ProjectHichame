import './ServiceIcon.css'

// Google Material Symbols Outlined. Keep the local font subset in sync with this map.
const symbols = {
  'drafting': 'architecture',
  'building': 'apartment',
  'users': 'groups',
  'bolt': 'bolt',
  'network': 'account_tree',
  'layers': 'layers',
  'shield': 'verified_user',
  'check': 'check',
  'briefcase': 'work_outline',
  'upload': 'upload_file',
  'document': 'description',
  'close': 'close',
  'menu': 'menu',
  'send': 'send',
  'thermometer': 'device_thermostat',
  'sound': 'volume_up',
  'pause': 'pause',
  'play': 'play_arrow',
  'arrow-right': 'arrow_forward',
  'arrow-left': 'arrow_back',
  'arrow-up': 'arrow_upward',
  'arrow-down': 'arrow_downward',
  'mail': 'mail',
  'phone': 'call',
  'map-pin': 'location_on',
} as const

// Keep recognizable social logos, which are not part of Material Symbols.
const socialPaths = {
  linkedin: <><path d="M4 9v12M4 3v.01M10 21V9m0 5a5 5 0 0 1 10 0v7" strokeWidth="3" /></>,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none" /></>,
  facebook: <path d="M14 21v-8h3l.5-4H14V7c0-1 .3-1.5 1.7-1.5H18V2.2C17.4 2.1 16.2 2 14.9 2 11.9 2 10 3.8 10 7v2H7v4h3v8h4Z" fill="currentColor" stroke="none" />,
}

function ServiceIcon({ name }: { name: keyof typeof symbols | keyof typeof socialPaths | 'whatsapp' }) {
  if (name === 'whatsapp') {
    return <span className="service-icon service-icon--whatsapp" aria-hidden="true" />
  }

  if (name in socialPaths) {
    return (
      <svg className="service-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        {socialPaths[name as keyof typeof socialPaths]}
      </svg>
    )
  }

  return (
    <span className="service-icon material-symbols-outlined" aria-hidden="true">
      {symbols[name as keyof typeof symbols]}
    </span>
  )
}

export default ServiceIcon
