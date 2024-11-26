using System.ComponentModel.DataAnnotations;

namespace LogInSingUpWebApp.Models
{
    public class Login
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
