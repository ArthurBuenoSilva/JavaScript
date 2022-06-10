var height = 0
var width = 0
var lifes = 0
var time = 15
var level = parseInt((window.location.search.replace('?', '')).trim())
var spawnTime = 1500

switch(level){
    case 0:{
        spawnTime = 1500
        break;
    }
    case 1:{
        spawnTime = 1000
        break;
    }
    case 2:{
        spawnTime = 750
        break;
    }
    default:{
        spawnTime = 1500
    }
}

adjustDimensions()
spawnMosquitos()

//Intervalo de exibição dos mosquitos
var moscas = setInterval(function() {
    spawnMosquitos()
}, spawnTime)

//Seta o tempo no elemento com id 'cronometro'
document.getElementById('cronometro').innerHTML = time

//Cronômetro
var cronometro = setInterval(function(){
    time -= 1

    //Verifica se você matou os mosquitos até o tempo acabar
    if(time < 0){
        clearInterval(cronometro)
        clearInterval(moscas)
        window.location.href = 'winner.html'
    }else{
        document.getElementById('cronometro').innerHTML = time
    }    
}, 1000)

function adjustDimensions(){
    //Pega as altura e largura da janela
    height = window.innerHeight
    width = window.innerWidth
}

function spawnMosquitos
(){

    //Remove o mosquito anterior (caso exista)
    if(document.getElementById('mosquito')){
        document.getElementById('mosquito').remove()

        //Verifica a quantidade de vidas
        if(lifes > 2){
            window.location.href = 'game_over.html'
        }else{
            document.getElementById('v' + lifes).src = 'img/coracao_vazio.png'
            lifes++  
        }      
    }

    //Gera uma posição randômica
    var positionX = Math.floor(Math.random() * width) - 90
    var positionY = Math.floor(Math.random() * height) - 90

    //Verifica se a posição é negativa
    positionX = positionX < 0 ? 0 : positionX
    positionY = positionY < 0 ? 0 : positionY

    //Cria um objeto com a imagem de mosquito
    var mosquito = document.createElement('img')
    mosquito.id = 'mosquito'
    mosquito.src = 'img/mosquito.png'
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    mosquito.onclick = function(){
        this.remove()
    }
    mosquito.style.left = positionX + 'px'
    mosquito.style.top = positionY + 'px'
    mosquito.style.position = 'absolute'

    //Exibe o mosquito
    document.body.appendChild(mosquito)
}

//Gera um tamanho aleatório para os mosquitos
function tamanhoAleatorio(){
    var classe = Math.floor(Math.random() * 3)

    switch(classe){
        case 0:{
            return 'mosquito0'
        }
        case 1:{
            return 'mosquito1'
        }
        case 2:{
            return 'mosquito2'
        }
    }
}

//Gera um lado aleatório para os mosquitos
function ladoAleatorio(){
    var classe = Math.floor(Math.random() * 2)

    switch(classe){
        case 0:{
            return 'lado0'
        }
        case 1:{
            return 'lado1'
        }
    }
}
