// Remplacer ces exemples par les coordonnées du bureau, puis passer
// isPlaceholder à false pour activer les liens email et téléphone.
// Les icônes sociales deviennent des liens dès qu’une URL est renseignée.
export const siteContact = {
  isPlaceholder: true,
  // Numéro WhatsApp du formulaire Contact, avec indicatif international.
  // Exemple de format : 212 suivi des 9 chiffres, sans le 0 national.
  // Laisser vide jusqu’à l’ajout du vrai numéro.
  whatsappNumber: '',
  email: 'contact@example.com',
  phones: [
    { label: 'Fixe', number: '+212 5 XX XX XX XX' },
    { label: 'Mobile', number: '+212 6 XX XX XX XX' },
  ],
  address: 'Adresse du bureau\nVille, Maroc',
  openingHours: 'Lun–Ven : 08h30–18h00\nSam : 08h00–13h00',
  socials: {
    linkedin: '',
    whatsapp: '',
    instagram: '',
    facebook: '',
  },
}
