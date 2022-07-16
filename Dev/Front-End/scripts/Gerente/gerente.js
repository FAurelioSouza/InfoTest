console.log("Carregou script");


function Clientes(){
      var contador = 0;
      var settings = {
          "url": "https://localhost:7037/Cliente?token=" + tokenAcess,
          "method": "GET",
          "timeout": 0,
        };
  
        
        $("#content-table").html(`
                      
        <div style="justify-content: center; display: grid; padding-top: 5%">
            <div style="padding-bottom: 5%">
            <button id="btnCliente" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal">
                Cadastar Cliente
            </button>
            </div>
            <div style="justify-content: center; display: flex; width: 1000px;">
                <table class="table content__list">
                   <thead>
                      <tr>
                      <th scope="col">Nome</th>
                      <th scope="col">Idade</th>
                      <th scope="col">Saldo</th>
                   </tr>
                  </thead>
                  <tbody id="tablebody">
  
                 </tbody>
               </table>
             </div>
        </div>
        `);
  
        $.ajax(settings).done(function (response) {
          //console.log(response); 
          if(response.result == "Error" && response.message == "TimeOut"){
            console.log(response);
            window.location.href = "../../areas/Login/index.html";
          }
  
          for(var cliente in response){
              contador++;
          }
          //console.log(contador);
          for(var i = 0; i < contador; i++){
              $("#tablebody").append(`
                  <tr>
                    <th scope="row">` + response[i].nm_Usuario + `</th>
                    <td>` + response[i].idade + `</td>
                    <td>` + response[i].saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + `</td>
                  </tr>
              `);
          }
        });
}
  

$(document).on("click", "#btnCliente", function() {
    $("#modalTitle").text("Cadastro de Cliente");

    $("#modalBody").html(`
      <div class="mb-3">
          <label class="form-label">Login</label>
          <input type="text" class="form-control" id="login" aria-describedby="login">
      </div>
      <div class="mb-3">
          <label class="form-label">Password</label>
          <input type="password" class="form-control" id="senha">
      </div>
      <div class="mb-3">
          <label class="form-label">Nome</label>
          <input type="text" class="form-control" id="nome" aria-describedby="nome">
      </div>
      <div class="mb-3">
          <label class="form-label">Data de Nascimento</label>
          <input type="datetime" class="form-control" id="dt_Nascimento" aria-describedby="data">
      </div>
    `);

    $("#modalFooter").html(`
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
      <button id="btnSalvarCliente" type="button" class="btn btn-primary">Salvar</button>
    `);
    $("#dt_Nascimento").keyup(function() {
      return;
    });
    $("#dt_Nascimento").datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'],
        dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
        dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
        monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
        monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
        yearRange: "1950:2022"
    });
    
});

$(document).on("click", "#btnSalvarCliente", function() {
    var nome = $("#nome").val();
    var login = $("#login").val();
    var senha = $("#senha").val();
    var data = $("#dt_Nascimento").val() + "T00:00:00";
    var retornoErro = "";

    if($("#login").val() == "" || login.length < 5 ){
      retornoErro += "login minimo 5 caractere.<br>"
    }
    if($("#senha").val() == "" || senha.length < 8 ){
      retornoErro += "senha minimo 8 caractere.<br>"
    }
    if($("#nome").val() == "" || senha.length < 3){
      retornoErro += "nome minimo 3 caractere.<br>"
    }
    if($("#dt_Nascimento").val() == ""){
      retornoErro += "Preencha o campo Data Nascimento.<br>"
    }

    if($("#login").val() == "" || 
        login.length < 5 || 
        $("#senha").val() == "" || 
        senha.length < 8 || 
        $("#nome").val() == "" || 
        senha.length < 3 || 
        $("#dt_Nascimento").val() == "")
        {
          new Notify ({
              title: 'Atenção',
              text: retornoErro,
              status: 'warning',
              autotimeout: 3000,
              autoclose: true,
              showCloseButton: false,
          })
          return;
        }
        RequestCadastroCliente(nome, senha, login, data);
        
});

function RequestCadastroCliente(nome, senha, login, data){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "Cl_Senha": senha,
      "Cl_Login": login,
      "Nm_Usuario": nome,
      "Dt_Nascimento": data,
      "Fk_Perfil_Id": "3"
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://localhost:7037/Usuario?token=" + tokenAcess, requestOptions)
      .then(function() {
              new Notify ({
                title: 'Sucesso',
                text: "Gerente Cadastrado com sucesso!",
                status: 'success',
                autotimeout: 3000,
                autoclose: true,
                showCloseButton: false,
            })
            Clientes();
            $('#modal').modal('toggle');
      })
      .catch(error => console.log('error', error));
      
}
