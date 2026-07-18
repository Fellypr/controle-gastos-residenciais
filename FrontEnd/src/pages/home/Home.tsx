import { SummaryCards, MoradoresCadastradoTable } from "../../feature/home";
import Navbar from "../../components/navbar/Navbar";
const moradores = [
  {
    id: 1,
    nome: "Carlos",
    idade: 17,
    receitas: 0,
    despesas: 300,
  },
  {
    id: 2,
    nome: "Ana",
    idade: 25,
    receitas: 5200,
    despesas: 2100,
  },
];

export default function Home() {
  return (
    <section>
      <Navbar activePage="inicio" />
      <SummaryCards income={5200} expenses={2400} balance={2800} />
      <MoradoresCadastradoTable moradores={moradores} />
    </section>
  );
}
