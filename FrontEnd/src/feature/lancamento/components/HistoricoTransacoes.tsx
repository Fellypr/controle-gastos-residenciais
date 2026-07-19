import type { HistoricoTransacoesProps } from "../types/Transacoes";
import "./HistoricoTransacoes.css";

function IconeBusca() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M16 16L21 21" />
    </svg>
  );
}

function IconeLixeira() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7H20" />
      <path d="M9 7V5C9 4.4 9.4 4 10 4H14C14.6 4 15 4.4 15 5V7" />
      <path d="M6.5 7L7.2 19C7.3 19.6 7.7 20 8.3 20H15.7C16.3 20 16.7 19.6 16.8 19L17.5 7" />
      <path d="M10 11V16" />
      <path d="M14 11V16" />
    </svg>
  );
}

export function HistoricoTransacoes({
  carregando = false,
  onBuscaChange,
  onExcluir,
  termoBusca,
  transacoes,
}: HistoricoTransacoesProps) {
  return (
    <section className="historico-card">
      <h2>Histórico de Transações</h2>

      <div className="campo-busca">
        <span className="icone-busca">
          <IconeBusca />
        </span>

        <input
          type="search"
          placeholder="Buscar transação..."
          aria-label="Buscar transação"
          value={termoBusca}
          onChange={(event) => onBuscaChange(event.target.value)}
        />
      </div>

      <div className="tabela-container">
        <table className="historico-tabela">
          <thead>
            <tr>
              <th>Descrição</th>
              <th className="coluna-valor">Valor</th>
              <th>Tipo</th>
              <th>Quem pagou</th>
              <th className="coluna-acoes">Ações</th>
            </tr>
          </thead>

          <tbody>
            {carregando && transacoes.length === 0 && (
              <tr>
                <td colSpan={5}>Carregando transações...</td>
              </tr>
            )}

            {!carregando && transacoes.length === 0 && (
              <tr>
                <td colSpan={5}>Nenhuma transação encontrada.</td>
              </tr>
            )}

            {transacoes.map((transacao) => (
              <tr key={transacao.id}>
                <td className="descricao">{transacao.descricao}</td>
                <td className="valor">{formatarMoeda(transacao.valor)}</td>

                <td>
                  <span
                    className={`tag ${
                      transacao.tipo === "Receita"
                        ? "tag-receita"
                        : "tag-despesa"
                    }`}
                  >
                    {transacao.tipo}
                  </span>
                </td>

                <td className="morador">{transacao.nomePessoa}</td>

                <td className="coluna-acoes">
                  <button
                    className="botao-excluir"
                    type="button"
                    aria-label={`Excluir ${transacao.descricao}`}
                    onClick={() => onExcluir(transacao.id)}
                    disabled={carregando}
                  >
                    <IconeLixeira />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default HistoricoTransacoes;

function formatarMoeda(valor: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}
