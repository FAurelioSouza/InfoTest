console.log("script funfou");

$("#btnLogar").click(function() {
    var login = $("#txtLogin").val();
    var senha = $("#txtSenha").val();

    if(login == "" || senha == ""){
        new Notify ({
            title: 'Erro',
            text: 'Preencha todos os campos',
            status: 'error',
            autotimeout: 3000,
            autoclose: true,
            showCloseButton: false,
        })
        return;
    }

    var settings = {
        "url": "https://localhost:7037/Login?login=" + login + "&senha=" + senha,
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
          }
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        if(response.result == "Sucesso"){
            new Notify ({
                title: 'Sucesso',
                text: response.message.nome,
                status: 'success',
                autotimeout: 3000,
                autoclose: true,
                showCloseButton: false,
            });
            
            if(response.message.perfil == 1){
                window.location.href = "../../areas/Admin/index.html?token=" + response.message.token;
            }
            else if(response.message.perfil == 2){
                window.location.href = "../../areas/Gerente/index.html?token=" + response.message.token;
            }
            else if(response.message.perfil == 3){
                window.location.href = "../../areas/Cliente/index.html?token=" + response.message.token;
            }
            else{
                new Notify ({
                    title: 'Erro',
                    text: 'Reportar Erro.',
                    status: 'error',
                    autotimeout: 3000,
                    autoclose: true,
                    showCloseButton: false,
                })
            }

            
        }
        else if(response.result == "Error"){
            new Notify ({
                title: 'Erro',
                text: response.message,
                status: 'error',
                autotimeout: 3000,
                autoclose: true,
                showCloseButton: false,
            })
        }
        
      });

    
});