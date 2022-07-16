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
    public class TransicaoRepository
    {
        private string connstring = new Conexao().con;

        public TransicaoRetorno CadastroTransicao(TransicaoModel model)
        {
            try
            {
                string query = @"Insert into Tb_Transicao(Nr_Valor, Fk_Carteira_Id, Fk_Ativo_Id)
                                             values(@Nr_Valor, @Fk_Carteira_Id, @Fk_Ativo_Id);

                                 select t.Id_Transicao, g.Nm_Grupo, a.Nm_Ativo, t.Nr_Valor 
                                 from Tb_Transicao as t
                                 inner join Tb_Ativo as a on (t.Fk_Ativo_Id = a.Id_Ativo)
                                 inner join Tb_Grupo_Ativo as g on (g.Id_Grupo = a.Fk_Grupo_Id)
                                 where t.Id_Transicao = IDENT_CURRENT('Tb_Transicao');";

                using (var sqlConnection = new SqlConnection(connstring))
                {
                    var retorno = sqlConnection.Query<TransicaoRetorno>(query, model);
                    return retorno.FirstOrDefault();
                }

            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public Boolean VerificaAtivo(int id_transacao)
        {
            try
            {
                int aux;

                string query = @"select * from Tb_Transicao where Id_Transicao = @ID";

                using (var sqlConnection = new SqlConnection(connstring))
                {
                    var retorno = sqlConnection.Query<int>(query, new { ID = id_transacao });
                    aux = retorno.Count();
                }

                if (aux >= 1)
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public TransicaoRetorno UpdateTransicao(TransicaoUpdate model)
        {
            try
            {
                string query = "";

                if (model.compra_venda == true)
                {
                    query += @"update Tb_Transicao
                                 set Nr_Valor = ((select Nr_Valor from Tb_Transicao
                                                  where Id_Transicao = @Id_Transicao) + @Nr_Valor)
                               where Id_Transicao = @Id_Transicao;";
                }
                else
                {
                    query += @"update Tb_Transicao
                                 set Nr_Valor = ((select Nr_Valor from Tb_Transicao
                                                  where Id_Transicao = @Id_Transicao) - @Nr_Valor)
                               where Id_Transicao = @Id_Transicao;";
                }

                query += @"select t.Id_Transicao, g.Nm_Grupo, a.Nm_Ativo, t.Nr_Valor 
                           from Tb_Transicao as t
                           inner join Tb_Ativo as a on (t.Fk_Ativo_Id = a.Id_Ativo)
                           inner join Tb_Grupo_Ativo as g on (g.Id_Grupo = a.Fk_Grupo_Id)
                           where t.Id_Transicao = @Id_Transicao;";

                using(var sqlConnection = new SqlConnection(connstring))
                {
                    var retorno = sqlConnection.Query<TransicaoRetorno>(query, model);
                    return retorno.FirstOrDefault(); 
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public List<TransicaoRetorno> GetTransicao(int IdCliente)
        {
            try
            {
                string query = @"select t.Id_Transicao, g.Nm_Grupo, a.Nm_Ativo, t.Nr_Valor 
                                 from Tb_Transicao as t
                                 inner join Tb_Ativo as a on (t.Fk_Ativo_Id = a.Id_Ativo)
                                 inner join Tb_Grupo_Ativo as g on (g.Id_Grupo = a.Fk_Grupo_Id)
                                 inner join Tb_Carteira as c on (c.Id_Carteira = t.Fk_Carteira_Id)
                                 where c.Fk_Usuario_Id = @ID";

                using (var sqlConneciton = new SqlConnection(connstring))
                {
                    var retorno = sqlConneciton.Query<TransicaoRetorno>(query, new { ID = IdCliente });
                    return retorno.ToList();
                }
            }
            catch(Exception ex)
            {
                throw;
            }
        }


        public int Carteira(int id_usuario)
        {
            try
            {
                string query = @"select * from Tb_Carteira
                                 where Fk_Usuario_Id = @ID";

                using (var sqlConneciton = new SqlConnection(connstring))
                {
                    var retorno = sqlConneciton.Query<int>(query, new { ID = id_usuario });
                    return retorno.First();
                }
            }
            catch(Exception ex)
            {
                throw;
            }
        }
    }
}
