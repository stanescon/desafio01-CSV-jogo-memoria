const botoesPrincipais = document.querySelectorAll('.botao');
let imagens = document.querySelectorAll('.imagem');
const restart = document.querySelector('.restart');
const newgame = document.querySelector('.newgame');
let contadorChange = 1
let imagemAberta = ""
let imagemAnterior = ""
let arr = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,18]
const listaNumeroDeJogadores = document.querySelectorAll('.jogadores');
let numeroDeJogadores = ""
let contadorMultiplayer = 0
let listaPontoDosJogadores = [0,0,0,0]
let iniciarJogo = false
let contadorTentativas = 0


for(let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i+1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
}

for(let i=0; i < imagens.length; i++){
    imagens[i].src = "./imagens/(" + arr[i] + ").png"
    imagens[i].accessKey = arr[i]
}


function jogadorAtivo (contadorMultiplayer) {
    for(let i=0; i < numeroDeJogadores ; i++){
        if(contadorMultiplayer  == i){
            for(j=0; j < numeroDeJogadores; j++){
                if(document.querySelectorAll('.player')[j].classList.contains('player-ativo')){
                    document.querySelectorAll('.player')[j].classList.remove('player-ativo');
                }
            }
            document.querySelectorAll('.player')[i].classList.add('player-ativo'); 
        
        }
    }
}

function vencedor (listaPontoDosJogadores){
    let maiorPontuacao = 0;
    for(let i=0; i < listaPontoDosJogadores.length; i++){
        if(listaPontoDosJogadores[i] > maiorPontuacao){
            maiorPontuacao = listaPontoDosJogadores[i]
        }
        console.log(maiorPontuacao)
    }
    let vencedor = listaPontoDosJogadores.findIndex(v => v == maiorPontuacao)
    console.log(vencedor)
}


for(let i=0; i < listaNumeroDeJogadores.length; i++){
    listaNumeroDeJogadores[i].onclick = function () {
        numeroDeJogadores = i + 1;
        document.querySelector('.inicio-do-jogo').classList.add('inativo');
        if(numeroDeJogadores == 1) {
            for(let k=0; k < document.querySelectorAll('.player').length ; k++){
                document.querySelectorAll('.player')[k].classList.add('inativo')  
            }
            document.querySelector('.um-player').classList.remove('inativo')
        } else if (numeroDeJogadores > 1) {
            for(let j=0; j < document.querySelectorAll('.player').length ; j++){
                console.log(numeroDeJogadores)
                if(j > (numeroDeJogadores - 1)){
                    document.querySelectorAll('.player')[j].classList.add('inativo')
                }
            }
        }
        iniciarJogo = true
    }
    
}



for(let i=0; i<botoesPrincipais.length; i++){
    botoesPrincipais[i].onclick = function () {
        if(iniciarJogo &&imagens[i].classList.contains('oculto') && !imagens[i].classList.contains('imagem-ativa')){
            if(contadorChange == 1){
                botoesPrincipais[i].classList.add('vira');
                imagens[i].classList.remove('oculto');
                contadorChange = contadorChange + 1

                imagemAberta = parseInt(imagens[i].accessKey, 10);
                imagemAnterior = i

            } else if (contadorChange == 2){
                botoesPrincipais[i].classList.add('vira');
                imagens[i].classList.remove('oculto');
                contadorChange = contadorChange + 1

                if (parseInt(imagens[i].accessKey, 10) === imagemAberta){
                    imagens[i].classList.add('imagem-ativa');
                    botoesPrincipais[i].classList.add('botao-ativo');
                    imagens[imagemAnterior].classList.add('imagem-ativa');
                    botoesPrincipais[imagemAnterior].classList.add('botao-ativo');

                    for(let k=0; k < document.querySelectorAll('.player').length; k++){
                        if(document.querySelectorAll('.player')[k].classList.contains('player-ativo')){
                            listaPontoDosJogadores[k] = listaPontoDosJogadores[k] + 1;
                            document.querySelectorAll('.player')[k].innerHTML = "<h2>P" + (k + 1) + "</h2><p>" + listaPontoDosJogadores[k] + "</p>"
                        }
                    } 

                } else {
                    contadorMultiplayer = (contadorMultiplayer + 1) % numeroDeJogadores;
                    jogadorAtivo(contadorMultiplayer);
                    contadorTentativas = 1
                    document.querySelector('.tentativas').innerHTML = "Tentativas: " + contadorTentativas
                }
                

            } else if(contadorChange > 2 && contadorChange % 2 == 0){
                botoesPrincipais[i].classList.add('vira');
                imagens[i].classList.remove('oculto');
                contadorChange = contadorChange + 1

                if (parseInt(imagens[i].accessKey, 10) === imagemAberta){
                    imagens[i].classList.add('imagem-ativa');
                    botoesPrincipais[i].classList.add('botao-ativo');
                    imagens[imagemAnterior].classList.add('imagem-ativa');
                    botoesPrincipais[imagemAnterior].classList.add('botao-ativo');

                    for(let k=0; k < document.querySelectorAll('.player').length; k++){
                        if(document.querySelectorAll('.player')[k].classList.contains('player-ativo')){
                            listaPontoDosJogadores[k] = listaPontoDosJogadores[k] + 1;
                            document.querySelectorAll('.player')[k].innerHTML = "<h2>P" + (k + 1) + "</h2><p>" + listaPontoDosJogadores[k] + "</p>"
                        }
                    }

                } else {
                    contadorMultiplayer = (contadorMultiplayer + 1) % numeroDeJogadores;
                    jogadorAtivo(contadorMultiplayer);
                    contadorTentativas = contadorTentativas + 1;
                    document.querySelector('.tentativas').innerHTML = "Tentativas: " + contadorTentativas
                }
                
            } else if (contadorChange > 2 && contadorChange % 2 == 1){
                for(let j=0; j < botoesPrincipais.length; j++){
                    if(!imagens[j].classList.contains('oculto') && !imagens[j].classList.contains('imagem-ativa')){
                        imagens[j].classList.add('oculto');
                        botoesPrincipais[j].classList.remove('vira');
                    }
                }
                botoesPrincipais[i].classList.add('vira');
                imagens[i].classList.remove('oculto');
                contadorChange = contadorChange + 1
                
                imagemAberta = parseInt(imagens[i].accessKey, 10);
                imagemAnterior = i
            }
        }    
    }
}



restart.onclick = function () {
    for(let i=0; i < botoesPrincipais.length; i++){
        if(!imagens[i].classList.contains('oculto')){
            imagens[i].classList.add('oculto');
            botoesPrincipais[i].classList.remove('vira');
        }
        if(imagens[i].classList.contains('imagem-ativa')){
            imagens[i].classList.remove('imagem-ativa');
            botoesPrincipais[i].classList.remove('vira');
            botoesPrincipais[i].classList.remove('botao-ativo');
        }
    }
    listaPontoDosJogadores = [0,0,0,0];
    document.querySelectorAll('.player')[0].innerHTML = "<h2>P1</h2><p>0</p></button>"
    document.querySelectorAll('.player')[1].innerHTML = "<h2>P2</h2><p>0</p></button>"
    document.querySelectorAll('.player')[2].innerHTML = "<h2>P3</h2><p>0</p></button>"
    document.querySelectorAll('.player')[3].innerHTML = "<h2>P4</h2><p>0</p></button>"
}


newgame.onclick = function embaralhar () {
    listaPontoDosJogadores = [0,0,0,0];
    document.querySelectorAll('.player')[0].innerHTML = "<h2>P1</h2><p>0</p></button>"
    document.querySelectorAll('.player')[1].innerHTML = "<h2>P2</h2><p>0</p></button>"
    document.querySelectorAll('.player')[2].innerHTML = "<h2>P3</h2><p>0</p></button>"
    document.querySelectorAll('.player')[3].innerHTML = "<h2>P4</h2><p>0</p></button>"
    iniciarJogo = false


    for(let i=0; i < botoesPrincipais.length; i++){
        if(!imagens[i].classList.contains('oculto')){
            imagens[i].classList.add('oculto');
            botoesPrincipais[i].classList.remove('vira');
        }
        if(imagens[i].classList.contains('imagem-ativa')){
            imagens[i].classList.remove('imagem-ativa');
            botoesPrincipais[i].classList.remove('vira');
            botoesPrincipais[i].classList.remove('botao-ativo');
        }
    }    
    for(let i=0; i < document.querySelectorAll('.player').length ; i++){
        if(document.querySelectorAll('.player')[i].classList.contains('inativo')){
            document.querySelectorAll('.player')[i].classList.remove('inativo');  
        }
    } 
    if (!document.querySelector('.um-player').classList.contains('inativo')){
        document.querySelector('.um-player').classList.add('inativo');
    }
    document.querySelector('.inicio-do-jogo').classList.remove('inativo');
    
    setTimeout(() => {
        for(let i = arr.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    
        for(let i=0; i < imagens.length; i++){
        imagens[i].src = "./imagens/(" + arr[i] + ").png"
        imagens[i].accessKey = arr[i]
        }
    }, 1300);
}
