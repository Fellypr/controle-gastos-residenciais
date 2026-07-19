export interface CadastrarMoradorDto {
  nome: string;
  idade: number;
}

export interface MoradorResponseDto {
  id: number;
  nome: string;
  idade: number;
}

export interface MensagemResponse {
  mensagem: string;
}

export interface CadastrarMoradorProps {
  onCadastrar: (morador: CadastrarMoradorDto) => void;
  onFecharMensagemSucesso?: () => void;
  nome: string;
  idade: string;
  mensagemSucesso?: string | null;
  carregando?: boolean;
  onNomeChange: (nome: string) => void;
  onIdadeChange: (idade: string) => void;
}

export interface TabelaMoradoresCadastradoProps {
  moradores: MoradorResponseDto[];
  carregando?: boolean;
  onExcluir: (id: number) => void;
}
