import "./HistoricoTransacoes.css";

export function HistoricoTransacoes() {
  return (
    <section className="historico-card">
      <h2>Histórico de Transações</h2>

      <div className="tabela-container">
        <table className="historico-tabela">
          <thead>
            <tr>
              <th>Descrição</th>
              <th className="coluna-valor">Valor</th>
              <th>Tipo</th>
              <th>Quem pagou</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="descricao">Salário mensal</td>
              <td className="valor">R$ 5.200,00</td>
              <td>
                <span className="tag tag-receita">Receita</span>
              </td>
              <td className="morador">Ana Souza</td>
            </tr>

            <tr>
              <td className="descricao">Supermercado</td>
              <td className="valor">R$ 300,00</td>
              <td>
                <span className="tag tag-despesa">Despesa</span>
              </td>
              <td className="morador">Carlos Lima</td>
            </tr>

            <tr>
              <td className="descricao">Aluguel da casa</td>
              <td className="valor">R$ 2.100,00</td>
              <td>
                <span className="tag tag-despesa">Despesa</span>
              </td>
              <td className="morador">Ana Souza</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
