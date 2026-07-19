import { useEffect, useState } from "react";
import { obterTodasAsTransacoes } from "../../lancamento/services/TransacoesService";
import { obterTodosOsMoradores } from "../../moradores/services/MoradoresService";
import type { MoradorResponseDto } from "../../moradores/types/Moradores";
import type { TransacaoResponseDto } from "../../lancamento/types/Transacoes";

interface ResumoMorador {
  id: number;
  nome: string;
  idade: number;
  receitas: number;
  despesas: number;
}

export function useHomeDashboard() {
  const [moradores, setMoradores] = useState<MoradorResponseDto[]>([]);
  const [transacoes, setTransacoes] = useState<TransacaoResponseDto[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarDashboard() {
      try {
        setCarregando(true);
        setErro(null);

        const [listaMoradores, listaTransacoes] = await Promise.all([
          obterTodosOsMoradores(),
          obterTodasAsTransacoes(),
        ]);

        setMoradores(listaMoradores);
        setTransacoes(listaTransacoes);
      } catch (error) {
        setErro(
          error instanceof Error
            ? error.message
            : "Erro ao carregar dados da home.",
        );
      } finally {
        setCarregando(false);
      }
    }

    void carregarDashboard();
  }, []);

  const income = transacoes.reduce((total, transacao) => {
    return transacao.tipo === "Receita" ? total + transacao.valor : total;
  }, 0);

  const expenses = transacoes.reduce((total, transacao) => {
    return transacao.tipo === "Despesa" ? total + transacao.valor : total;
  }, 0);

  const moradoresResumo: ResumoMorador[] = moradores
    .map((morador) => {
      const receitas = transacoes.reduce((total, transacao) => {
        return transacao.moradorId === morador.id && transacao.tipo === "Receita"
          ? total + transacao.valor
          : total;
      }, 0);

      const despesas = transacoes.reduce((total, transacao) => {
        return transacao.moradorId === morador.id && transacao.tipo === "Despesa"
          ? total + transacao.valor
          : total;
      }, 0);

      return {
        id: morador.id,
        nome: morador.nome,
        idade: morador.idade,
        receitas,
        despesas,
      };
    })
    .sort((moradorA, moradorB) => moradorA.nome.localeCompare(moradorB.nome));

  return {
    carregando,
    erro,
    expenses,
    income,
    moradoresResumo,
  };
}
