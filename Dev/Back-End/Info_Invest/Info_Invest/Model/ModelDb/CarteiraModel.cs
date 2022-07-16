namespace Info_Invest.Model.ModelDb
{
    public class CarteiraModel
    {
        public int Id_Carteira { get; set; }
        public int Fk_Usuario_id { get; set; }
        public UsuarioModel Usuario { get; set; }
    }
}
