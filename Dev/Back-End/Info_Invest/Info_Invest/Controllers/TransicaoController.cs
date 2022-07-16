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
    public class TransicaoController: ControllerBase
    {
        private protected TransicaoRepository repo = new TransicaoRepository();

        [HttpPost]
        public IActionResult CreateTransicao([FromQuery] string token, [FromBody] TransicaoModel newTransicao)
        {
            try
            {
                Sessao sessao = new Token().Verifica(token);
                newTransicao.Fk_Carteira_Id = repo.Carteira(sessao.Id);
                TransicaoRetorno result = repo.CadastroTransicao(newTransicao);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public IActionResult UpdateTransicao([FromQuery] string token, [FromBody] TransicaoUpdate UpdateTransicao)
        {
            Boolean existeAtivo;

            try
            {
                Sessao sessao = new Token().Verifica(token);

                existeAtivo = repo.VerificaAtivo(UpdateTransicao.Id_Transicao);

                if (existeAtivo == true)
                {
                    TransicaoRetorno result = repo.UpdateTransicao(UpdateTransicao);

                    return Ok(result);
                }
                return NoContent();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet]
        public IActionResult GetTransicao([FromQuery] string token)
        {
            try
            {
                Sessao sessao = new Token().Verifica(token);
                List<TransicaoRetorno> result = repo.GetTransicao(sessao.Id);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
