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
    public class AtivoRepository
    {
        private string connstring = new Conexao().con;

        public AtivoModel CadastrarAtivo(AtivoModel model)
        {
            try
            {
                string query = @"Insert into Tb_Ativo(Nm_Ativo, Fk_Grupo_Id)values(@Nm_Ativo, @Fk_Grupo_Id)
                                 select * from Tb_Ativo where Id_Ativo = IDENT_CURRENT('Tb_Ativo');";

                using (var sqlConnection = new SqlConnection(connstring))
                {
                    var retorno = sqlConnection.Query<AtivoModel>(query, model);
                    return retorno.FirstOrDefault(); ;
                }

                    return new AtivoModel();
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public List<AtivoRetorno> GetAtivo(int? Grupo = null, int? usuario = null)
        {
            try
            {
                //string query = @"Select * from Tb_Ativo where Fk_Grupo_Id = ISNULL(@GRUPO, 0)";
                string query;

                if (usuario != null)
                {
                    query = @"Select g.Nm_Grupo, a.* 
                              from Tb_Ativo as a
                              inner join Tb_Grupo_Ativo as g on (a.Fk_Grupo_Id = g.Id_Grupo)
                              left join Tb_Transicao as t on (t.Fk_Ativo_Id = a.Id_Ativo)
                              inner join Tb_Carteira as c on (c.Id_Carteira = t.Fk_Carteira_Id)
                              where c.Fk_Usuario_Id = @ID";
                }
                else
                {
                    if (Grupo == null)
                        query = @"Select g.Nm_Grupo, a.* 
                              from Tb_Ativo as a
                              inner join Tb_Grupo_Ativo as g on (a.Fk_Grupo_Id = g.Id_Grupo)";
                    else
                        query = @"Select g.Nm_Grupo, a.* 
                              from Tb_Ativo as a
                              inner join Tb_Grupo_Ativo as g on (a.Fk_Grupo_Id = g.Id_Grupo)
                              where a.Fk_Grupo_Id = @GRUPO";
                }


                using (var sqlConnection = new SqlConnection(connstring))
                {
                    var retorno = sqlConnection.Query<AtivoRetorno>(query, new { GRUPO = Grupo, ID = usuario });
                    return retorno.ToList();
                }
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        public List<string> ListaGrupo()
        {
            try
            {
                string query = @"select Nm_Grupo from Tb_Grupo_Ativo";

                using (var sqlConnection = new SqlConnection(connstring))
                {
                    var retorno = sqlConnection.Query<string>(query);
                    return retorno.ToList();
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
