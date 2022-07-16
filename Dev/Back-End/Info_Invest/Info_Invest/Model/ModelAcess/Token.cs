using JWT.Algorithms;
using JWT.Builder;
using Newtonsoft.Json;

namespace Info_Invest.Model
{
    public class Token
    {
        private protected const string secret = "kf85jgkt0t84jdfmffj3484954905j";
        public Sessao Verifica(string token)
        {
            var json = JwtBuilder.Create()
                        .WithAlgorithm(new HMACSHA256Algorithm())
                        .WithSecret(secret)
                        .MustVerifySignature()
                        .Decode(token);


            Sessao sessao = (Sessao)JsonConvert.DeserializeObject<Sessao>(json);

            return sessao;
        }

        
    }
}
