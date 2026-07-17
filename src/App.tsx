import "./App.css";
import Navbar from "./components/navbar/Navbar";
import SummaryCards from "./feature/home/components/card";
function App() {
  return (
    <div>
      <Navbar activePage="inicio" />
      <section>
        <SummaryCards income={5200} expenses={2400} balance={2800} />
      </section>
    </div>
  );
}

export default App;
