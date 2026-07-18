# Teste simples do `CadastrarMoradoresAsync`

Oi. Eu reorganizei os testes para nao ficar tudo jogado na mesma pasta. A ideia continua simples: deixar facil de entender e facil de rodar.

## O que esse teste verifica

1. Se o morador for cadastrado certo, o metodo retorna os dados com `Id`, `Nome` e `Idade`.
2. Se tentar cadastrar duas vezes o mesmo nome, o metodo gera erro.

## Como a pasta ficou organizada

- `tests/Program.cs`: so executa os testes
- `tests/Morador/CadastrarMoradoresTests.cs`: testes da funcao `CadastrarMoradoresAsync`
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

Total de falhas: 0
```

## Se der erro

Se algum teste falhar, vai aparecer `[FALHOU]` e uma mensagem explicando o que nao bateu.
