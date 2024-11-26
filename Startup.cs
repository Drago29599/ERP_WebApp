using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Net;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using LogInSingUpWebApp.Models;

namespace LogInSingUpWebApp
{
    public class Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            // Register IHttpClientFactory
            services.AddHttpClient();

            services.Configure<CookiePolicyOptions>(options =>
            {
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            //services.AddAuthentication("MyCookieAuth")
            //.AddCookie("MyCookieAuth", options =>
            //{
            //   /* options.LoginPath = "/Home/validateAssociate";*/ // Adjust this path as needed
            //});

            // Bind the JWT settings from appsettings.json
            services.Configure<JwtSettings>(_configuration.GetSection("Jwt"));


            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options => {

                    // Inject the strongly-typed settings here
                    var jwtSettings = _configuration.GetSection("Jwt").Get<JwtSettings>();

                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = jwtSettings.Issuer,
                        ValidAudience = jwtSettings.Audience,
                        IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(jwtSettings.Key))
                    };
            });

            services.AddMvc(options=>options.Filters.Add(new AuthorizeFilter())).SetCompatibilityVersion(CompatibilityVersion.Version_3_0);

            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromMinutes(30);
            });

            services.AddCors(option => option.AddPolicy("corspolicy", builder =>
            {
                builder.WithOrigins("*")
                .AllowAnyMethod()
                .AllowAnyHeader();
            }));

            services.AddControllers(options => options.EnableEndpointRouting = false);

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            //services.AddSingleton<Decrypt>

            services.AddHsts(options =>
            {
                options.MaxAge = TimeSpan.FromMinutes(365);
                options.IncludeSubDomains = true;
                options.Preload = true;
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseCookiePolicy();
            app.UseCors("corspolicy"); // Ensure CORS is enabled before authentication
            app.UseAuthentication();
            

            app.UseStaticMiddleware();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.Options.StartupTimeout = new TimeSpan(0, 0, 200);
                    spa.UseAngularCliServer(npmScript: "start");
                }
                else
                {
                    // In production, serve the static files from the ClientApp/dist folder
                    spa.Options.SourcePath = "ClientApp/dist";  // Angular build output
                }
            });

            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints => {
                endpoints.MapFallbackToFile("index.html");
            });

            //app.Use(async (context, next) =>
            //{
            //    context.Response.Headers.Add("Content-Security-Policy", "default-src 'self' 'unsafe-inline'");
            //    await next.Invoke();
            //});
        }
    }
}
