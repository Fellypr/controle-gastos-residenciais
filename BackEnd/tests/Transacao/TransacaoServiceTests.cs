using Backend.dtos;
using Backend.exceptions;
using Backend.services;
using Tests.Shared;

namespace Tests.Transacao;

public static class TransacaoServiceTests
{
    public static async Task TesteObterTodasAsyncRetornaTodasAsTransacoes()
    {
        await using var testContext = await TestContextFactory.CriarContextoAsync();

        var morador = new Backend.models.Morador
        {
            Nome = "Ana",
            Idade = 28
        };

        await testContext.Context.Moradores.AddAsync(morador);
        await testContext.Context.SaveChangesAsync();

        await testContext.Context.Trasacoes.AddRangeAsync(
            new Backend.models.Transacao
            {
                Descricao = "Salario",
                Valor = 2500,
                Tipo = "Receita",
                MoradorId = morador.Id
            },
            new Backend.models.Transacao
            {
                Descricao = "Internet",
                Valor = 120,
                Tipo = "Despesa",
                MoradorId = morador.Id
            }
        );

        await testContext.Context.SaveChangesAsync();

        var service = new TransacaoService(testContext.Context);
        var resultado = (await service.ObterTodasAsync()).ToList();

        if (resultado.Count != 2)
        {
            throw new Exception("Era esperado retornar 2 transacoes.");
        }
    }

    public static async Task TesteObterTodasAsyncFiltraPorTipo()
    {
        await using var testContext = await TestContextFactory.CriarContextoAsync();

        var morador = new Backend.models.Morador
        {
            Nome = "Bruno",
            Idade = 35
        };

        await testContext.Context.Moradores.AddAsync(morador);
        await testContext.Context.SaveChangesAsync();

        await testContext.Context.Trasacoes.AddRangeAsync(
            new Backend.models.Transacao
            {
                Descricao = "Freela",
                Valor = 800,
                Tipo = "Receita",
                MoradorId = morador.Id
            },
            new Backend.models.Transacao
            {
                Descricao = "Luz",
                Valor = 90,
                Tipo = "Despesa",
                MoradorId = morador.Id
            }
        );

        await testContext.Context.SaveChangesAsync();

        var service = new TransacaoService(testContext.Context);
        var resultado = (await service.ObterTodasAsync("Receita")).ToList();

        if (resultado.Count != 1)
        {
            throw new Exception("Era esperado retornar somente 1 transacao do tipo Receita.");
        }

        if (resultado[0].Tipo != "Receita")
        {
            throw new Exception("O filtro por tipo nao retornou a transacao esperada.");
        }
    }

    public static async Task TesteCriarAsyncSemMoradorRelacionadoLancaErro()
    {
        await using var testContext = await TestContextFactory.CriarContextoAsync();
        var service = new TransacaoService(testContext.Context);

        var dto = new TransacaoCreateDto
        {
            Descricao = "Mercado",
            Valor = 150,
            Tipo = "Despesa",
            MoradorId = 999
        };

        try
        {
            await service.CriarTransacoesAsync(dto);
            throw new Exception("Era esperado um erro ao criar transacao sem morador relacionado.");
        }
        catch (MoradorNotFoundException ex)
        {
            if (!ex.Message.Contains("não encontrado", StringComparison.OrdinalIgnoreCase))
            {
                throw new Exception("A mensagem de erro nao foi a esperada para morador nao encontrado.");
            }
        }
    }

    public static async Task TesteDeletarAsyncComSucesso()
    {
        await using var testContext = await TestContextFactory.CriarContextoAsync();

        var morador = new Backend.models.Morador
        {
            Nome = "Clara",
            Idade = 31
        };

        await testContext.Context.Moradores.AddAsync(morador);
        await testContext.Context.SaveChangesAsync();

        var transacao = new Backend.models.Transacao
        {
            Descricao = "Agua",
            Valor = 70,
            Tipo = "Despesa",
            MoradorId = morador.Id
        };

        await testContext.Context.Trasacoes.AddAsync(transacao);
        await testContext.Context.SaveChangesAsync();

        var service = new TransacaoService(testContext.Context);
        var resultado = await service.DeletarAsync(transacao.Id);

        if (!resultado)
        {
            throw new Exception("Era esperado que o metodo retornasse true ao deletar uma transacao existente.");
        }

        var transacaoNoBanco = await testContext.Context.Trasacoes.FindAsync(transacao.Id);

        if (transacaoNoBanco is not null)
        {
            throw new Exception("A transacao ainda foi encontrada no banco depois da exclusao.");
        }
    }

    public static async Task TesteDeletarAsyncInexistenteRetornaFalse()
    {
        await using var testContext = await TestContextFactory.CriarContextoAsync();
        var service = new TransacaoService(testContext.Context);

        var resultado = await service.DeletarAsync(999);

        if (resultado)
        {
            throw new Exception("Era esperado que o metodo retornasse false ao tentar deletar uma transacao inexistente.");
        }
    }
}
