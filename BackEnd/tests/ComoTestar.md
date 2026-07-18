# Teste simples do `CadastrarMoradoresAsync`

Oi. Eu reorganizei os testes para nao ficar tudo jogado na mesma pasta. A ideia continua simples: deixar facil de entender e facil de rodar.

## O que esse teste verifica

1. Se o morador for cadastrado certo, o metodo retorna os dados com `Id`, `Nome` e `Idade`.
2. Se tentar cadastrar duas vezes o mesmo nome, o metodo gera erro.
3. Se o morador existir, o metodo `DeletarMorador` retorna `true` e remove do banco.
4. Se o morador nao existir, o metodo `DeletarMorador` retorna `false`.
5. Se existirem transacoes, o metodo `ObterTodasAsync` lista tudo.
6. Se passar um tipo, o metodo `ObterTodasAsync` filtra por tipo.
7. Se tentar criar transacao sem relacao valida, o metodo `CriarAsync` gera erro.
8. Se a transacao existir, o metodo `DeletarAsync` retorna `true` e remove do banco.
9. Se a transacao nao existir, o metodo `DeletarAsync` retorna `false`.

## Como a pasta ficou organizada

- `tests/Program.cs`: so executa os testes
- `tests/Morador/CadastrarMoradoresTests.cs`: testes da funcao `CadastrarMoradoresAsync`
- `tests/Transacao/TransacaoServiceTests.cs`: testes das funcoes de transacao
- `tests/Shared/TestContextFactory.cs`: parte compartilhada para criar o banco em memoria
- `tests/SimpleTests.csproj`: projeto dos testes


## Como rodar

Abra o terminal na pasta do projeto e rode:

```bash
dotnet run --project tests/SimpleTests.csproj
```

## Resultado esperado

Se estiver tudo certo, deve aparecer algo parecido com isso:

```text
[OK] TesteCadastroComSucesso
[OK] TesteNaoPermiteNomeDuplicado
[OK] TesteDeletarMoradorComSucesso
[OK] TesteDeletarMoradorInexistenteRetornaFalse
[OK] TesteObterTodasAsyncRetornaTodasAsTransacoes
[OK] TesteObterTodasAsyncFiltraPorTipo
[OK] TesteCriarAsyncSemMoradorRelacionadoLancaErro
[OK] TesteDeletarAsyncComSucesso
[OK] TesteDeletarAsyncInexistenteRetornaFalse

Total de falhas: 0
```

## Se der erro

Se algum teste falhar, vai aparecer `[FALHOU]` e uma mensagem explicando o que nao bateu.
