using Backend.dtos;
using Backend.exceptions;
using Backend.interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MoradorController : ControllerBase
    {
        private readonly IMoradorService _moradorService;

        public MoradorController(IMoradorService moradorService)
        {
            _moradorService = moradorService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MoradorResponseDto>>> ObterTodosOsMoradores()
        {
            var moradores = await _moradorService.ObterTodosOsMoradores();
            return Ok(moradores);
        }

        [HttpPost]
        public async Task<ActionResult<MoradorResponseDto>> CadastrarMorador([FromBody] CadastrarMoradorDto moradorDto)
        {
            try
            {
                var moradorCadastrado = await _moradorService.CadastrarMoradoresAsync(moradorDto);
                return CreatedAtAction(nameof(ObterTodosOsMoradores), new { id = moradorCadastrado.Id }, moradorCadastrado);
            }
            catch (DuplicateMoradorException ex)
            {
                return Conflict(new { mensagem = ex.Message });
            }
            catch (DomainException ex)
            {
                return BadRequest(new { mensagem = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletarMorador(int id)
        {
            try
            {
                var deletado = await _moradorService.DeletarMorador(id);

                if (!deletado)
                {
                    return NotFound(new { mensagem = "Morador nao encontrado." });
                }

                return Ok(new { mensagem = "Morador deletado com sucesso." });
            }
            catch (DomainException ex)
            {
                return BadRequest(new { mensagem = ex.Message });
            }
        }
    }
}
