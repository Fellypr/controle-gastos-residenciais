using System.ComponentModel.DataAnnotations;

namespace Backend.dtos
{
    public class CadastrarMoradorDto
    {
        [Required(ErrorMessage = "O nome é obrigatorio")]
        [MaxLength(50, ErrorMessage ="O nome não pode ter mais de 50 caracteres")]
        [MinLength(2,ErrorMessage ="O nome precisa ter mais que 2 caracteres")]
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "Por favor informe sua idade")]
        [Range(1, 120, ErrorMessage = "Por favor, insira uma idade válida entre 1 e 120 anos.")]
        public int Idade { get; set; }

    }
    public class MoradorResponseDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public int Idade { get; set; }
    }

    
} 