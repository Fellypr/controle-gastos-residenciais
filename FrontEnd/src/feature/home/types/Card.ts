export type SummaryCardVariant = "income" | "expense" | "balance";

export interface SummaryCardData {
  id: string;
  title: string;
  value: number;
  variant: SummaryCardVariant;
}

export interface SummaryCardsProps {
  income: number;
  expenses: number;
  balance?: number;
  locale?: string;
  currency?: string;
}

export interface SummaryCardProps {
  title: string;
  value: number;
  variant: SummaryCardVariant;
  locale: string;
  currency: string;
}
