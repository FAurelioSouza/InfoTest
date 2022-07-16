using Info_Invest.Model;
using Info_Invest.Model.ModelDb;
using Info_Invest.Model.ModelRetorno;
using Info_Invest.Repository;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Info_Invest.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClienteController: ControllerBase
    {
        private protected ClienteRepository repo = new ClienteRepository();

        [HttpGet]
        public IActionResult GetCliente([FromQuery] string token)
        {
            List<ClienteRetorno> result = new List<ClienteRetorno>();
            try
            {
                Sessao sessao = new Token().Verifica(token);
                if (sessao.TimeOut < DateTime.Now)
                    return Ok(new { Result = "Error", Message = "TimeOut" });
                else if (sessao.Perfil == 3)
                {
                    result = repo.RetornaCLiente(sessao.Id);
                }
                else
                {
                    result = repo.RetornaCLiente();
                }

                return Ok(result);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{Id}")]
        public IActionResult GetCliente(int Id, [FromQuery] string token)
        {
            try
            {
                Sessao sessao = new Token().Verifica(token);
                if (sessao.TimeOut < DateTime.Now)
                    return Unauthorized(new { Result = "Error", Message = "TimeOut" });
                else if (sessao.Perfil == 3)
                    return Unauthorized(new { Result = "Error", Message = "Acesso Negado" });

                List<ClienteRetorno> result = repo.RetornaCLiente(Id);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
