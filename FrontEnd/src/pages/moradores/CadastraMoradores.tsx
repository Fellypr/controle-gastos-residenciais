import {CadastrarMoradores,TabelaMoradoresCadastrado} from "../../feature/moradores"
import "./CadastraMoradores.css"
export default function CadastraMoradores() {
  return (
    <div className="cadastro-de-moradores-main">
      <CadastrarMoradores/>
      <TabelaMoradoresCadastrado/>
    </div>
  );
}
