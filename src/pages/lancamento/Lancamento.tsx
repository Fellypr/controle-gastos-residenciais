import { FormularioLancamento,HistoricoTransacoes } from "../../feature/lancamento";
import "./Lancamento.css"
export default function Lancamento(){
    return(
        <div className="lancamento-main">
            <FormularioLancamento/>
            <HistoricoTransacoes/>
        </div>
    );
}