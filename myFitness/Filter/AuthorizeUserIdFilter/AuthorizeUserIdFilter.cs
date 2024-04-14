using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.IdentityModel.Tokens;
using myFitness.Services;
using Newtonsoft.Json.Linq;

namespace myFitness.Filter
{
    public class AuthorizeUserIdAttribute : TypeFilterAttribute
    {
        public AuthorizeUserIdAttribute() : base(typeof(AuthorizeUserIdFilter))
        {
        }
    }

    public class AuthorizeUserIdFilter : IAuthorizationFilter
    {
        private IUserServices _userServices;
        public AuthorizeUserIdFilter(IUserServices userServices)
        {
            _userServices = userServices;
        }

        public async void OnAuthorization(AuthorizationFilterContext context)
        {
            // Retrieve the currently authenticated user's ID
            var userId = context.HttpContext.User.FindFirst("UserId").Value;

            // Retrieve the record ID from the route data
            string? id = context.RouteData.Values["id"]?.ToString();

            // Retrieve the userId from the request body
            var request = context.HttpContext.Request;
            request.EnableBuffering(); // Allow reading the request body more than once
            var requestBody = await new StreamReader(request.Body).ReadToEndAsync();
            string? userIdFromRequestBody = null;
            if (!requestBody.IsNullOrEmpty())
            {
                var requestBodyJson = JObject.Parse(requestBody);
                userIdFromRequestBody = requestBodyJson.Value<string>("UserId");
            }
            if (id.IsNullOrEmpty() && userIdFromRequestBody.IsNullOrEmpty())
            {
                context.Result = new ForbidResult();
                return;
            }

            var userIdFromRequest = !id.IsNullOrEmpty() ? id : requestBody;
            // Check if the record exists
            try
            {
                var existingRecord = _userServices.Get(userIdFromRequest);
            }
            catch (Exception e)
            {
                context.Result = new NotFoundResult();
                return;
            }


            // Check ownership
            if (userIdFromRequest != userId)
            {
                context.Result = new ForbidResult(); // Or return 403 Forbidden
                return;
            }
        }
    }
}