const BASE_URL = "http://localhost:5116"

export async function apiGerenciadorDeGasto<T>(endpoint: string, options?: RequestInit) : Promise<T>{
     const response = await fetch(`${BASE_URL}${endpoint}`,{
        ...options,
        headers:{
            'Content-Type': 'application/json',
            ...options?.headers,
        },
    })
    if(!response.ok){
        const erroData = await response.json().catch(() => {})
        throw new Error (erroData.mensagem || erroData.message || 'Erro ao busca os dados da api')
    }

    return response.json() as Promise<T>;
}
