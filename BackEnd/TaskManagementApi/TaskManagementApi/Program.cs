using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using TaskManagementApi.Authentication;
using TaskManagementApi.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddAuthentication("BasicAuthentication")
    .AddScheme<AuthenticationSchemeOptions, BasicAuthenticationHandler>("BasicAuthentication", null);

builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200") // Angular dev server origin
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseExceptionHandler(appError =>
{
    appError.Run(async context =>
    {
        var logger = context.RequestServices.GetRequiredService<ILogger<Program>>();
        var exceptionHandlerPathFeature = context.Features.Get<Microsoft.AspNetCore.Diagnostics.IExceptionHandlerPathFeature>();

        var error = exceptionHandlerPathFeature?.Error;
        var statusCode = 500;

        // Customize status codes based on exception types
        if (error is KeyNotFoundException)
        {
            statusCode = 404;
        }
        else if (error is ArgumentException)
        {
            statusCode = 400;
        }

        logger.LogError(error, "An error occurred: {Message}", error?.Message);

        context.Response.StatusCode = statusCode;
        context.Response.ContentType = "application/json";

        var response = new
        {
            StatusCode = statusCode,
            Message = "An unexpected error occurred.",
            Detail = app.Environment.IsDevelopment() ? error?.Message : null
        };

        await context.Response.WriteAsJsonAsync(response);
    });
});

app.UseHttpsRedirection();

// Apply CORS policy here (before UseAuthorization)
app.UseCors("AllowAngularApp");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
