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
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [alertaDeIdade, setAlertaDeIdade] = useState<string>("");

  // Pego os dados iniciais quando o hook é montado.
  // Basicamente faço duas chamadas ao backend em paralelo e guardo o resultado no estado.
  async function carregarDados() {
    try {
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
    const timer = setTimeout(() => {
      carregarDados();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  function limparMensagem() {
    setMensagem(null);
  }

  // Reseto o formulário depois que a transação é salva.
  // Isso evita que o usuário tenha que limpar tudo manualmente.
  function limparFormulario() {
    setDescricao("");
    setValor("");
    setTipo("Receita");
    setMoradorId("");
    setAlertaDeIdade("");
  }

  // Quando o usuário escolhe alguém, eu vejo se essa pessoa é menor de idade.
  // Se for, já ajusto o tipo da transação pra despesa e aviso no formulário.
  function handleMoradorChange(id: string) {
    setMoradorId(id);
    const morador = moradores.find((item) => item.id === Number(id));
    if (morador && morador.idade < 18) {
      setTipo("Despesa");
      setAlertaDeIdade(
        `⚠️ ${morador.nome} é menor de idade. Por regras do sistema, apenas despesas podem ser cadastradas para ele.`,
      );
    } else {
      setAlertaDeIdade("");
    }
  }

  function converterValorParaNumero(valorDigitado: string) {
    return Number(valorDigitado.replace(",", "."));
  }

  // Aqui eu valido o que o usuário mandou e mando pra API se tudo estiver certo.
  // Se faltar alguma coisa, eu só mostro a mensagem de erro e paro por ali.
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
      setMensagem("Transação cadastrado com sucesso.");
    } catch (error) {
      setErro(
        error instanceof Error ? error.message : "Erro ao cadastrar transacao.",
      );
      console.log("erro aqui", error);
    } finally {
      setCarregando(false);
    }
  }

  // Quando apaga uma transação, eu chamo o endpoint e removo ela da lista local.
  // Assim a tela reflete a mudança sem precisar recarregar a página.
  async function handleExcluirTransacao(id: number) {
    try {
      setCarregando(true);
      setErro(null);
      setMensagem(null);

      await deletarTransacao(id);

      setTransacoes((estadoAtual) =>
        estadoAtual.filter((transacao) => transacao.id !== id),
      );
    } catch (error) {
      setErro(
        error instanceof Error ? error.message : "Erro ao excluir transacao.",
      );
    } finally {
      setCarregando(false);
    }
  }

  // Essa função é só um gatilho do formulário.
  // Eu impeço o reload da página e passo os dados para o cadastro real.
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
    handleMoradorChange,
    alertaDeIdade,
  };
}
