import Navbar from "../../components/navbar/Navbar";
import {CadastrarMoradores,TabelaMoradoresCadastrado} from "../../feature/moradores"
import { useMoradores } from "../../feature/moradores/hook/UseMoradores";
import "./CadastraMoradores.css"
export default function CadastraMoradores() {
  const {
    moradores,
    nome,
    idade,
    carregando,
    mensagem,
    setNome,
    setIdade,
    handleCadastrar,
    handleExcluir,
    limparMensagem,
  } = useMoradores();

  return (
    <>
    <Navbar activePage="moradores"/>
    <div className="cadastro-de-moradores-main">
      <CadastrarMoradores
        nome={nome}
        idade={idade}
        mensagemSucesso={mensagem}
        onFecharMensagemSucesso={limparMensagem}
        carregando={carregando}
        onCadastrar={handleCadastrar}
        onNomeChange={setNome}
        onIdadeChange={setIdade}
      />
      <TabelaMoradoresCadastrado
        moradores={moradores}
        carregando={carregando}
        onExcluir={handleExcluir}
      />
    </div>
    </>
  );
}
