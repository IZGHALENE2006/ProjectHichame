// WhatsApp click to chat: https://faq.whatsapp.com/5913398998672934
export function createWhatsAppUrl(number: string, message: string): string | null {
  // Accept a readable international number, but never route to a placeholder.
  if (!/^[+\d\s().-]+$/.test(number)) return null
  const digits = number.replace(/\D/g, '').replace(/^00/, '')
  if (!/^[1-9]\d{6,14}$/.test(digits)) return null
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}
