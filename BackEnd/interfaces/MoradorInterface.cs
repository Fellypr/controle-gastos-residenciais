using Backend.dtos;

namespace Backend.interfaces
{
    public interface IMoradorService
    {
        Task<MoradorResponseDto>CadastrarMoradoresAsync(CadastrarMoradorDto moradorDto);

    }
}