


export function useCard() {
  const formatCurrency = (
    value: number,
    locale: string,
    currency: string,
  ): string => {
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
