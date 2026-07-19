using Backend.dtos;
using Backend.exceptions;
using Backend.services;
using Tests.Shared;

namespace Tests.Morador;

public static class CadastrarMoradoresTests
{
    public static async Task TesteCadastroComSucesso()
    {
        await using var testContext = await TestContextFactory.CriarContextoAsync();
        var service = new MoradorServices(testContext.Context);

        var dto = new CadastrarMoradorDto
        {
            Nome = "Maria",
            Idade = 30
        };

        var resultado = await service.CadastrarMoradoresAsync(dto);

        if (resultado.Id <= 0)
        {
            throw new Exception("Era esperado que o morador fosse salvo com um Id maior que zero.");
        }

        if (resultado.Nome != "Maria")
        {
            throw new Exception("O nome retornado nao bate com o valor enviado.");
        }

        if (resultado.Idade != 30)
        {
            throw new Exception("A idade retornada nao bate com o valor enviado.");
        }
    }

    public static async Task TesteNaoPermiteNomeDuplicado()
    {
        await using var testContext = await TestContextFactory.CriarContextoAsync();
        var service = new MoradorServices(testContext.Context);

        var dto = new CadastrarMoradorDto
        {
            Nome = "Joao",
            Idade = 25
        };

        await service.CadastrarMoradoresAsync(dto);

        try
        {
            await service.CadastrarMoradoresAsync(dto);
            throw new Exception("Era esperado um erro ao cadastrar um nome duplicado.");
        }
        catch (DuplicateMoradorException ex)
        {
            if (!ex.Message.Contains("já está cadastrado", StringComparison.OrdinalIgnoreCase))
            {
                throw new Exception("A mensagem nao explicou que o nome ja existe.");
            }
        }
    }

    public static async Task TesteDeletarMoradorComSucesso()
    {
        await using var testContext = await TestContextFactory.CriarContextoAsync();

        var morador = new Backend.models.Morador
        {
            Nome = "Carlos",
            Idade = 40
        };

        await testContext.Context.Moradores.AddAsync(morador);
        await testContext.Context.SaveChangesAsync();

        var service = new MoradorServices(testContext.Context);
        var resultado = await service.DeletarMorador(morador.Id);

        if (!resultado)
        {
            throw new Exception("Era esperado que o metodo retornasse true ao deletar um morador existente.");
        }

        var moradorNoBanco = await testContext.Context.Moradores.FindAsync(morador.Id);

        if (moradorNoBanco is not null)
        {
            throw new Exception("O morador ainda foi encontrado no banco depois da exclusao.");
        }
    }

    public static async Task TesteDeletarMoradorInexistenteRetornaFalse()
    {
        await using var testContext = await TestContextFactory.CriarContextoAsync();
        var service = new MoradorServices(testContext.Context);

        var resultado = await service.DeletarMorador(999);

        if (resultado)
        {
            throw new Exception("Era esperado que o metodo retornasse false ao tentar deletar um morador inexistente.");
        }
    }
}
