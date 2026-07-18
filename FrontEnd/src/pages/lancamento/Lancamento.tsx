import Navbar from "../../components/navbar/Navbar";
import {
  FormularioLancamento,
  HistoricoTransacoes,
} from "../../feature/lancamento";
import "./Lancamento.css";
export default function Lancamento() {
  return (
    <>
      <Navbar activePage="lancamentos" />
      <div className="lancamento-main">
        <FormularioLancamento />
        <HistoricoTransacoes />
      </div>
    </>
  );
}
