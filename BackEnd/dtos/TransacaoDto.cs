using System.ComponentModel.DataAnnotations;

namespace Backend.dtos
{
    public class TransacaoCreateDto
    {
        [Required(ErrorMessage = "A descrição é obrigatória.")]
        public string Descricao { get; set; } = string.Empty;

        [Required(ErrorMessage = "O valor é obrigatório.")]
        [Range(0.01, 9999999, ErrorMessage = "O valor deve ser maior que zero.")]
        public decimal Valor { get; set; }

        [Required(ErrorMessage = "O tipo é obrigatório.")]
        [RegularExpression("^(Receita|Despesa)$", ErrorMessage = "O tipo deve ser 'Receita' ou 'Despesa'.")]
        public string Tipo { get; set; } = string.Empty;

        [Required(ErrorMessage = "O morador associado é obrigatório.")]
        public int MoradorId { get; set; }
    }
    public class TransacaoResponseDto
    {
        public int Id { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public decimal Valor { get; set; }
        public string Tipo { get; set; } = string.Empty;
        public int MoradorId { get; set; }
        public string NomePessoa { get; set; } = string.Empty;
    }
}