namespace Info_Invest.Model.ModelDb
{
    public class TransicaoModel
    {
        public int Id_Transicao { get; set; }
        public float Nr_Valor { get; set; }
        public int Fk_Carteira_Id { get; set; }
        public int Fk_Ativo_Id { get; set; }

    }
}
