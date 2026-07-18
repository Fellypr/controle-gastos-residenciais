import "./Navbar.css";

export default function Navbar({ activePage = "inicio" }) {
  const links = [
    { id: "inicio", label: "Início", href: "/" },
    { id: "moradores", label: "Moradores", href: "/moradores" },
    { id: "lancamentos", label: "Lançamentos", href: "/lancamentos" },
  ];

  return (
    <header className="navbar">
      <a href="/" className="navbar__logo" aria-label="CasaFin - Início">
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
      </a>

      <nav className="navbar__menu" aria-label="Menu principal">
        {links.map((link) => {
          const isActive = activePage === link.id;

          return (
            <a
              key={link.id}
              href={link.href}
              className={`navbar__link ${
                isActive ? "navbar__link--active" : ""
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {link.label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}