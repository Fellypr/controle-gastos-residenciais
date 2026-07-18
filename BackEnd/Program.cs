using Backend.data;
using Backend.interfaces;
using Backend.services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddScoped<IMoradorService, MoradorServices>();
builder.Services.AddScoped<ITransacaoService, TransacaoService>();

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
   options.AddPolicy("AllowFrontend", policy =>
   {
       policy
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
   });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.MapControllers();
app.Run();
