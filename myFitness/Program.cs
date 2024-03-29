using myFitness.Data;
using myFitness.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<DatabaseSettings>(
                builder.Configuration.GetSection("ConnectionStrings"));

builder.Services.AddSingleton<IEventServices, EventServices>();
builder.Services.AddSingleton<IEventRegistrationServices, EventRegistrationServices>();
builder.Services.AddSingleton<IEventRatingServices, EventRatingServices>();
builder.Services.AddSingleton<IUserServices, UserServices>();
builder.Services.AddSingleton<IAttendanceServices, AttendanceServices>();
builder.Services.AddSingleton<IProfileServices, ProfileServices>();


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
