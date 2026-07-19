import Navbar from "../../components/navbar/Navbar";
import {
  FormularioLancamento,
  HistoricoTransacoes,
  useLancamentos,
} from "../../feature/lancamento";
import "./Lancamento.css";
export default function Lancamento() {
  const {
    cadastrarPeloFormulario,
    carregando,
    descricao,
    erro,
    handleExcluirTransacao,
    limparMensagem,
    mensagem,
    moradores,
    moradorId,
    setDescricao,
    setTermoBusca,
    setTipo,
    setValor,
    termoBusca,
    tipo,
    transacoes,
    valor,
    handleMoradorChange,
    alertaDeIdade,
  } = useLancamentos();

  return (
    <>
      <Navbar activePage="lancamentos" />
      <div className="lancamento-main">
        <FormularioLancamento
          descricao={descricao}
          valor={valor}
          tipo={tipo}
          moradores={moradores}
          moradorId={moradorId}
          carregando={carregando}
          mensagemSucesso={mensagem}
          alertaDeIdade={alertaDeIdade}
          erro={erro}
          onCadastrar={cadastrarPeloFormulario}
          onDescricaoChange={setDescricao}
          onValorChange={setValor}
          onTipoChange={setTipo}
          onFecharMensagemSucesso={limparMensagem}
          handleMoradorChange={handleMoradorChange}
        />
        <HistoricoTransacoes
          transacoes={transacoes}
          termoBusca={termoBusca}
          carregando={carregando}
          onBuscaChange={setTermoBusca}
          onExcluir={handleExcluirTransacao}
        />
      </div>
    </>
  );
}
