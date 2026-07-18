using Backend.data;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace Tests.Shared;

public static class TestContextFactory
{
    public static async Task<TestContext> CriarContextoAsync()
    {
        var connection = new SqliteConnection("Data Source=:memory:");
        await connection.OpenAsync();

        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseSqlite(connection)
            .Options;

        var context = new AppDbContext(options);
        await context.Database.EnsureCreatedAsync();

        return new TestContext(context, connection);
    }
}

public sealed class TestContext : IAsyncDisposable
{
    public AppDbContext Context { get; }
    private readonly SqliteConnection _connection;

    public TestContext(AppDbContext context, SqliteConnection connection)
    {
        Context = context;
        _connection = connection;
    }

    public async ValueTask DisposeAsync()
    {
        await Context.DisposeAsync();
        await _connection.DisposeAsync();
    }
}
