using Tests.Morador;
using Tests.Transacao;

var falhas = 0;

var testes = new List<(string Nome, Func<Task> Executar)>
{
    ("TesteCadastroComSucesso", CadastrarMoradoresTests.TesteCadastroComSucesso),
    ("TesteNaoPermiteNomeDuplicado", CadastrarMoradoresTests.TesteNaoPermiteNomeDuplicado),
    ("TesteDeletarMoradorComSucesso", CadastrarMoradoresTests.TesteDeletarMoradorComSucesso),
    ("TesteDeletarMoradorInexistenteRetornaFalse", CadastrarMoradoresTests.TesteDeletarMoradorInexistenteRetornaFalse),
    ("TesteObterTodasAsyncRetornaTodasAsTransacoes", TransacaoServiceTests.TesteObterTodasAsyncRetornaTodasAsTransacoes),
    ("TesteObterTodasAsyncFiltraPorTipo", TransacaoServiceTests.TesteObterTodasAsyncFiltraPorTipo),
    ("TesteCriarAsyncSemMoradorRelacionadoLancaErro", TransacaoServiceTests.TesteCriarAsyncSemMoradorRelacionadoLancaErro),
    ("TesteDeletarAsyncComSucesso", TransacaoServiceTests.TesteDeletarAsyncComSucesso),
    ("TesteDeletarAsyncInexistenteRetornaFalse", TransacaoServiceTests.TesteDeletarAsyncInexistenteRetornaFalse)
};

foreach (var teste in testes)
{
    try
    {
        await teste.Executar();
        Console.WriteLine($"[OK] {teste.Nome}");
    }
    catch (Exception ex)
    {
        falhas++;
        Console.WriteLine($"[FALHOU] {teste.Nome}");
        Console.WriteLine(ex.Message);
    }
}

Console.WriteLine();
Console.WriteLine($"Total de falhas: {falhas}");

Environment.ExitCode = falhas == 0 ? 0 : 1;
