console.log("Carregou script");
var grupos = [];
var ativos = [];

function InfoCliente(){
    var contador = 0;
    var settings = {
        "url": "https://localhost:7037/Cliente?token=" + tokenAcess,
        "method": "GET",
        "timeout": 0,
      };

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
            $("#titleName").html(response[i].nm_Usuario + ", " + response[i].idade);
            $("#saldo").html(response[i].saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
        }
      });
}

function ativosComprados(){
    grupos = [];
    var g1, g2, g3, g4, g5, g6, g7;

    var settings = {
        "url": "https://localhost:7037/Transicao?token=" + tokenAcess,
        "method": "GET",
        "timeout": 0,
      };

      $.ajax(settings).done(function (response) {
        console.log(response); 
        if(response.result == "Error" && response.message == "TimeOut"){
          console.log(response);
          window.location.href = "../../areas/Login/index.html";
        }

        for(var i = 0; i < response.length; i++){
            if(response[i].nm_Grupo == "Renda Fixa" || grupos.find(key => key.nm_Grupo == "Renda Fixa")){
                g1 = true;
            }
            if(response[i].nm_Grupo == "Renda Variável" || grupos.find(key => key.nm_Grupo == "Renda Variável")){
                g2 = true;
            }
            if(response[i].nm_Grupo == "Fundos" || grupos.find(key => key.nm_Grupo == "Fundos")){
                g3 = true;
            }
            if(response[i].nm_Grupo == "Ações" || grupos.find(key => key.nm_Grupo == "Ações")){
                g4 = true;
            }
            if(response[i].nm_Grupo == "Tesouro Direto" || grupos.find(key => key.nm_Grupo == "Tesouro Direto")){
                g5 = true;
            }
            if(response[i].nm_Grupo == "Poupança" || grupos.find(key => key.nm_Grupo == "Poupança")){
                g6 = true;
            }
            if(response[i].nm_Grupo == "Criptomoeda" || !grupos.find(key => key.nm_Grupo === "Criptomoeda")){
                g7 = true;
            }
            // + response[i].saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) +
        }

        if(g1 == true){
            grupos.push({ id: 1, value: "Renda Fixa" });
        }
        if(g2 == true){
            grupos.push({ id: 2, value: "Renda Variável" });
        }
        if(g3 == true){
            grupos.push({ id: 3, value: "Fundos" });
        }
        if(g4 == true){
            grupos.push({ id: 4, value: "Ações" });
        }
        if(g5 == true){
            grupos.push({ id: 5, value: "Tesouro Direto" });
        }
        if(g6 == true){
            grupos.push({ id: 6, value: "Poupança" });
        }
        if(g7 == true){
            grupos.push({ id: 7, value: "Criptomoeda" });
        }

        $("#content-table").html("");
        createTabelasAtivoComprados(grupos);
        popularGrupoAtivo(response);
      });
}

function createTabelasAtivoComprados(grupos){
    for(var i = 0; i < grupos.length; i++){
        $("#content-table").append(`
            <table id="tabelaGrupo" class="table content__list" style="width: 600px;">
              <thead>
                <tr>
                  <th scope="col" id="GrupoNome">` + grupos[i].value + `</th>
                </tr>
              </thead>
              <tbody id="` + grupos[i].id + `" class="table-group-divider">

              </tbody>
            </table>
        `);
    }
}

function popularGrupoAtivo(obj){
    for(var i = 0; i < obj.length; i++)
    {
        ativos.push({ id: obj[i].id_Ativo, nome: obj[i].nm_Ativo });
        if(obj[i].nm_Grupo == "Renda Fixa"){
            $("#" + 1).append(`
                <tr style="border-style: none !important;">
                  <td>` + obj[i].nm_Ativo + `</td>
                  <td>` + obj[i].nr_Valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + `</td>
                  <td class="item__td">
                    <button id="`+ obj[i].id_Transicao + `" data-nome="` + obj[i].nm_Ativo + `" data-valor="` + obj[i].nr_Valor + `" type="button" class="btn btn-primary classajuda" data-bs-toggle="modal" data-bs-target="#modal">
                        Compra/Venda
                    </button>
                  </td>
                </tr>
            `);
            // 
        }
        if(obj[i].nm_Grupo == "Renda Variável"){
            $("#" + 2).append(`
                <tr>
                  <td>` + obj[i].nm_Ativo + `</td>
                  <td>` + obj[i].nr_Valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + `</td>
                  <td class="item__td">
                    <button id="`+ obj[i].id_Transicao + `" data-nome="` + obj[i].nm_Ativo + `" data-valor="` + obj[i].nr_Valor + `" type="button" class="btn btn-primary classajuda" data-bs-toggle="modal" data-bs-target="#modal">
                        Compra/Venda
                    </button>
                  </td>
                </tr>
            `);
        }
        if(obj[i].nm_Grupo == "Fundos"){
            $("#" + 3).append(`
                <tr>
                  <td>` + obj[i].nm_Ativo + `</td>
                  <td>` + obj[i].nr_Valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + `</td>
                  <td class="item__td">
                    <button id="`+ obj[i].id_Transicao + `" data-nome="` + obj[i].nm_Ativo + `" data-valor="` + obj[i].nr_Valor + `" type="button" class="btn btn-primary classajuda" data-bs-toggle="modal" data-bs-target="#modal">
                        Compra/Venda
                    </button>
                  </td>
                </tr>
            `);
        }
        if(obj[i].nm_Grupo == "Ações"){
            $("#" + 4).append(`
                <tr>
                  <td>` + obj[i].nm_Ativo + `</td>
                  <td>` + obj[i].nr_Valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + `</td>
                  <td class="item__td">
                    <button id="`+ obj[i].id_Transicao + `" data-nome="` + obj[i].nm_Ativo + `" data-valor="` + obj[i].nr_Valor + `" type="button" class="btn btn-primary classajuda" data-bs-toggle="modal" data-bs-target="#modal">
                        Compra/Venda
                    </button>
                  </td>
                </tr>
            `);
        }
        if(obj[i].nm_Grupo == "Tesouro Direto"){
            $("#" + 5).append(`
                <tr>
                  <td>` + obj[i].nm_Ativo + `</td>
                  <td>` + obj[i].nr_Valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + `</td>
                  <td class="item__td">
                    <button id="`+ obj[i].id_Transicao + `" data-nome="` + obj[i].nm_Ativo + `" data-valor="` + obj[i].nr_Valor + `" type="button" class="btn btn-primary classajuda" data-bs-toggle="modal" data-bs-target="#modal">
                        Compra/Venda
                    </button>
                  </td>
                </tr>
            `);
        }
        if(obj[i].nm_Grupo == "Poupança"){
            $("#" + 6).append(`
                <tr>
                  <td>` + obj[i].nm_Ativo + `</td>
                  <td>` + obj[i].nr_Valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + `</td>
                  <td class="item__td">
                    <button id="`+ obj[i].id_Transicao + `" data-nome="` + obj[i].nm_Ativo + `" data-valor="` + obj[i].nr_Valor + `" type="button" class="btn btn-primary classajuda" data-bs-toggle="modal" data-bs-target="#modal">
                        Compra/Venda
                    </button>
                  </td>
                </tr>
            `);
        }
        if(obj[i].nm_Grupo == "Criptomoeda"){
            $("#" + 7).append(`
                <tr>
                  <td>` + obj[i].nm_Ativo + `</td>
                  <td>` + obj[i].nr_Valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + `</td>
                  <td class="item__td">
                    <button id="`+ obj[i].id_Transicao + `" data-nome="` + obj[i].nm_Ativo + `" data-valor="` + obj[i].nr_Valor + `" type="button" class="btn btn-primary classajuda" data-bs-toggle="modal" data-bs-target="#modal">
                        Compra/Venda
                    </button>
                  </td>
                </tr>
            `);
        }
    }
}

$(document).on("click", ".classajuda", function(e) {
    var nome = $(this).attr("data-nome");
    $("#modalTitle").text("Atualizar Transição " + nome);

    $("#modalBody").html(`
        <div class="mb-3">
            <label class="form-label">Valor R$</label>
            <input type="text" class="form-control" id="valorzinho" aria-describedby="valorzinho">
        </div>
        <div class="mb-3">
            <label class="form-label">Tipo da Operação</label>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="radiosTrue" id="radiosTrue" value="true" checked>
              <label class="form-check-label" for="exampleRadios1">
                Comprar
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="radiosTrue" id="radiosFalse" value="false">
              <label class="form-check-label" for="exampleRadios2">
                Vender
              </label>
            </div>
        </div>
    
    `);

    $("#modalFooter").html(`
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
        <button id="btnUpdate" data-transacao="` + $(this).attr("id") + `" data-valor="` + $(this).attr("data-valor") + `"  type="button" class="btn btn-primary">Salvar</button>
    `);
    $("#valorzinho").maskMoney();

});

$(document).on("click", "#btnTransicao", function() {
    $("#modalTitle").text("Nova Transição");

    $("#modalBody").html(`
        <div class="mb-3">
            <label class="form-label">Valor R$</label>
            <input type="text" class="form-control" id="valorCompra" aria-describedby="valorCompra">
        </div>
        <div class="mb-3">
            <label class="form-label">Investimento</label>
            <select id="grupinho" class="form-select" aria-label="Grupo">
            </select>
        </div>
    
    `);

    $("#modalFooter").html(`
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
        <button id="btnSalvarAtivo" type="button" class="btn btn-primary">Salvar</button>
    `);

    
    $('#valorCompra').maskMoney();
    var settings = {
        "url": "https://localhost:7037/Ativo?token=" + tokenAcess,
        "method": "GET",
        "timeout": 0,
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        if(response.result == "Error" && response.message == "TimeOut"){
            window.location.href = "../../areas/Login/index.html";
        }

        for(var i = 0; i < response.length; i++){
            var add = true;
            for(var x = 0; x < ativos.length; x++){
                if(ativos[x].nome == response[i].nm_Ativo){
                    add = false
                }
            }    
            if(add == true){
                $("#grupinho").append(`<option value="` + response[i].id_Ativo + `">
                                             ` + response[i].nm_Ativo + ` / ` + response[i].nm_Grupo + `
                                        </option>`);
            }     
        }
      });
});

$(document).on("click", "#btnSalvarAtivo", function() {
    var valor = $("#valorCompra").val();
    var grupo = $("#grupinho").val();

    if($("#valorCompra").val() == "" || valor.length < 1){
          new Notify ({
              title: 'Atenção',
              text: 'Coloque um valor valido.<br>',
              status: 'warning',
              autotimeout: 3000,
              autoclose: true,
              showCloseButton: false,
          })
          return;
      }
      RequestCadastroNovoInvestimento(valor, grupo);
});

$(document).on("click", "#btnUpdate", function() {
    var valor = $(this).attr("data-valor");
    var id = $(this).attr("data-transacao");
    var tipo;
    if($("#radiosTrue").is(':checked')){
        tipo = true;
    }
    if($("#radiosFalse").is(':checked')){
        tipo = false;
    }

    if(tipo == false && (valor - $("#valorzinho").val()) < 0){
        console.log(valor - $("#valorzinho").val());
        new Notify ({
            title: 'Atenção',
            text: 'Você não tem Esse valor para vender.<br>',
            status: 'warning',
            autotimeout: 3000,
            autoclose: true,
            showCloseButton: false,
        })
        return;
    }

    if($("#valorzinho").val() == "" || valor.length < 1){
          new Notify ({
              title: 'Atenção',
              text: 'Coloque um valor valido.<br>',
              status: 'warning',
              autotimeout: 3000,
              autoclose: true,
              showCloseButton: false,
          })
          return;
      }
      RequestUpdateTransicao($("#valorzinho").val().replace(',', ''), id, tipo);
});

function RequestCadastroNovoInvestimento(valor, grupo){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "Nr_Valor": String(valor).replace(',',''),
      "Fk_Ativo_Id": grupo
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://localhost:7037/Transicao?token=" + tokenAcess, requestOptions)
      .then(function(response) {
        if(response.result == "Error" && response.message == "TimeOut"){
            window.location.href = "../../areas/Login/index.html";
        }
        new Notify ({
            title: 'Sucesso',
            text: "Investimento feito com sucesso!",
            status: 'success',
            autotimeout: 3000,
            autoclose: true,
            showCloseButton: false,
        })
        InfoCliente();
        ativosComprados();
        $('#modal').modal('toggle');
      })
      .catch(error => console.log('error', error));
}

function RequestUpdateTransicao(valor, id, tipo){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "Id_Transicao": parseInt(id),
      "Nr_Valor": String(valor),
      "Compra_venda": tipo
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://localhost:7037/Transicao?token="  + tokenAcess, requestOptions)
      .then(function(response){
        console.log(response);
        if(response.result == "Error" && response.message == "TimeOut"){
            window.location.href = "../../areas/Login/index.html";
          }
        new Notify ({
            title: 'Sucesso',
            text: "Investimento Atualizado com sucesso!",
            status: 'success',
            autotimeout: 3000,
            autoclose: true,
            showCloseButton: false,
        })
        InfoCliente();
        ativosComprados();
        $('#modal').modal('toggle');
      })
      .catch(error => console.log('error', error)); 
}
