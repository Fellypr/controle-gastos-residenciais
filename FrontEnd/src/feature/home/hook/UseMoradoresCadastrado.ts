

export function useMoradoresCadastrados() {
  function formatarDinheiro(valor: number) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }
  return {
    formatarDinheiro,
  };
}
