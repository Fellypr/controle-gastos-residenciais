using Backend.data;
using Backend.interfaces;
using Backend.dtos;
using Backend.models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Microsoft.AspNetCore.Http.HttpResults;
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
            try
            {
                // Antes de cadastrar, eu confiro se ja existe alguem com o mesmo nome
                // para evitar duplicidade no cadastro.
                var nomeJaExiste = await _context.Moradores.FirstOrDefaultAsync(x => x.Nome == moradorDto.Nome);
                if(nomeJaExiste != null)
                {
                    throw new Exception($"O nome '{moradorDto.Nome}' já está cadastrado. Tente diferenciá-lo adicionando um sobrenome (ex: {moradorDto.Nome} Silva).");
                }

                // Se passar na validacao, eu monto a entidade que realmente vai ser salva no banco.
                var criarCadastro = new Morador
                {
                  Nome = moradorDto.Nome,
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
            catch (Exception ex)
            {
                throw new Exception ("Erro ao criar usuario",ex);
            }
            
        }
        public async Task<bool> DeletarMorador(int id)
        {
            try
            {
                // Primeiro eu tento localizar o morador pelo Id.
                var morador = await _context.Moradores.FindAsync(id);

                if(morador == null) 
                    return false;
                
                // Se encontrou, remove e salva a alteracao no banco.
                _context.Moradores.Remove(morador);
                await _context.SaveChangesAsync();
                return true;

            }
            catch (Exception ex)
            {
                throw new Exception ("Erro ao deletar o Morador",ex);
            }
            
        }
        
    } 
    
}
