import {
  SummaryCards,
  MoradoresCadastradoTable,
  useHomeDashboard,
} from "../../feature/home";
import Navbar from "../../components/navbar/Navbar";

export default function Home() {
  const {
    carregando,
    erro,
    expenses,
    income,
    moradoresResumo,
  } = useHomeDashboard();

  return (
    <section>
      <Navbar activePage="inicio" />
      {erro && <p>{erro}</p>}
      <SummaryCards income={income} expenses={expenses} />
      {!carregando && <MoradoresCadastradoTable moradores={moradoresResumo} />}
    </section>
  );
}
