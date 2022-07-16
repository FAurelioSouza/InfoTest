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
using Info_Invest.Model.ModelRetorno;

namespace Info_Invest.Repository
{
    public class UsuarioRepository
    {
        private string connstring = new Conexao().con;

        public UsuarioRetorno CadastroUsuario(UsuarioModel model)
        {
            try
            {
                string query = @"Insert into Tb_Usuario(Cl_Senha, Cl_Login, Nm_Usuario, Dt_Nascimento, Fk_Perfil_Id)
                                             values(@Cl_Senha, @Cl_Login, @Nm_Usuario, @Dt_Nascimento, @Fk_Perfil_Id);";

                if (model.Fk_Perfil_Id == 3)
                {
                    query += @"Insert into Tb_Carteira(Fk_Usuario_Id)
                                           values((select Id_Usuario from Tb_Usuario where Id_Usuario = IDENT_CURRENT('Tb_Usuario')));";
                }

                query += @"select * from Tb_Usuario where Id_Usuario = IDENT_CURRENT('Tb_Usuario');";

                using (var sqlConnection = new SqlConnection(connstring))
                {
                    var retorno = sqlConnection.Query<UsuarioRetorno>(query, model);
                    return retorno.FirstOrDefault();
                }

            }
            catch(Exception ex)
            {
                throw;
            }
        }

        public List<UsuarioRetorno> GetUsuario(int perfil)
        {
            try
            {
                string query = @"select * 
                                from Tb_Usuario
                                where Fk_Perfil_Id = @PERFIL";

                using (var sqlConnection = new SqlConnection(connstring))
                {
                    var retorno = sqlConnection.Query<UsuarioRetorno>(query, new { PERFIL = perfil });
                    return retorno.ToList();
                }
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        public UsuarioUpdate UpdateUsuario(UsuarioUpdate model)
        {
            try
            {
                string query = @"Update Tb_Usuario
                                 Set Cl_Senha = @Cl_Senha, Cl_Login = @Cl_Login, Nm_Usuario = @Nm_Usuario, Dt_Nascimento = @Dt_Nascimento
                                 Where Id_Usuario = @Id_Usuario;

                                 select * from Tb_Usuario
                                 where Id_Usuario = @Id_Usuario ";

                using (var sqlConnection = new SqlConnection(connstring))
                {
                    var retorno = sqlConnection.Query<UsuarioUpdate>(query, model);
                    return retorno.FirstOrDefault();
                }

            }
            catch (Exception ex)
            {
                throw;
            }
        }


    }
}
