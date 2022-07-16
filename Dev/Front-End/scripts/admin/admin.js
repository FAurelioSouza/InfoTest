function menu(){
    $("#content-body").html(`<div class="content__pai_inicial">
                                 <div class="box__options" id="Gerente" style="padding-right: 15px;">
                                     Gerentes
                                 </div>
                                 <div class="box__options" id="Ativos">
                                     Ativos
                                 </div>
                             </div>`);;
}

$(document).on("click", "#Gerente", function() {
  Gerentes();
});

$(document).on("click", "#Ativos", function() {
  Ativos();
});

function Gerentes(){
  $("#content-body").html("");
    var contador = 0;
    var settings = {
        "url": "https://localhost:7037/Usuario?token=" + tokenAcess,
        "method": "GET",
        "timeout": 0,
      };

      
      $("#content-body").append(`
                    
      <div style="justify-content: center; display: grid; padding-top: 5%">
          <div style="padding-bottom: 5%">
          <button id="btnGerente" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal">
              Cadastar Gerente
          </button>
          </div>
          <div style="justify-content: center; display: flex; width: 1000px;">
              <table class="table content__list">
                 <thead>
                    <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Idade</th>
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

        for(var gerentes in response){
            //console.log(gerentes);
            contador++;
        }
        //console.log(contador);
        for(var i = 0; i < contador; i++){
            $("#tablebody").append(`
                <tr>
                  <th scope="row">` + response[i].id_Usuario + `</th>
                  <td>` + response[i].nm_Usuario + `</td>
                  <td>` + response[i].idade + `</td>
                </tr>
            `);
        }
      });
}

function Ativos(){
  $("#content-body").html("");
    $("#content-body").append(`
      <div style="justify-content: center; display: grid; padding-top: 5%">
          <div style="padding-bottom: 5%">
          <button id="btnAtivo" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal">
              Cadastrar Ativo
          </button>
          </div>
          <table class="table content__list" style="width: 600px;">
              <thead>
                <tr>
                  <th scope="col">Ativo</th>
                  <th scope="col">Grupo</th>
                </tr>
              </thead>
              <tbody id="tablebody">

              </tbody>
            </table>
      </div>
    `);
    var contador = 0;
    var settings = {
      "url": "https://localhost:7037/Ativo?token=" + tokenAcess,
      "method": "GET",
      "timeout": 0,
    };
    
    $.ajax(settings).done(function (response) {
      if(response.result == "Error" && response.message == "TimeOut"){
        console.log(response);
        window.location.href = "../../areas/Login/index.html";
      }
      console.log(response);

      for(var ativos in response){
        //console.log(gerentes);
        contador++;
    }
    //console.log(contador);
    for(var i = 0; i < contador; i++){
      array.push(response[i].nm_Grupo);
        $("#tablebody").append(`
            <tr>
              <td>` + response[i].nm_Ativo + `</td>
              <td>` + response[i].nm_Grupo + `</td>
            </tr>
        `);
    }
    });

}

$(document).on("click", "#btnAtivo", function() {
    $("#modalTitle").text("Cadastro de Ativo");

    $("#modalBody").html(`
        <div class="mb-3">
            <label class="form-label">Nome</label>
            <input type="text" class="form-control" id="nmAtivo" aria-describedby="nmAtivo">
        </div>
        <div class="mb-3">
            <select id="grupinho" class="form-select" aria-label="Grupo">
              <option value="1">Renda Fixa</option>
              <option value="2">Renda Variável</option>
              <option value="3">Fundos</option>
              <option value="4">Ações</option>
              <option value="5">Tesouro Direto</option>
              <option value="6">Poupança</option>
              <option value="7">Criptomoeda</option>
            </select>
        </div>
    
    `);

    $("#modalFooter").html(`
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
        <button id="btnSalvarAtivo" type="button" class="btn btn-primary">Salvar</button>
    `);
});

$(document).on("click", "#btnSalvarAtivo", function() {
    var nomeAtivo = $("#nmAtivo").val();
    var grupo = $("#grupinho").val();

    if($("#nmAtivo").val() == "" || nomeAtivo.length < 3){
          new Notify ({
              title: 'Atenção',
              text: 'Nome do Ativo deve ter no minimo 3 caractere.<br>',
              status: 'warning',
              autotimeout: 3000,
              autoclose: true,
              showCloseButton: false,
          })
          return;
      }
      RequestCadastroAtivo(nomeAtivo, grupo);
});

$(document).on("click", "#btnGerente", function() {
    $("#modalTitle").text("Cadastro de Gerente");

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
      <button id="btnSalvar" type="button" class="btn btn-primary">Salvar</button>
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

$(document).on("click", "#btnSalvar",  function() {
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
        RequestCadastroGerente(nome, senha, login, data);
        
});

function RequestCadastroGerente(nome, senha, login, data){
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "Cl_Senha": senha,
    "Cl_Login": login,
    "Nm_Usuario": nome,
    "Dt_Nascimento": data,
    "Fk_Perfil_Id": "2"
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
          Gerentes();
          $('#modal').modal('toggle');
    })
    .catch(error => console.log('error', error));
    
}

function RequestCadastroAtivo(nome, grupo){
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "Nm_Ativo": nome,
    "Fk_Grupo_Id": grupo
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch("https://localhost:7037/Ativo?token=" + tokenAcess, requestOptions)
    .then(function() {
        new Notify ({
          title: 'Sucesso',
          text: "Ativo Cadastrado com sucesso!",
          status: 'success',
          autotimeout: 3000,
          autoclose: true,
          showCloseButton: false,
      })
      Ativos();
      $('#modal').modal('toggle');
    })
    .catch(error => console.log('error', error));
}
