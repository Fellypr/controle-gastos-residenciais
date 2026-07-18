using System.ComponentModel.DataAnnotations;

namespace Backend.models
{
    public class Transacao
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Descricao { get; set; } = string.Empty;

        [Required]
        public decimal Valor { get; set; }

        [Required]
        public string Tipo { get; set; } = string.Empty;

        public int MoradorId { get; set; }
        
        public virtual Morador Morador { get; set; } = null!;
    }
}