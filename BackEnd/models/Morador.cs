using System.ComponentModel.DataAnnotations;

namespace Backend.models
{
    public class Morador
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Nome { get; set; } = string.Empty;

        [Required]
        public int Idade { get; set; }

        public virtual List<Transacao> Transacoes { get; set; } = new List<Transacao>();
    }

    
} 