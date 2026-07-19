import AlertaSucesso from "../../../components/MensagemCard/AlertaSucesso";
import type { FormularioLancamentoProps } from "../types/Transacoes";
import "./FormularioLancamento.css";

export function FormularioLancamento({
  carregando = false,
  descricao,
  erro,
  mensagemSucesso,
  moradores,
  moradorId,
  onCadastrar,
  onDescricaoChange,
  onFecharMensagemSucesso,
  onTipoChange,
  onValorChange,
  tipo,
  valor,
  handleMoradorChange,
  alertaDeIdade,
}: FormularioLancamentoProps) {
  function handleValorInputChange(valorDigitado: string) {
    const valorNormalizado = valorDigitado.replace(",", ".");

    // Aceita ate 7 digitos antes do separador decimal e ate 2 casas decimais.
    if (!/^\d{0,7}([.]\d{0,2})?$/.test(valorNormalizado)) {
      return;
    }

    onValorChange(valorDigitado);
  }

  return (
    <form className="lancamento-card" onSubmit={onCadastrar}>
      <h2 className="lancamento-titulo">Novo Lançamento</h2>

      {mensagemSucesso && (
        <AlertaSucesso
          mensagem={mensagemSucesso}
          titulo="Lancamento registrado"
          onFechar={onFecharMensagemSucesso}
        />
      )}

      {erro && <p className="lancamento-erro">{erro}</p>}

      <div className="campo">
        <label htmlFor="descricao">Descrição</label>

        <input
          id="descricao"
          type="text"
          placeholder="Ex: Compras do mês"
          value={descricao}
          onChange={(event) => onDescricaoChange(event.target.value)}
          disabled={carregando}
        />
      </div>

      <div className="campo">
        <label htmlFor="valor">Valor</label>

        <input
          id="valor"
          type="text"
          inputMode="decimal"
          maxLength={10}
          placeholder="Ex: 150.00"
          value={valor}
          onChange={(event) => handleValorInputChange(event.target.value)}
          disabled={carregando}
        />
      </div>

      <div className="campo">
        <label className="campo-label" htmlFor="morador">
          Quem realizou
        </label>

        <div className="select-estatico">
          <select
            id="morador"
            value={moradorId}
            onChange={(event) => handleMoradorChange(event.target.value)}
            disabled={carregando}
          >
            <option value="">Selecione um morador</option>
            {moradores.map((morador) => (
              <option key={morador.id} value={morador.id} className="select-morador">
                {morador.nome} ({morador.idade} anos)
              </option>
            ))}
          </select>
          <span className="seta">⌄</span>
        </div>
      </div>

      <div className="campo">
        <span className="campo-label">Tipo</span>

        <div className="tipos">
          <button
            className={`tipo ${tipo === "Receita" ? "tipo-ativo" : ""}`}
            type="button"
            onClick={() => onTipoChange("Receita")}
            disabled={carregando || alertaDeIdade?.length > 0}
          >
            <span className={`radio ${tipo === "Receita" ? "radio-ativo" : ""}`} />

            <span>Receita</span>
          </button>

          <button
            className={`tipo ${tipo === "Despesa" ? "tipo-ativo" : ""}`}
            type="button"
            onClick={() => onTipoChange("Despesa")}
            disabled={carregando}
          >
            <span className={`radio ${tipo === "Despesa" ? "radio-ativo" : ""}`} />
            <span>Despesa</span>
          </button>
        </div>
      </div>
      <div className="alerta-idade">
        {alertaDeIdade}
      </div>
      <button className="botao-cadastrar" type="submit" disabled={carregando}>
        {carregando ? "Salvando..." : "Cadastrar"}
      </button>
    </form>
  );
}
