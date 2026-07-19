import { apiGerenciadorDeGasto } from "../../Api";
import type {
  CadastrarMoradorDto,
  MensagemResponse,
  MoradorResponseDto,
} from "../types/Moradores";

const MORADOR_ENDPOINT = "/api/Morador";

export async function obterTodosOsMoradores() {
  return apiGerenciadorDeGasto<MoradorResponseDto[]>(MORADOR_ENDPOINT);
}

export async function cadastrarMorador(morador: CadastrarMoradorDto) {
  return apiGerenciadorDeGasto<MoradorResponseDto>(MORADOR_ENDPOINT, {
    method: "POST",
    body: JSON.stringify(morador),
  });
}

export async function deletarMorador(id: number) {
  return apiGerenciadorDeGasto<MensagemResponse>(`${MORADOR_ENDPOINT}/${id}`, {
    method: "DELETE",
  });
}
