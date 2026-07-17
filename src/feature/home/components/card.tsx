import type { ReactNode } from "react";
import type {SummaryCardProps,SummaryCardsProps,SummaryCardData,SummaryCardVariant} from "../types/Card"
import { useCard } from "../hook/UseCard";
import "./card.css"




const IncomeIcon = (): ReactNode => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 19V5" />
    <path d="m6.5 10.5 5.5-5.5 5.5 5.5" />
  </svg>
);

const ExpenseIcon = (): ReactNode => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 5v14" />
    <path d="m6.5 13.5 5.5 5.5 5.5-5.5" />
  </svg>
);

const BalanceIcon = (): ReactNode => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="5" y="5" width="14" height="14" rx="1.5" />
    <rect x="9" y="9" width="6" height="6" rx="0.5" />
  </svg>
);

const icons: Record<SummaryCardVariant, ReactNode> = {
  income: <IncomeIcon />,
  expense: <ExpenseIcon />,
  balance: <BalanceIcon />,
};
function SummaryCard({
  title,
  value,
  variant,
  locale,
  currency,
}: SummaryCardProps) {
    const{formatCurrency} = useCard();
  return (
    <article className={`summary-card summary-card--${variant}`}>
      <div className="summary-card__header">
        <span className="summary-card__icon">{icons[variant]}</span>

        <h2 className="summary-card__title">{title}</h2>
      </div>

      <strong className="summary-card__value">
        {formatCurrency(value, locale, currency)}
      </strong>
    </article>
  );
}

export default function SummaryCards({
  income,
  expenses,
  balance = income - expenses,
  locale = "pt-BR",
  currency = "BRL",
}: SummaryCardsProps) {
  const cards: SummaryCardData[] = [
    {
      id: "income",
      title: "Total Receitas",
      value: income,
      variant: "income",
    },
    {
      id: "expense",
      title: "Total Despesas",
      value: expenses,
      variant: "expense",
    },
    {
      id: "balance",
      title: "Saldo Líquido",
      value: balance,
      variant: "balance",
    },
  ];

  return (
    <section className="summary-cards" aria-label="Resumo financeiro">
      {cards.map((card) => (
        <SummaryCard
          key={card.id}
          title={card.title}
          value={card.value}
          variant={card.variant}
          locale={locale}
          currency={currency}
        />
      ))}
    </section>
  );
}
