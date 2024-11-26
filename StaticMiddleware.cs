using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace LogInSingUpWebApp
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class StaticMiddleware
    {
        private readonly RequestDelegate _next;

        public StaticMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            if (httpContext.User.Identity.IsAuthenticated)
            {
                await _next(httpContext);
            }
            else
            {
                await _next(httpContext);
            }
            
        }
    }


}
