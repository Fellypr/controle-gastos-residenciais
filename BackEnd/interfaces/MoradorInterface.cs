using Backend.dtos;

namespace Backend.interfaces
{
    public interface IMorador
    {
        Task<CadastrarMoradorDto>CadastrarMorador(CadastrarMoradorDto moradorDto);

    }
}