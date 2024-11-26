using LogInSingUpWebApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json.Serialization;

namespace LogInSingUpWebApp.Controllers
{
    [Route("api/[controller]/[action]")]
    public class HomeController : Controller
    {
        private string _ApiUrl;
        //private readonly HttpClient _httpClient;

        public HomeController(HttpClient httpClient)
        {
            _ApiUrl = "https://localhost:7112/api/";
            //_httpClient = httpClient;
        }
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] Login login)
        {
            try
            {
                using ( var client = new HttpClient())
                {
                    
                    var json = JsonConvert.SerializeObject(login);
                    var content = new StringContent(json, Encoding.UTF8, "application/json");

                    // Call the API
                    var response = await client.PostAsync(_ApiUrl + "Auth/Login", content);

                    if (response.IsSuccessStatusCode)
                    {
                        // Read the JSON response
                        var responseData = await response.Content.ReadAsStringAsync();
                        var tokenData = JsonConvert.DeserializeObject<dynamic>(responseData);

                        // Extract Token and other details (ID, Username)
                        var token = tokenData?.jwtToken;
                        var userId = tokenData?.id;
                        var userName = tokenData?.userName;

                        var result = new LoginResponseDto
                        {
                            jwtToken = tokenData?.jwtToken,
                            userName = tokenData?.userName,
                            userId = tokenData?.userName
                        };
                        // Return token and user details
                        return Ok(result);
                    }
                    else
                    {
                        return Unauthorized("Invalid credentials");
                    }

                }

            }
            catch (Exception ex) {
                Console.WriteLine(ex.ToString());
                return BadRequest("An error occurred during login.");
            }
            return BadRequest();
        }

        // Method to get student data based on userId and token
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetStudentData([FromQuery] string userName)
        {
            var studentData = new List<StudentDataDto>();
            try
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

                    // Make the call to the internal Student API
                    var response = await client.GetAsync($"{_ApiUrl}LogInSingUp/GetStudentData?userName={userName}");

                    if (response.IsSuccessStatusCode)
                    {
                        // Deserialize the response into a List<StudentDataDto>
                        var responseString = await response.Content.ReadAsStringAsync();
                        if (responseString != null)
                        {
                            studentData = JsonConvert.DeserializeObject<List<StudentDataDto>>(responseString);

                        }


                        // Check if deserialization was successful
                        if (studentData == null)
                        {
                            return StatusCode(500, "Error deserializing student data.");
                        }

                        return Ok(studentData);

                    }
                    else
                    {
                        return BadRequest("Failed to fetch student data.");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(500, "Internal server error");
            }
        }

    }
}
