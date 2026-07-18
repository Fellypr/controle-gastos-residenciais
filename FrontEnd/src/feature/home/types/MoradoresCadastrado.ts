interface Morador {
  id: number;
  nome: string;
  idade: number;
  receitas: number;
  despesas: number;
}

export interface ResumoMoradoresProps {
  moradores: Morador[];
}