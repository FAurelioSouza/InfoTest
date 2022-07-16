using System.ComponentModel.DataAnnotations;
namespace Info_Invest.Model.ModelDb
{
    public class UsuarioModel
    {
        public int Id_Usuario { get; set; }
        [Required(ErrorMessage = "A senha é obrigatório.")]
        public string Cl_Senha { get; set; }

        [Required(ErrorMessage = "O login é obrigatório.")]
        public string Cl_Login { get; set; }

        [Required(ErrorMessage = "Nome do usuario é obrigatório.")]
        public string Nm_Usuario { get; set; }

        [Required(ErrorMessage = "Data de nascimento é obrigatório.")]
        public DateTime Dt_Nascimento { get; set; }

        public int Fk_Perfil_Id { get; set; }
    }
}
