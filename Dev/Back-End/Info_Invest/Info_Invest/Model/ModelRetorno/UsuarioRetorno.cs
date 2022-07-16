namespace Info_Invest.Model.ModelRetorno
{
    public class UsuarioRetorno
    {
        public int Id_Usuario { get; set; }
        public string Nm_Usuario { get; set; }
        private DateTime Dt_Nascimento { get; set; }
        public int Idade { get { return DateTime.Now.Year - Dt_Nascimento.Year; } }
    }
}
