"use client";
import { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const THEME_STORAGE_KEY = "casafin:tema-escuro";

export default function Navbar({ activePage = "inicio" }) {
  const links = [
    { id: "inicio", label: "Início", href: "/" },
    { id: "moradores", label: "Moradores", href: "/cadastro-de-moradores" },
    { id: "lancamentos", label: "Lançamentos", href: "/lancamentos" },
  ];
  const [temaEscuro, setTemaEscuro] = useState<boolean>(() => {
    const temaSalvo = window.localStorage.getItem(THEME_STORAGE_KEY);

    if (temaSalvo !== null) {
      return temaSalvo === "true";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("tema-escuro", temaEscuro);
    window.localStorage.setItem(THEME_STORAGE_KEY, String(temaEscuro));
  }, [temaEscuro]);

  function alterarTema(escuro: boolean) {
    setTemaEscuro(escuro);
  }

  return (
    <header className="navbar">
      <Link to={"/"} className="navbar__logo" aria-label="CasaFin - Início">
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
        {links.map((link) => {
          const isActive = activePage === link.id;

          return (
            <Link
              key={link.id}
              to={link.href}
              className={`navbar__link ${
                isActive ? "navbar__link--active" : ""
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="seletor-tema" aria-label="Selecionar tema">
        <button
          className={`tema-botao ${!temaEscuro ? "tema-ativo" : ""}`}
          type="button"
          aria-label="Usar tema claro"
          aria-pressed={!temaEscuro}
          onClick={() => alterarTema(false)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="3.5" />

            <path d="M12 2.5V5" />
            <path d="M12 19V21.5" />
            <path d="M2.5 12H5" />
            <path d="M19 12H21.5" />
            <path d="M5.3 5.3L7.1 7.1" />
            <path d="M16.9 16.9L18.7 18.7" />
            <path d="M18.7 5.3L16.9 7.1" />
            <path d="M7.1 16.9L5.3 18.7" />
          </svg>
          <span className="tema-botao__label">Claro</span>
        </button>

        <button
          className={`tema-botao ${temaEscuro ? "tema-ativo" : ""}`}
          type="button"
          aria-label="Usar tema escuro"
          aria-pressed={temaEscuro}
          onClick={() => alterarTema(true)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 15.2A8 8 0 0 1 8.8 4A8 8 0 1 0 20 15.2Z" />
          </svg>
          <span className="tema-botao__label">Escuro</span>
        </button>
      </div>
    </header>
  );
}
