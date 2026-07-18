using Backend.dtos;
using Backend.interfaces;
using Backend.data;
using Backend.models;
using Microsoft.EntityFrameworkCore;

namespace Backend.services
{
    // Essa classe centraliza as regras de negócio relacionadas às transações.
    // Em termos simples, ela é o "meio de campo" entre o controller e o banco.
    // O controller pede algo, e aqui acontece a busca, a criação e a remoção dos dados.
    public class TransacaoService : ITransacaoService
    {
        private readonly AppDbContext _context;

        // O DbContext é injetado aqui para que a service consiga consultar e salvar
        // informações no banco sem precisar criar a conexão manualmente.
        public TransacaoService(AppDbContext context)
        {
            _context = context;
        }

        // Esse método busca todas as transações e, se vier um tipo filtrado na URL,
        // ele já aplica esse filtro antes de retornar os dados.
        // Também carrega o morador relacionado para que eu consiga mostrar o nome da pessoa.
        public async Task<IEnumerable<TransacaoResponseDto>> ObterTodasAsync(string? tipo = null)
        {
            // Começo a query pedindo as transações com o morador incluído.
            // Isso é importante porque no DTO final eu preciso do nome do morador.
            var query = _context.Trasacoes.Include(t => t.Morador).AsQueryable();

            // Se o tipo foi informado, eu filtro a lista pelo valor digitado.
            // Como o valor pode estar em caixa diferente, deixo tudo em minúsculo para comparar igual.
            if (!string.IsNullOrWhiteSpace(tipo))
            {
                query = query.Where(t => t.Tipo.ToLower() == tipo.ToLower());
            }

            // Aqui a query só é executada quando eu preciso realmente dos dados.
            var transacoes = await query.ToListAsync();

            // Depois que achei as transações, eu transformo cada item no DTO de resposta
            // para devolver uma estrutura mais simples para a camada de apresentação.
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

        // Esse método cria uma nova transação com base no DTO recebido.
        // A ideia é validar se o morador existe, montar o objeto e salvar no banco.
        public async Task<TransacaoResponseDto> CriarTransacoesAsync(TransacaoCreateDto dto)
        {
            // Primeiro eu tento localizar o morador relacionado à transação.
            // Se não achar, a operação é interrompida para evitar salvar um registro inconsistente.
            var pessoa = await _context.Trasacoes.FindAsync(dto.MoradorId);
            if (pessoa == null)
            {
                throw new Exception("Morador não encontrado.");
            }

            // Aqui eu construo a entidade de transação com os dados que vieram no request.
            // É uma etapa bem simples: pego as informações e monto o objeto pronto para persistir.
            var novaTransacao = new Transacao
            {
                Descricao = dto.Descricao,
                Valor = dto.Valor,
                Tipo = dto.Tipo,
                MoradorId = dto.MoradorId
            };

            // Depois disso, adiciono a transação no contexto e mando salvar no banco.
            await _context.Trasacoes.AddAsync(novaTransacao);
            await _context.SaveChangesAsync();

            // Por fim, eu devolvo um DTO já preenchido com o resultado gerado.
            // Isso deixa a resposta mais organizada e pronta para ser consumida pelo controller.
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

        // Esse método remove uma transação pelo seu id.
        // Se não existir, ele simplesmente informa que não encontrou nada.
        public async Task<bool> DeletarAsync(int id)
        {
            // Busco a transação para confirmar se ela realmente existe antes de tentar excluir.
            var transacao = await _context.Trasacoes.FindAsync(id);
            if (transacao == null) return false;

            // Se encontrei, removo do contexto e salvo a alteração.
            _context.Trasacoes.Remove(transacao);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}