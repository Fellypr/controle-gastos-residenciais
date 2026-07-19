import { useEffect, useState } from "react";
import "./AlertaSucesso.css";

interface AlertaSucessoProps {
  mensagem: string;
  onFechar?: () => void;
  titulo?: string;
}

function AlertaSucesso({
  mensagem,
  onFechar,
  titulo = "Cadastro realizado com sucesso",
}: AlertaSucessoProps) {
  const [estaSaindo, setEstaSaindo] = useState(false);

  useEffect(() => {
    setEstaSaindo(false);

    const iniciarSaida = window.setTimeout(() => {
      setEstaSaindo(true);
    }, 4500);

    const removerAlerta = window.setTimeout(() => {
      onFechar?.();
    }, 5000);

    return () => {
      window.clearTimeout(iniciarSaida);
      window.clearTimeout(removerAlerta);
    };
  }, [mensagem, onFechar]);

  return (
    <div
      className={`alerta-sucesso ${estaSaindo ? "alerta-sucesso--saindo" : ""}`}
      role="status"
      aria-live="polite"
    >
      <div className="alerta-sucesso__icone-area" aria-hidden="true">
        <svg
          className="alerta-sucesso__icone"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="m8.5 12 2.3 2.3 4.7-5.1" />
        </svg>
      </div>

      <div className="alerta-sucesso__conteudo">
        <span className="alerta-sucesso__selo">Sucesso</span>
        <strong className="alerta-sucesso__titulo">{titulo}</strong>
        <p className="alerta-sucesso__mensagem">{mensagem}</p>
      </div>
    </div>
  );
}

export default AlertaSucesso;
