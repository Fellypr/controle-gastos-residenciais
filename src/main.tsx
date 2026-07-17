import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./pages/home/Home.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element = {<App />}>
            <Route path="/" element={<Home/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
