

export function useMoradoresCadastrados() {
  function formatarDinheiro(valor: number) {
    // Mantive essa função no hook para a lista já receber o valor no padrão da aplicação, sem espalhar esse detalhe pela UI.
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }
  return {
    formatarDinheiro,
  };
}
