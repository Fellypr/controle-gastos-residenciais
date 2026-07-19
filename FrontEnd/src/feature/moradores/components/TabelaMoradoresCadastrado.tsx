import { useState } from "react";
import ModalExcluirMorador from "./ModalExcluirMorador";
import type { TabelaMoradoresCadastradoProps } from "../types/Moradores";
import "./TabelaMoradoresCadastrado.css";

export function TabelaMoradoresCadastrado({
  moradores,
  carregando = false,
  onExcluir,
}: TabelaMoradoresCadastradoProps) {
  const [moradorSelecionado, setMoradorSelecionado] = useState<{
    id: number;
    nome: string;
  } | null>(null);

  function abrirModal(id: number, nome: string) {
    setMoradorSelecionado({ id, nome });
  }

  function fecharModal() {
    if (carregando) {
      return;
    }

    setMoradorSelecionado(null);
  }

  function confirmarExclusao() {
    if (!moradorSelecionado) {
      return;
    }

    onExcluir(moradorSelecionado.id);
    setMoradorSelecionado(null);
  }

  return (
    <>
      <section className="moradores-card">
        <h2 className="moradores-card__titulo">
          Moradores Cadastrados
        </h2>

        <div className="moradores-card__tabela-container">
          <table className="moradores-card__tabela">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Idade</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {carregando && moradores.length === 0 && (
                <tr>
                  <td colSpan={4}>Carregando moradores...</td>
                </tr>
              )}

              {!carregando && moradores.length === 0 && (
                <tr>
                  <td colSpan={4}>Nenhum morador cadastrado.</td>
                </tr>
              )}

              {moradores.map((morador) => (
                <tr key={morador.id}>
                  <td className="moradores-card__id">#{morador.id}</td>
                  <td className="moradores-card__nome">{morador.nome}</td>
                  <td>{morador.idade} anos</td>

                  <td className="moradores-card__acoes">
                    <button
                      type="button"
                      className="moradores-card__excluir"
                      aria-label={`Excluir ${morador.nome}`}
                      onClick={() => abrirModal(morador.id, morador.nome)}
                      disabled={carregando}
                    >
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {moradorSelecionado && (
        <ModalExcluirMorador
          nomeMorador={moradorSelecionado.nome}
          carregando={carregando}
          onCancelar={fecharModal}
          onConfirmar={confirmarExclusao}
        />
      )}
    </>
  );
}

function TrashIcon() {
  return (
    <svg
      className="moradores-card__icone"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M4 7h16" />
      <path d="M9 3h6l1 4H8l1-4Z" />
      <path d="M6.5 7 8 21h8l1.5-14" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}
