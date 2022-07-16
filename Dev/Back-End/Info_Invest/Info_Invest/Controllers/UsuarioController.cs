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
    public class UsuarioController: ControllerBase
    {
        private protected UsuarioRepository repo = new UsuarioRepository();

        [HttpPost]
        public IActionResult CreateUsuario([FromQuery] string token, [FromBody] UsuarioModel newUser)
        {
            try
            {
                Sessao sessao = new Token().Verifica(token);
                if (sessao.TimeOut < DateTime.Now)
                    return Ok(new { Result = "Error", Message = "TimeOut" });
                else if(sessao.Perfil == 3)
                    return Unauthorized(new { Result = "Error", Message = "Acesso Negado" });
                else if (sessao.Perfil == 2 && newUser.Fk_Perfil_Id == 1)
                    return Unauthorized(new { Result = "Error", Message = "Acesso Negado" });


                UsuarioRetorno result = repo.CadastroUsuario(newUser);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public IActionResult GetUsuario([FromQuery] string token)
        {
            try
            {
                Sessao sessao = new Token().Verifica(token);
                if (sessao.TimeOut < DateTime.Now)
                    return Ok(new { Result = "Error", Message = "TimeOut" });
                else if (sessao.Perfil == 3)
                    return Unauthorized(new { Result = "Error", Message = "Acesso Negado" });

                List<UsuarioRetorno> result = repo.GetUsuario(sessao.Perfil == 1 ? 2 : 3);

                return Ok(result);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public IActionResult UpdateUsuario([FromQuery] string token, [FromBody] UsuarioUpdate UpdateUser)
        {
            try
            {
                Sessao sessao = new Token().Verifica(token);
                if (sessao.TimeOut < DateTime.Now)
                    return Unauthorized(new { Result = "Error", Message = "TimeOut" });
                else if(sessao.Id != UpdateUser.Id_Usuario)
                    return Unauthorized(new { Result = "Error", Message = "Acesso Negado" });



                UsuarioUpdate result = repo.UpdateUsuario(UpdateUser);
                return Ok(result);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
