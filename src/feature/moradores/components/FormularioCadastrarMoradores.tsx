
import "./FormularioCadastrarMoradores.css";

export function CadastrarMoradores() {

  return (
    <form className="cadastro-morador" >
      <h2 className="cadastro-morador__titulo">
        Cadastrar Novo Morador
      </h2>

      <div className="cadastro-morador__campo">
        <label htmlFor="nome">Nome Completo</label>

        <input
          id="nome"
          type="text"
          placeholder="Ex: Maria Silva"

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
        />
      </div>

      <button className="cadastro-morador__botao" type="submit">
        Cadastrar Morador
      </button>
    </form>
  );
}