import type { CadastrarMoradorProps } from "../types/Moradores";
import AlertaSucesso from "../../../components/MensagemCard/AlertaSucesso";
import "./FormularioCadastrarMoradores.css";

export function CadastrarMoradores({
  nome,
  idade,
  erro,
  mensagemSucesso,
  onFecharMensagemSucesso,
  carregando = false,
  onCadastrar,
  onNomeChange,
  onIdadeChange,
}: CadastrarMoradorProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onCadastrar({
      nome: nome.trim(),
      idade: Number(idade),
    });
  }

  return (
    <form className="cadastro-morador" onSubmit={handleSubmit}>
      <h2 className="cadastro-morador__titulo">
        Cadastrar Novo Morador
      </h2>

      {mensagemSucesso && (
        <AlertaSucesso
          mensagem={mensagemSucesso}
          onFechar={onFecharMensagemSucesso}
        />
      )}

      {erro && <p className="cadastro-morador__erro">{erro}</p>}

      <div className="cadastro-morador__campo">
        <label htmlFor="nome">Nome Completo</label>

        <input
          id="nome"
          type="text"
          placeholder="Ex: Maria Silva"
          value={nome}
          onChange={(event) => onNomeChange(event.target.value)}
          disabled={carregando}
        />
      </div>

      <div className="cadastro-morador__campo cadastro-morador__campo--idade">
        <label htmlFor="idade">Idade</label>

        <input
          id="idade"
          type="number"
          min="0"
          max="120"
          placeholder="Ex: 25"
          value={idade}
          onChange={(event) => onIdadeChange(event.target.value)}
          disabled={carregando}
        />
      </div>

      <button className="cadastro-morador__botao" type="submit">
        {carregando ? "Salvando..." : "Cadastrar Morador"}
      </button>
    </form>
  );
}
