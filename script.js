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
let pontosPlayer1 = 0
let pontosPlayer2 = 0
let pontosPlayer3 = 0
let pontosPlayer4 = 0


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


for(let i=0; i < listaNumeroDeJogadores.length; i++){
    listaNumeroDeJogadores[i].onclick = function () {
        numeroDeJogadores = i + 1;
        document.querySelector('.inicio-do-jogo').classList.add('inativo');
        console.log(numeroDeJogadores);
    }
    
}



for(let i=0; i<botoesPrincipais.length; i++){
    botoesPrincipais[i].onclick = function () {
        if(imagens[i].classList.contains('oculto') && !imagens[i].classList.contains('imagem-ativa')){
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

                } else {
                    console.log(contadorMultiplayer)
                    contadorMultiplayer = (contadorMultiplayer + 1) % numeroDeJogadores;
                    console.log(contadorMultiplayer)
                    jogadorAtivo(contadorMultiplayer);
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

                } else {
                    contadorMultiplayer = (contadorMultiplayer + 1) % numeroDeJogadores;
                    jogadorAtivo(contadorMultiplayer);
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
}


newgame.onclick = function embaralhar () {
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
