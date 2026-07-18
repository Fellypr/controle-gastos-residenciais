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

        public async Task<MoradorResponseDto> CadastrarMoradoresAsync(CadastrarMoradorDto moradorDto)
        {
            try
            {
                var nomeJaExiste = await _context.Moradores.FirstOrDefaultAsync(x => x.Nome == moradorDto.Nome);
                if(nomeJaExiste != null)
                {
                    throw new Exception($"O nome '{moradorDto.Nome}' já está cadastrado. Tente diferenciá-lo adicionando um sobrenome (ex: {moradorDto.Nome} Silva).");
                }

                var criarCadastro = new Morador
                {
                  Nome = moradorDto.Nome,
                  Idade = moradorDto.Idade
                };

                await _context.Moradores.AddAsync(criarCadastro);
                await _context.SaveChangesAsync();

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
                var morador = await _context.Moradores.FindAsync(id);

                if(morador == null) 
                    return false;
                
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