import "./EstadoVazioMoradores.css";
import { Link } from "react-router-dom";
export function EstadoVazioMoradores() {
  return (
    <section className="estado-vazio">
      <div className="estado-vazio-icone">
        <svg viewBox="0 0 80 80" aria-hidden="true">
          <rect width="80" height="80" rx="28" className="icone-fundo" />

          <circle cx="30" cy="28" r="9" className="usuario-principal" />

          <path
            d="M14 53C14 43.6 20.7 38 30 38C39.3 38 46 43.6 46 53V58H14V53Z"
            className="usuario-principal"
          />

          <circle cx="54" cy="31" r="7" className="usuario-secundario" />

          <path
            d="M43 52C43 44.8 47.7 41 54 41C60.3 41 65 44.8 65 52V57H43V52Z"
            className="usuario-secundario"
          />
        </svg>
      </div>

      <h2>Nenhum morador cadastrado</h2>

      <p>
        Para começar a gerenciar os gastos da casa, você precisa cadastrar os
        moradores primeiro.
      </p>

      <Link className="botao-cadastrar-morador" to={"cadastro-de-moradores"}>
        + Cadastrar Primeiro Morador
      </Link>
    </section>
  );
}
