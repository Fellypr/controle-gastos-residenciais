import { apiGerenciadorDeGasto } from "../../Api";
import type {
  CadastrarMoradorDto,
  MensagemResponse,
  MoradorResponseDto,
} from "../types/Moradores";

const MORADOR_ENDPOINT = "/api/Morador";

// Pega todos os moradores já cadastrados na API.
export async function obterTodosOsMoradores() {
  return apiGerenciadorDeGasto<MoradorResponseDto[]>(MORADOR_ENDPOINT);
}

// Envia os dados do novo morador pra API criar o cadastro.
export async function cadastrarMorador(morador: CadastrarMoradorDto) {
  return apiGerenciadorDeGasto<MoradorResponseDto>(MORADOR_ENDPOINT, {
    method: "POST",
    body: JSON.stringify(morador),
  });
}

// Remove um morador específico pelo ID.
export async function deletarMorador(id: number) {
  return apiGerenciadorDeGasto<MensagemResponse>(`${MORADOR_ENDPOINT}/${id}`, {
    method: "DELETE",
  });
}
