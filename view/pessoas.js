function carregaTabela(){
    const req = new XMLHttpRequest()

    req.open('GET', 'http://localhost:8080/pessoa')
  
    req.onload = function () {
      pessoa=JSON.parse(this.responseText)
      console.log("status da requisição : "+this.status)
      tabHtml='<th>Nome</th><th>Idade</th><th>Operações</th>'
      pessoa.forEach(p => {
           tabHtml+='<tr id=linha'+p.id+'>'
           tabHtml+='<td>'+p.nome+'</p>'
           tabHtml+='<td>'+p.idade+'</p>'
           tabHtml+='<td><img src=../lixo.png alt=apagar title=apagar onclick=apaga('+p.id+')>'
           tabHtml+='<img src=../lapis.png alt=apagar title=apagar onclick=criaFormAlt('+JSON.stringify(p)+')></p>'
           tabHtml+='<tr>'
      });
      document.getElementById('tabPessoas').innerHTML=tabHtml;
    }
  
    req.onerror = function () {
      alert('erro ao executar a requisição')
    }
  
    req.send()
}

function criaFormAlt(p){
  console.log('editando...')
  var formAlterar='<td><input type=text id=nome value='+p.nome+'></td>'
  formAlterar += '<td><input type=text id=idade value='+p.idade+'></td>'
  formAlterar += '<td><input type=button id=envia value=Envia onClick=enviaAlt('+p.id+')></td>'
  document.getElementById('linha'+p.id).innerHTML=formAlterar
}

function enviaAlt(id){
  const novoRegistro={
    id : id,
    nome : document.getElementById('nome').value,
    idade : document.getElementById('idade').value
  }
  const request = new XMLHttpRequest()
  request.open('PUT', 'http://localhost:8080/pessoa')
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.send(JSON.stringify(novoRegistro))

  request.onload = function () {
    console.log(this.responseText)
    alert('registro alterado')
    carregaTabela();
  }
  request.onerror = function () {
    alert('erro ao executar a requisição')
  }
}
function mostraFormInc(){
  document.getElementById("formInc").style.display="block";
}
function cancelaInc(){
  document.getElementById("formInc").style.display="none";
}
function enviaInc(){
  const novoRegistro={
    nome : document.getElementById('nomeInc').value,
    idade : document.getElementById('idadeInc').value
  }
  const request = new XMLHttpRequest()
  request.open('POST', 'http://localhost:8080/pessoa')
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.send(JSON.stringify(novoRegistro))
  console.log(novoRegistro)

  request.onload = function () {
    console.log(this.responseText)
    alert('registro incluido')
    carregaTabela();
  }
  request.onerror = function () {
    alert('erro ao executar a requisição')
  }
}
function apaga(id){
  if(confirm('Tem certeza?')){
    const request = new XMLHttpRequest()
    request.open('DELETE', 'http://localhost:8080/pessoa/'+id)
    request.send()
    request.onload = function () {
      console.log(this.responseText)
      alert('registro apagado')
      carregaTabela();
    }
    request.onerror = function () {
      alert('erro ao executar a requisição')
    }
    
  }
}