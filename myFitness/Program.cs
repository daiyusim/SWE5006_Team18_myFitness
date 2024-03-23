using myFitness.Data;
using myFitness.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<DatabaseSettings>(
                builder.Configuration.GetSection("ConnectionStrings"));

builder.Services.AddSingleton<EventServices>();
builder.Services.AddSingleton<RegistrationServices>();
builder.Services.AddSingleton<EventRatingServices>();
builder.Services.AddSingleton<UserServices>();
builder.Services.AddSingleton<AttendanceServices>();
builder.Services.AddSingleton<ProfileServices>();


builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
