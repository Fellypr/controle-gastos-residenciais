const BASE_URL = "http://localhost:5116";

type ErroValidacaoApi = {
  mensagem?: string;
  message?: string;
  title?: string;
  errors?: Record<string, string[]>;
};

function extrairMensagemDeErro(erroData?: ErroValidacaoApi) {
  if (!erroData) {
    return "Erro ao buscar os dados da API.";
  }

  if (erroData.mensagem) {
    return erroData.mensagem;
  }

  if (erroData.message) {
    return erroData.message;
  }

  if (erroData.errors) {
    const mensagens = Object.values(erroData.errors).flat().filter(Boolean);

    if (mensagens.length > 0) {
      return mensagens.join(" ");
    }
  }

  if (erroData.title) {
    return erroData.title;
  }

  return "Erro ao buscar os dados da API.";
}

export async function apiGerenciadorDeGasto<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const erroData = (await response.json().catch(() => undefined)) as
      | ErroValidacaoApi
      | undefined;

    throw new Error(extrairMensagemDeErro(erroData));
  }

  return response.json() as Promise<T>;
}
