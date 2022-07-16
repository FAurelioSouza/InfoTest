namespace Info_Invest
{
    public static class Startup
    {
        public static IConfiguration Configuration { get; set; }

        public static WebApplication InitializeApp(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            Configuration = builder.Configuration;
            ConfigureService(builder);
            var app = builder.Build();
            //Configuration = app.Configuration;
            Configure(app);
            return app;
        }

        private static void ConfigureService(WebApplicationBuilder builder)
        {
            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            //string de conexão do banco
            //var connectionString = Configuration["Data:ConnectionStrings:FilmeConnection1"];
            builder.Services.AddCors();

        }

        private static void Configure(WebApplication app)
        {
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();

            }
            app.MapControllers();
            app.UseCors(x => x
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .SetIsOriginAllowed(origin => true) // allow any origin
                                                        //.WithOrigins("https://localhost:44351")); // Allow only this origin can also have multiple origins separated with comma
                    .AllowCredentials()); // allow credentials
        }
    }
}
