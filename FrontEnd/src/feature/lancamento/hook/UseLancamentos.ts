import { useEffect, useState } from "react";
import AlertaSucesso from "../../../components/MensagemCard/AlertaSucesso";
import { obterTodosOsMoradores } from "../../moradores/services/MoradoresService";
import type { MoradorResponseDto } from "../../moradores/types/Moradores";
import {
  criarTransacao,
  deletarTransacao,
  obterTodasAsTransacoes,
} from "../services/TransacoesService";
import type {
  CriarTransacaoDto,
  TipoTransacao,
  TransacaoResponseDto,
} from "../types/Transacoes";

export function useLancamentos() {
  const [transacoes, setTransacoes] = useState<TransacaoResponseDto[]>([]);
  const [moradores, setMoradores] = useState<MoradorResponseDto[]>([]);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState<TipoTransacao>("Receita");
  const [moradorId, setMoradorId] = useState("");
  const [termoBusca, setTermoBusca] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  async function carregarDados() {
    try {
      setCarregando(true);
      setErro(null);

      const [listaTransacoes, listaMoradores] = await Promise.all([
        obterTodasAsTransacoes(),
        obterTodosOsMoradores(),
      ]);

      setTransacoes(listaTransacoes);
      setMoradores(listaMoradores);
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Erro ao carregar lancamentos.",
      );
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  function limparMensagem() {
    setMensagem(null);
  }

  function limparFormulario() {
    setDescricao("");
    setValor("");
    setTipo("Receita");
    setMoradorId("");
  }

  function converterValorParaNumero(valorDigitado: string) {
    return Number(valorDigitado.replace(",", "."));
  }

  async function handleCadastrarTransacao(dto: CriarTransacaoDto) {
    if (!dto.descricao.trim()) {
      setErro("Informe a descricao do lancamento.");
      return;
    }

    if (!dto.moradorId) {
      setErro("Selecione quem realizou a transacao.");
      return;
    }

    if (!dto.valor || Number.isNaN(dto.valor) || dto.valor <= 0) {
      setErro("Informe um valor valido para a transacao.");
      return;
    }

    try {
      setCarregando(true);
      setErro(null);
      setMensagem(null);

      const novaTransacao = await criarTransacao(dto);

      setTransacoes((estadoAtual) => [novaTransacao, ...estadoAtual]);
      limparFormulario();
      setMensagem("Lancamento cadastrado com sucesso.");
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Erro ao cadastrar transacao.",
      );
      console.log("erro aqui",error)
    } finally {
      setCarregando(false);
    }
  }

  async function handleExcluirTransacao(id: number) {
    try {
      setCarregando(true);
      setErro(null);
      setMensagem(null);

      await deletarTransacao(id);

      setTransacoes((estadoAtual) =>
        estadoAtual.filter((transacao) => transacao.id !== id),
      );
      setMensagem("Lancamento excluido com sucesso.");
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Erro ao excluir transacao.",
      );
    } finally {
      setCarregando(false);
    }
  }

  function cadastrarPeloFormulario(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    void handleCadastrarTransacao({
      descricao: descricao.trim(),
      valor: converterValorParaNumero(valor),
      tipo,
      moradorId: Number(moradorId),
    });
  }

  const transacoesFiltradas = transacoes.filter((transacao) => {
    const termoNormalizado = termoBusca.trim().toLowerCase();

    if (!termoNormalizado) {
      return true;
    }

    return (
      transacao.descricao.toLowerCase().includes(termoNormalizado) ||
      transacao.nomePessoa.toLowerCase().includes(termoNormalizado) ||
      transacao.tipo.toLowerCase().includes(termoNormalizado)
    );
  });

  return {
    AlertaSucesso,
    carregando,
    descricao,
    erro,
    mensagem,
    moradores,
    moradorId,
    setDescricao,
    setMoradorId,
    setTermoBusca,
    setTipo,
    setValor,
    termoBusca,
    tipo,
    transacoes: transacoesFiltradas,
    valor,
    cadastrarPeloFormulario,
    handleExcluirTransacao,
    limparMensagem,
  };
}
