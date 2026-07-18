using Backend.dtos;

namespace Backend.interfaces
{
    public interface ITransacaoService
    {
        Task<IEnumerable<TransacaoResponseDto>> ObterTodasAsync(string? tipo = null);
        Task<TransacaoResponseDto> CriarTransacoesAsync(TransacaoCreateDto dto);
        Task<bool> DeletarAsync(int id);
    }
}