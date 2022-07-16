using Info_Invest.Model;
using Info_Invest.Repository;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Info_Invest.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController: ControllerBase
    {
        private LoginRepository repo = new LoginRepository();

        [HttpPost]
        public IActionResult LogarUsuario([FromQuery] string login, string senha)
        {
            try
            {
                Object resultado = repo.loginUsuario(login, senha);

                if (resultado != null)
                {
                    return Ok(new { Result = "Sucesso", Message = resultado });
                }
                return Ok(new { Result = "Error", Message = "Acesso Negado"});
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public IActionResult verifica([FromQuery] string token)
        {
            Sessao resultado = new Token().Verifica(token);

            return Ok(resultado);
        }
    }
}
