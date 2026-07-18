using Backend.dtos;
using Backend.interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransacaoController : ControllerBase
    {
        private readonly ITransacaoService _transacaoService;

        public TransacaoController(ITransacaoService transacaoService)
        {
            _transacaoService = transacaoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TransacaoResponseDto>>> ObterTodas([FromQuery] string? tipo = null)
        {
            var transacoes = await _transacaoService.ObterTodasAsync(tipo);
            return Ok(transacoes);
        }

        [HttpPost]
        public async Task<ActionResult<TransacaoResponseDto>> Criar([FromBody] TransacaoCreateDto dto)
        {
            try
            {
                var novaTransacao = await _transacaoService.CriarTransacoesAsync(dto);
                return Ok(novaTransacao);
            }
            catch (Exception ex)
            {
                var mensagem = ex.InnerException?.Message ?? ex.Message;

                if (mensagem.Contains("Morador não encontrado", StringComparison.OrdinalIgnoreCase))
                {
                    return NotFound(new { mensagem });
                }

                return BadRequest(new { mensagem });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Deletar(int id)
        {
            try
            {
                var deletado = await _transacaoService.DeletarAsync(id);

                if (!deletado)
                {
                    return NotFound(new { mensagem = "Transacao nao encontrada." });
                }

                return Ok(new { mensagem = "Transacao deletada com sucesso." });
            }
            catch (Exception ex)
            {
                var mensagem = ex.InnerException?.Message ?? ex.Message;
                return BadRequest(new { mensagem });
            }
        }
    }
}
