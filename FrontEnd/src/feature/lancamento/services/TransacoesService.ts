import { apiGerenciadorDeGasto } from "../../Api";
import type {
  CriarTransacaoDto,
  FiltroTransacaoParams,
  MensagemTransacaoResponse,
  TransacaoResponseDto,
} from "../types/Transacoes";

const TRANSACAO_ENDPOINT = "/api/Transacao";

// Busca todas as transacoes, podendo filtrar por tipo quando informado.
export async function obterTodasAsTransacoes(
  filtros?: FiltroTransacaoParams,
) {
  const query = filtros?.tipo
    ? `?tipo=${encodeURIComponent(filtros.tipo)}`
    : "";

  return apiGerenciadorDeGasto<TransacaoResponseDto[]>(
    `${TRANSACAO_ENDPOINT}${query}`,
  );
}

// Envia um novo lancamento para a API.
export async function criarTransacao(transacao: CriarTransacaoDto) {
  return apiGerenciadorDeGasto<TransacaoResponseDto>(TRANSACAO_ENDPOINT, {
    method: "POST",
    body: JSON.stringify(transacao),
  });
}

// Remove uma transacao especifica pelo id.
export async function deletarTransacao(id: number) {
  return apiGerenciadorDeGasto<MensagemTransacaoResponse>(
    `${TRANSACAO_ENDPOINT}/${id}`,
    {
      method: "DELETE",
    },
  );
}
