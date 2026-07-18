import "./FormularioLancamento.css";

export function FormularioLancamento() {
  return (
    <section className="lancamento-card">
      <h2 className="lancamento-titulo">Novo Lançamento</h2>

      <div className="campo">
        <label htmlFor="descricao">Descrição</label>

        <input
          id="descricao"
          type="text"
          placeholder="Ex: Compras do mês"
          readOnly
        />
      </div>

      <div className="campo">
        <label htmlFor="valor">Valor</label>

        <input id="valor" type="text" placeholder="Ex: R$ 150,00" readOnly />
      </div>

      <div className="campo">
        <span className="campo-label">Quem realizou</span>

        <div className="select-estatico">
          <span>Ana Souza (25 anos)</span>
          <span className="seta">⌄</span>
        </div>
      </div>

      <div className="campo">
        <span className="campo-label">Tipo</span>

        <div className="tipos">
          <div className="tipo tipo-ativo">
            <span className="radio radio-ativo" />
            <span>Receita</span>
          </div>

          <div className="tipo">
            <span className="radio" />
            <span>Despesa</span>
          </div>
        </div>
      </div>
      <button className="botao-cadastrar" type="button">
        Cadastrar
      </button>
    </section>
  );
}
