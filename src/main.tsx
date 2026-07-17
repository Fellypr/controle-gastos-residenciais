import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./pages/home/Home.tsx";
import CadastraMoradores from "./pages/moradores/CadastraMoradores.tsx";
import Lancamento from "./pages/lancamento/Lancamento.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="cadastro-de-moradores" element={<CadastraMoradores />} />
          <Route path="lancamentos" element={<Lancamento />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);