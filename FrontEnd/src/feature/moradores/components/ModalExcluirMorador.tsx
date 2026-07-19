import "./ModalExcluirMorador.css";

interface ModalExcluirMoradorProps {
  carregando?: boolean;
  nomeMorador: string;
  onCancelar: () => void;
  onConfirmar: () => void;
}

function ModalExcluirMorador({
  carregando = false,
  nomeMorador,
  onCancelar,
  onConfirmar,
}: ModalExcluirMoradorProps) {
  return (
    <div className="modal-fundo" onClick={onCancelar}>
      <section
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="modal-titulo">Excluir Morador?</h2>

        <p className="modal-mensagem">
          Atenção: Ao excluir {nomeMorador}, todas as transações financeiras
          vinculadas a essa pessoa também serão apagadas permanentemente. Esta
          ação não pode ser desfeita.
        </p>

        <div className="modal-acoes">
          <button
            className="botao-cancelar"
            type="button"
            onClick={onCancelar}
            disabled={carregando}
          >
            Cancelar
          </button>

          <button
            className="botao-excluir"
            type="button"
            onClick={onConfirmar}
            disabled={carregando}
          >
            Sim, Excluir tudo
          </button>
        </div>
      </section>
    </div>
  );
}

export default ModalExcluirMorador;
