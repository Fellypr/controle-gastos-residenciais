using Backend.dtos;

namespace Backend.interfaces
{
    public interface ITransacaoService
    {
        Task<IEnumerable<TransacaoResponseDto>> ObterTodasAsync(string? tipo = null);
        Task<TransacaoResponseDto> CriarAsync(TransacaoCreateDto dto);
        Task<bool> DeletarAsync(int id);
    }
}