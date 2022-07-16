using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace Info_Invest.Model.ModelRetorno
{
    public class AtivoRetorno
    {
        public int Id_Ativo { get; set; }
        public string Nm_Ativo { get; set; }
        public int Fk_Grupo_Id { get; set; }
        public string Nm_Grupo { get; set; }
    }
}
