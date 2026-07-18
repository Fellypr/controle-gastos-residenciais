import Navbar from "../../components/navbar/Navbar";
import {CadastrarMoradores,TabelaMoradoresCadastrado} from "../../feature/moradores"
import "./CadastraMoradores.css"
export default function CadastraMoradores() {
  return (
    <>
    <Navbar activePage="moradores"/>
    <div className="cadastro-de-moradores-main">
      <CadastrarMoradores/>
      <TabelaMoradoresCadastrado/>
    </div>
    </>
  );
}
