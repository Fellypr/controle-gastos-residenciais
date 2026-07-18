using Microsoft.EntityFrameworkCore;
using Backend.models;
namespace Backend.data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {}

        public DbSet<Morador> Moradores {get; set;} = null;
        public DbSet<Transacao> Trasacoes { get; set; } = null;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Transacao>()
                .HasOne(t => t.Morador)
                .WithMany(p => p.Transacoes)
                .HasForeignKey(t => t.MoradorId)
                .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(modelBuilder);
        }
        
    }
    
}