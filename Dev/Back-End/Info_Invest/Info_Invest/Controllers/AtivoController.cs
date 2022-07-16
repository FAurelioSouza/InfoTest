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
    public class AtivoController: ControllerBase
    {
        private protected AtivoRepository repo = new AtivoRepository();

        [HttpPost]
        public IActionResult CreateAtivo([FromQuery] string token, AtivoModel newAtivo)
        {
            try
            {
                Sessao sessao = new Token().Verifica(token);
                if (sessao.TimeOut < DateTime.Now)
                    return Unauthorized(new { Result = "Error", Message = "TimeOut" });
                else if(sessao.Perfil != 1)
                    return Unauthorized(new { Result = "Error", Message = "Acesso Negado" });

                AtivoModel result = repo.CadastrarAtivo(newAtivo);

                return Ok(result);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public IActionResult GetAtivo([FromQuery] string token)
        {
            try
            {
                List<AtivoRetorno> result = new List<AtivoRetorno>();
                Sessao sessao = new Token().Verifica(token);
                if (sessao.TimeOut < DateTime.Now)
                    return Ok(new { Result = "Error", Message = "TimeOut" });
                result = repo.GetAtivo();

                return Ok(result);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{grupo}")]
        public IActionResult GetAtivo(int grupo, [FromQuery] string token)
        {
            try
            {
                Sessao sessao = new Token().Verifica(token);
                if (sessao.TimeOut < DateTime.Now)
                    return Unauthorized(new { Result = "Error", Message = "TimeOut" });
                else if (sessao.Perfil != 1)
                    return Unauthorized(new { Result = "Error", Message = "Acesso Negado" });

                if (grupo == -1)
                {
                    List<string> resultGrupo = repo.ListaGrupo();
                    return Ok(resultGrupo);
                }

                List<AtivoRetorno> result = repo.GetAtivo(grupo);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
