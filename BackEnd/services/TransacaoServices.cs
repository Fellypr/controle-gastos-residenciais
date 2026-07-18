using Backend.dtos;
using Backend.interfaces;
using Backend.data;
using Backend.models;
using Microsoft.EntityFrameworkCore;

namespace Backend.services
{
    public class TransacaoService : ITransacaoService
    {
        private readonly AppDbContext _context;

        public TransacaoService(AppDbContext context)
        {
            _context = context;
        }

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

        public async Task<TransacaoResponseDto> CriarAsync(TransacaoCreateDto dto)
        {
            
            var pessoa = await _context.Trasacoes.FindAsync(dto.MoradorId);
            if (pessoa == null)
            {
                throw new Exception("Morador não encontrado.");
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
                NomePessoa = pessoa.Morador.Nome
            };
        }

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