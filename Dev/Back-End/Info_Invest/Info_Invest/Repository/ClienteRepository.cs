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
    public class ClienteRepository
    {
        private string connstring = new Conexao().con;

        public List<ClienteRetorno> RetornaCLiente(int? Cliente_Id = null)
        {
            try
            {
                string query = @"select u.Id_Usuario, u.Nm_Usuario,u.Dt_Nascimento,
                                (select ISNULL(sum(Nr_Valor), 0.00)
                                 from Tb_Transicao
                                 where Fk_Carteira_Id = c.Id_Carteira) as Saldo
                                 from Tb_Carteira as c
                                 inner join Tb_Usuario as u on (c.Fk_Usuario_Id = u.Id_Usuario)";
                if (Cliente_Id != null)
                {
                    query += " where c.Fk_Usuario_Id = @ID_CLIENTE";
                }

                using (var sqlConnection = new SqlConnection(connstring))
                {
                    var retorno = sqlConnection.Query<ClienteRetorno>(query, new { ID_CLIENTE = Cliente_Id });
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
