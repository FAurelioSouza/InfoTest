namespace Info_Invest.Model.ModelRetorno
{
    public class ClienteRetorno
    {
        public int Id_Usuario { get; set; }
        public string Nm_Usuario { get; set; }
        private DateTime Dt_Nascimento { get; set; }
        public int Idade { get { return DateTime.Now.Year - Dt_Nascimento.Year; } }
        public float Saldo { get; set; }

    }
}
