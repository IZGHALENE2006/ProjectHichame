import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import ServiceIcon from './ServiceIcon'
import './Navbar.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const header = useRef<HTMLElement>(null)
  const menuButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    const closeOutside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
    }
    const desktop = window.matchMedia('(min-width: 761px)')
    const closeOnDesktop = () => { if (desktop.matches) setMenuOpen(false) }
    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('keydown', closeOnEscape)
    desktop.addEventListener('change', closeOnDesktop)
    return () => {
      document.removeEventListener('pointerdown', closeOutside)
      document.removeEventListener('keydown', closeOnEscape)
      desktop.removeEventListener('change', closeOnDesktop)
    }
  }, [menuOpen])

  return (
    <header ref={header} className="site-header">
      <nav className="navbar" aria-label="Navigation principale">
        <Link className="navbar__brand" to="/" aria-label="H&A Ingénieure — Accueil" onClick={() => setMenuOpen(false)}>
          <img
            className="navbar__logo"
            src="/logo.jpeg"
            alt=""
            width="1080"
            height="823"
            fetchPriority="high"
          />
          <span className="navbar__identity">
            <span className="navbar__name"><span>H&A</span> Ingénieure</span>
            <span className="navbar__tagline">Bureau d’études techniques agréé</span>
          </span>
        </Link>

        <button
          ref={menuButton}
          type="button"
          className="navbar__menu-toggle"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
          aria-controls="navbar-links"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <ServiceIcon name={menuOpen ? 'close' : 'menu'} />
        </button>

        <ul id="navbar-links" className={`navbar__links${menuOpen ? ' navbar__links--open' : ''}`}>
          <li>
            <NavLink className="navbar__link" to="/" end onClick={() => setMenuOpen(false)}>
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink className="navbar__link" to="/services" onClick={() => setMenuOpen(false)}>
              Nos services
            </NavLink>
          </li>
          <li>
            <NavLink className="navbar__link" to="/recrutement" onClick={() => setMenuOpen(false)}>
              Recrutement
            </NavLink>
          </li>
          <li>
            <NavLink className="navbar__link" to="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
