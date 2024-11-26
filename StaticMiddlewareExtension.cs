using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace LogInSingUpWebApp
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public static class StaticMiddlewareExtension
    {
        public static IApplicationBuilder UseStaticMiddleware(this IApplicationBuilder app)
        {
            return app.UseMiddleware<StaticMiddleware>();
        }        
    }

}
