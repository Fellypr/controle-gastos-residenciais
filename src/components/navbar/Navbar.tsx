import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const links = [
    { id: "inicio", label: "Início", href: "/" },
    { id: "moradores", label: "Moradores", href: "/cadastro-de-moradores" },
    { id: "lancamentos", label: "Lançamentos", href: "/lancamentos" },
  ];

  return (
    <header className="navbar">
      <Link to="/" className="navbar__logo" aria-label="CasaFin - Início">
        <span className="navbar__logo-icon">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="navbar__home-icon"
          >
            <path d="M4 10.5 12 4l8 6.5" />
            <path d="M6.5 9.5V20h11V9.5" />
            <path d="M9.5 20v-6h5v6" />
          </svg>
        </span>

        <span className="navbar__brand">CasaFin</span>
      </Link>

      <nav className="navbar__menu" aria-label="Menu principal">
        {links.map((link) => (
          <NavLink
            key={link.id}
            to={link.href}
            className={({ isActive }) =>
              `navbar__link ${isActive ? "navbar__link--active" : ""}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
