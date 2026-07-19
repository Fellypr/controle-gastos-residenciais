namespace Backend.exceptions
{
    public class DomainException : Exception
    {
        public DomainException(string message) : base(message)
        {
        }
    }

    public sealed class DuplicateMoradorException : DomainException
    {
        public DuplicateMoradorException(string nome)
            : base($"O nome '{nome}' já está cadastrado. Tente diferenciá-lo adicionando um sobrenome.")
        {
        }
    }

    public sealed class MoradorNotFoundException : DomainException
    {
        public MoradorNotFoundException(int id)
            : base($"Morador com id {id} não encontrado.")
        {
        }
    }

    public sealed class MenorDeIdadeReceitaException : DomainException
    {
        public MenorDeIdadeReceitaException()
            : base("Menores de 18 anos só podem registrar despesas.")
        {
        }
    }
}
