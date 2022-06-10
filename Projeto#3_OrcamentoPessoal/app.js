class Despesa{

    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados(){
        for(let i in this){
            if(this[i] == undefined || this[i] == '' || this[i] == null){
                return false
            }
        }

        return true
    }
}

class BD{

    constructor(){
        let id = localStorage.getItem('id')

        if(id == null){
            localStorage.setItem('id', 0)
        }
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(despesa) {
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(despesa))

        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros(){

        let despesas = Array()

        let id = localStorage.getItem('id')

        for(let i = 1; i <= id; i++){
            let despesa = JSON.parse(localStorage.getItem(i))

            if(despesa == null){
                continue
            }

            despesa.id = i
            despesas.push(despesa)
        }

        return despesas
    }

    pesquisar(despesa){
        let despesas = this.recuperarTodosRegistros()

        if(despesa.ano != '')
            despesas = despesas.filter(d => d.ano == despesa.ano)
        
        if(despesa.mes != '')
            despesas = despesas.filter(d => d.mes == despesa.mes)
        
        if(despesa.dia != '')
            despesas = despesas.filter(d => d.dia == despesa.dia)
        
        if(despesa.tipo != '')
            despesas = despesas.filter(d => d.tipo == despesa.tipo)
        
        if(despesa.descricao != '')
            despesas = despesas.filter(d => d.descricao == despesa.descricao)
        
        if(despesa.valor != '')
            despesas = despesas.filter(d => d.valor == despesa.valor)

        return despesas
    }

    remover(id){
        localStorage.removeItem(id)
    }
}

let bd = new BD

function cadastrarDespesa() {

    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    if(despesa.validarDados()){
        bd.gravar(despesa)
        exibirModal('Inserido com Sucesso',
                    'modal-header text-success',
                    'Despesa cadastrada com sucesso',
                    'btn btn-success',
                    '#registraDespesa')
        /*
        document.getElementById('modal_titulo').innerHTML = 'Inserido com Sucesso'
        document.getElementById('modal_titulo_div').className = 'modal-header text-success'
        document.getElementById('modal_conteudo').innerHTML = 'Despesa cadastrada com sucesso'
        document.getElementById('modal_btn').className = 'btn btn-success'

        $('#registraDespesa').modal('show')
        */
        limparCampos(ano, mes, dia, tipo, descricao, valor)
    }else{
        exibirModal('Erro ao inserir',
                    'modal-header text-danger',
                    'Existem campos obrigatórios que não foram preenchidos',
                    'btn btn-danger',
                    '#registraDespesa')
        /*
        document.getElementById('modal_titulo').innerHTML = 'Erro ao inserir'
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
        document.getElementById('modal_conteudo').innerHTML = 'Existem campos obrigatórios que não foram preenchidos'
        document.getElementById('modal_btn').className = 'btn btn-danger'
        
        $('#registraDespesa').modal('show')
        */
    }
}

function exibirModal(titulo, divClass, conteudo, btnClass, id) {
    document.getElementById('modal_titulo').innerHTML = titulo
    document.getElementById('modal_titulo_div').className = divClass
    document.getElementById('modal_conteudo').innerHTML = conteudo
    document.getElementById('modal_btn').className = btnClass

    $(id).modal('show')
}

function carregaListaDespesas(despesas = Array(), filtro = false){

    if(despesas.length == 0 & filtro == false){
        despesas = bd.recuperarTodosRegistros()
    }    

    let listaDespesas = document.getElementById('lista_despesas')

    listaDespesas.innerHTML = ''

    despesas.forEach(function(d){
        //tr
        let linha = listaDespesas.insertRow()
        linha.id = `id_despesa_${d.id}`

        //td
        linha.insertCell(0).innerHTML = `${d.dia <= 9 ? `0${d.dia}` : d.dia}/${d.mes <= 9 ? `0${d.mes}` : d.mes}/${d.ano}`
        linha.insertCell(1).innerHTML = verificarTipo(parseInt(d.tipo))
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = `R$ ${d.valor}`
        
        //button
        let btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.onclick = function(){
            let id = linha.id.replace('id_despesa_', '')
            bd.remover(id)
            exibirModal('Removido com Sucesso',
                        'modal-header text-success',
                        'Despesa removida com sucesso',
                        'btn btn-success',
                        '#registraDespesa')
            
            document.getElementById(`id_despesa_${id}`).remove()
            //window.location.reload()
        }
        linha.insertCell(4).append(btn)
    })
}

function limparCampos(...campos) {

    for(let i in campos){
        campos[i].value = ''
    }
}

function verificarTipo(tipo) {
    switch(tipo){
        case 1:{
            return 'Alimentação'
        }
        case 2:{
            return 'Educação'
        }
        case 3:{
            return 'Lazer'
        }
        case 4:{
            return 'Saúde'
        }
        case 5:{
            return 'Transporte'
        }
        default:{
            return tipo
        }
    }
}

function pesquisarDespesas() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    despesas = bd.pesquisar(despesa)

    carregaListaDespesas(despesas, true)
}