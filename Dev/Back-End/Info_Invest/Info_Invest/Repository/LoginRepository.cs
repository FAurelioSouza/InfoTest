using Info_Invest.Model;
using Newtonsoft.Json;
using System.Data;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;
using Dapper;
using Info_Invest.Model.ModelDb;
using System.Security.Claims;
using JWT.Builder;
using JWT.Algorithms;

namespace Info_Invest.Repository
{
    public class LoginRepository
    {
        private string connstring = new Conexao().con;

        public Object loginUsuario(string login, string senha)
        {
            Object result = new Object();

            try
            {
                string query = @"select * from tb_usuario where Cl_login = @Cl_login and Cl_Senha = @Cl_Senha";

                using (var sqlConnection = new SqlConnection(connstring))
                {
                    var retorno = sqlConnection.Query<UsuarioModel>(query, new { Cl_login = login, Cl_Senha = senha });

                    if (retorno.FirstOrDefault() != null)
                    {
                        var token = JwtBuilder.Create()
                        .WithAlgorithm(new HMACSHA256Algorithm()) // symmetric
                        .WithSecret("kf85jgkt0t84jdfmffj3484954905j")
                        .AddClaim("Id", retorno.First().Id_Usuario.ToString())
                        .AddClaim("Perfil", retorno.First().Fk_Perfil_Id.ToString())
                        .AddClaim("Nome", retorno.First().Nm_Usuario.ToString())
                        .AddClaim("TimeOut", DateTime.Now.AddHours(1))
                        .Encode();

                        result = new { Perfil = retorno.First().Fk_Perfil_Id,
                                       Nome = retorno.First().Nm_Usuario,
                                       Token = token 
                                     };

                        return result;
                    }

                }
                return null;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

    }
}
