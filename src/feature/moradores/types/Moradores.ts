export interface NovoMorador {
  nome: string;
  idade: number;
}

export interface CadastrarMoradorProps {
  onCadastrar: (morador: NovoMorador) => void;
}