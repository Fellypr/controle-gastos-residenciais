using Backend.dtos;
using Backend.interfaces;
using Backend.data;
using Backend.models;
using Microsoft.EntityFrameworkCore;

namespace Backend.services
{
    // Classe que fica entre o controller e o banco para cuidar da regra das transações.
    public class TransacaoService : ITransacaoService
    {
        private readonly AppDbContext _context;

        public TransacaoService(AppDbContext context)
        {
            _context = context;
        }

        // Busca as transações e, se vier um tipo, filtra a lista antes de devolver.
        // Também carrega o morador junto pra mostrar o nome no retorno.
        public async Task<IEnumerable<TransacaoResponseDto>> ObterTodasAsync(string? tipo = null)
        {
            var query = _context.Trasacoes.Include(t => t.Morador).AsQueryable();

            if (!string.IsNullOrWhiteSpace(tipo))
            {
                query = query.Where(t => t.Tipo.ToLower() == tipo.ToLower());
            }

            var transacoes = await query.ToListAsync();

            return transacoes.Select(t => new TransacaoResponseDto
            {
                Id = t.Id,
                Descricao = t.Descricao,
                Valor = t.Valor,
                Tipo = t.Tipo,
                MoradorId = t.MoradorId,
                NomePessoa = t.Morador.Nome
            });
        }

        // Cria a transação e valida se o morador realmente existe antes de salvar.
        public async Task<TransacaoResponseDto> CriarTransacoesAsync(TransacaoCreateDto dto)
        {

            var morador = await _context.Moradores.FindAsync(dto.MoradorId);

            if(morador == null)
            {
                throw new Exception("Morador não encontrado");
                
            }
            if (dto.Tipo == "Receita" && morador.Idade < 18)
            {
                throw new InvalidOperationException ($"Menores de 18 anos só podem registrar despesas.");
                
            }

            var novaTransacao = new Transacao
            {
                Descricao = dto.Descricao,
                Valor = dto.Valor,
                Tipo = dto.Tipo,
                MoradorId = dto.MoradorId
            };

            

            await _context.Trasacoes.AddAsync(novaTransacao);
            await _context.SaveChangesAsync();

            return new TransacaoResponseDto
            {
                Id = novaTransacao.Id,
                Descricao = novaTransacao.Descricao,
                Valor = novaTransacao.Valor,
                Tipo = novaTransacao.Tipo,
                MoradorId = novaTransacao.MoradorId,
                NomePessoa = morador.Nome
            };
        }

        // Remove a transação pelo ID, só se ela existir.
        public async Task<bool> DeletarAsync(int id)
        {
            var transacao = await _context.Trasacoes.FindAsync(id);
            if (transacao == null) return false;

            _context.Trasacoes.Remove(transacao);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}