using Backend.data;
using Backend.interfaces;
using Backend.dtos;
using Backend.models;
using Backend.exceptions;
using Microsoft.EntityFrameworkCore;

namespace Backend.services
{
    public class MoradorServices : IMoradorService
    {
        private readonly AppDbContext _context;

        public MoradorServices(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MoradorResponseDto>> ObterTodosOsMoradores()
        {
            // Aqui eu busco todos os moradores no banco e depois monto um DTO mais simples para retornar.
            var listarMoradores = await _context.Moradores.ToListAsync();

            return listarMoradores.Select(p => new MoradorResponseDto
            {
               Id = p.Id,
               Nome = p.Nome,
               Idade = p.Idade 
            });
        }

        public async Task<MoradorResponseDto> CadastrarMoradoresAsync(CadastrarMoradorDto moradorDto)
        {
            var nomeNormalizado = moradorDto.Nome.Trim();

            var nomeJaExiste = await _context.Moradores
                .AnyAsync(x => x.Nome.ToLower() == nomeNormalizado.ToLower());

            if (nomeJaExiste)
            {
                throw new DuplicateMoradorException(nomeNormalizado);
            }

            // Se passar na validacao, eu monto a entidade que realmente vai ser salva no banco.
            var criarCadastro = new Morador
            {
                Nome = nomeNormalizado,
                Idade = moradorDto.Idade
            };

            // Aqui eu adiciono no contexto e salvo para o EF gerar o Id no banco.
            await _context.Moradores.AddAsync(criarCadastro);
            await _context.SaveChangesAsync();

            // No retorno, eu mando um DTO de resposta em vez da entidade inteira.
            return new MoradorResponseDto
            {
                Id = criarCadastro.Id,
                Nome = criarCadastro.Nome,
                Idade = criarCadastro.Idade
            };
        }

        public async Task<bool> DeletarMorador(int id)
        {
            // Primeiro eu tento localizar o morador pelo Id.
            var morador = await _context.Moradores.FindAsync(id);

            if (morador == null)
                return false;

            // Se encontrou, remove e salva a alteracao no banco.
            _context.Moradores.Remove(morador);
            await _context.SaveChangesAsync();
            return true;
        }

    }
}
