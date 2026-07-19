import {
  SummaryCards,
  MoradoresCadastradoTable,
  useHomeDashboard,
  EstadoVazioMoradores
} from "../../feature/home";
import Navbar from "../../components/navbar/Navbar";

export default function Home() {
  const { carregando, expenses, income, moradoresResumo } = useHomeDashboard();

  return (
    <section>
      <Navbar activePage="inicio" />
      {moradoresResumo.length > 0 ? (
        <>
          <SummaryCards income={income} expenses={expenses} />
          {!carregando && (
            <MoradoresCadastradoTable moradores={moradoresResumo} />
          )}
        </>
      ) : (
        <EstadoVazioMoradores/>
      )}
    </section>
  );
}
