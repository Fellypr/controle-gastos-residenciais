


export function useCard() {
  const formatCurrency = (
    value: number,
    locale: string,
    currency: string,
  ): string => {
    // Preferi centralizar a formatação aqui para o card só se preocupar em exibir, sem repetir regra de moeda no componente.
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(value);
  };

  return{
    formatCurrency,
  }
}
