export type TipoTransacao = "Receita" | "Despesa";

export interface CriarTransacaoDto {
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
  moradorId: number;
}

export interface TransacaoResponseDto {
  id: number;
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
  moradorId: number;
  nomePessoa: string;
}

export interface MensagemTransacaoResponse {
  mensagem: string;
}

export interface FiltroTransacaoParams {
  tipo?: TipoTransacao | null;
}

export interface FormularioLancamentoProps {
  carregando?: boolean;
  descricao: string;
  erro?: string | null;
  mensagemSucesso?: string | null;
  moradores: Array<{
    id: number;
    nome: string;
    idade: number;
  }>;
  moradorId: string;
  onCadastrar: (event: React.FormEvent<HTMLFormElement>) => void;
  onDescricaoChange: (descricao: string) => void;
  onFecharMensagemSucesso?: () => void;
  onMoradorChange: (moradorId: string) => void;
  onTipoChange: (tipo: TipoTransacao) => void;
  onValorChange: (valor: string) => void;
  tipo: TipoTransacao;
  valor: string;
}

export interface HistoricoTransacoesProps {
  carregando?: boolean;
  onBuscaChange: (termo: string) => void;
  onExcluir: (id: number) => void;
  termoBusca: string;
  transacoes: TransacaoResponseDto[];
}
