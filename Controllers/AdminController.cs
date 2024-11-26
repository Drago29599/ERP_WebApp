using LogInSingUpWebApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.ComponentModel;
using System.Net.Http.Headers;
using System.Text;

namespace LogInSingUpWebApp.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AdminController : Controller
    {
        private string _ApiUrl;
        //private readonly HttpClient _httpClient;

        public AdminController(HttpClient httpClient)
        {
            _ApiUrl = "https://localhost:7112/api/";
            //_httpClient = httpClient;
        }

        [HttpPost]
        [Authorize]
        public async Task<string> CreateCurriculum([FromBody] CurriculumReqDto curriculumReqDto)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    // Retrieve the token from the authorization header (or pass it as needed)
                    var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

                    //if (string.IsNullOrEmpty(token))
                    //{
                    //    return Unauthorized("Token is missing");
                    //}

                    // Set the Authorization header with the JWT token
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                    var json = JsonConvert.SerializeObject(curriculumReqDto);
                    var content = new StringContent(json, Encoding.UTF8, "application/json");

                    // Call the API
                    var response = await client.PostAsync(_ApiUrl + "Admin/CreateCurriculum", content);

                    if (response.IsSuccessStatusCode)
                    {
                        return "Success";
                    }
                }
            }
            catch (Exception)
            {

                throw;
            }

            return "Failed";
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllSubject()
        {
            using (var client = new HttpClient())
            {
                // Retrieve the token from the authorization header (or pass it as needed)
                var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

                if (string.IsNullOrEmpty(token))
                {
                    return Unauthorized("Token is missing");
                }

                // Set the Authorization header with the JWT token
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                // Call the API
                var response = await client.GetAsync(_ApiUrl + "Admin/GetAllSubject");

                if (response.IsSuccessStatusCode)
                {
                    // Read the JSON response
                    var responseData = await response.Content.ReadAsStringAsync();
                    var subjects = JsonConvert.DeserializeObject<List<SubjectResponseDto>>(responseData);

                    return Ok(subjects);

                }
                else
                {
                    return BadRequest("Unable to fetch subjects.");
                }
            }
        }
    }
}
