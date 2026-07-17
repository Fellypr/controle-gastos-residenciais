import "./TabelaMoradoresCadastrado.css";

export function TabelaMoradoresCadastrado() {
  return (
    <section className="moradores-card">
      <h2 className="moradores-card__titulo">
        Moradores Cadastrados
      </h2>

      <div className="moradores-card__tabela-container">
        <table className="moradores-card__tabela">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Idade</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="moradores-card__id">#9b3f</td>
              <td className="moradores-card__nome">Ana Souza</td>
              <td>25 anos</td>

              <td className="moradores-card__acoes">
                <button
                  type="button"
                  className="moradores-card__excluir"
                  aria-label="Excluir Ana Souza"
                >
                  <TrashIcon />
                </button>
              </td>
            </tr>

            <tr>
              <td className="moradores-card__id">#1a2c</td>
              <td className="moradores-card__nome">Carlos Lima</td>
              <td>17 anos</td>

              <td className="moradores-card__acoes">
                <button
                  type="button"
                  className="moradores-card__excluir"
                  aria-label="Excluir Carlos Lima"
                >
                  <TrashIcon />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

function TrashIcon() {
  return (
    <svg
      className="moradores-card__icone"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M4 7h16" />
      <path d="M9 3h6l1 4H8l1-4Z" />
      <path d="M6.5 7 8 21h8l1.5-14" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}