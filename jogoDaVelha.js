const rdoTipo = document.getElementsByName('tipo');
const rdoNivel= document.getElementsByName('nivel');
const btnNovo = document.getElementById('novo');
const gNivel = document.getElementById('gNivel');
const gTipo = document.getElementById('gTipo');
let jogador="X"
let parar = false;
let cont=0;
let contador=-1;
var matrizCanto= [0,2,6,8];

// funçao para sorter numeros aleatorios
const aleatorios = function (min, max){
	return Math.trunc(Math.random()*(max + 1 - min ) + min );
}


//verificando se o jogo vai ser contra a maquina ou contra outo jogador{
rdoTipo[0].addEventListener('click', function(){
    gNivel.disabled = true;
})
rdoTipo[1].addEventListener('click', function(){
    gNivel.disabled = false;
});
// }
// recarregando a pg se o botao novo for clicado
btnNovo.addEventListener('click',function(){
    window.location.reload();
})


const btn = document.getElementsByClassName('btn')

for(let i=0; i<9;i++){
    btn[i].addEventListener('click', function(){
    if(rdoTipo[0].checked || rdoTipo[1].checked){
        gTipo.disabled=true;
        gNivel.disabled=true;
        jogar(i);
    }else{
        alert("Escolha um tipo de jogo")
    }
    })
}





const jogar=function(pos)  {
        if(rdoTipo[0].checked){
            btn[pos].value=jogador
            btn[pos].disabled=true;
            verificarGanhador();
        jogador = jogador=='X'?'O' : 'X'
            
        }else{


            if (rdoTipo[1].checked){
                btn[pos].value="X"
                btn[pos].disabled=true;
                verificarGanhador();
                jogador="O"

                // cpu                 
                if(cont <9){
                    while(btn[pos].disabled){
                        pos=IA();
                    }
                    btn[pos].value= jogador;
                    btn[pos].disabled=true;
                    verificarGanhador();
                    jogador="X"
                }  

               
                
            }
        
        }
}
const verificarGanhador= function (){
    //contar as jogadas do jogo
    cont++

    const bloquearTudo = function(){
        for(let i=0; i<=8;i++){
            btn[i].disabled = true;
        }
        cont= 9;
    }
    const marcarGanhador = function(a, b, c){
        alert("O jogador :" +'"'+ jogador +'"'+"  Ganhou");
        btn[a].style.backgroundColor="#a51313"  
        btn[b].style.backgroundColor="#a51313"
        btn[c].style.backgroundColor="#a51313"
        bloquearTudo();
    }
    // verificador do ganhador na horizontal
    for (let i=0; i<=6;i+=3){
        //if que colore e alerta o ganhador atravez da function marcarGanhador();
        if ( btn[i].value==jogador && btn[i].value == btn[i+1].value && btn[i+1].value ==btn[i+2].value){
            marcarGanhador(i, i+1, i+2);    
        }
    }   
    //verifica quem ganha na vertical
    for(let i=0; i<=2;i++){
        if (btn[i].value == jogador && btn[i].value == btn[i+3].value && btn[i+3].value == btn[i+6].value){
           marcarGanhador(i, i+3, i+6)
           
        }
    }
    //  if para verificar as  diagonal
    if(btn[0].value==jogador && btn[0].value == btn[4].value && btn[4].value == btn[8].value ){
        marcarGanhador(0,4,8)
        
    }
    // if para verificar as diagonal
    if(btn[2].value==jogador && btn[2].value == btn[4].value && btn[4].value == btn[6].value ){
        marcarGanhador(2, 4, 6);
        
       
    }
}
// para desabilitar tudos os botoes e parar tudo

// função que ve qual o tipo do nivel do jogo, facil, medio e dificil
const IA = function(){
    // nivel facil
    if (rdoNivel[0].checked){
        return aleatorios(0,8);
    }
    //nivel medio
    if (rdoNivel[1].checked){
    
            // verifica se o jogador "X" tem a chance de ganhar e bloqueia ele na horizontal;
            for (let i=0; i<=6; i+=3){
            
                if( btn[i].value=="X" && btn[i+1].value =="X" && btn[i+2].value=="" ){
                    return i+2;
                }else if(btn[i].value=="X" && btn[i+2].value =="X" && btn[i+1].value==""){
                    return i+1;
                }else if(btn[i+1].value=="X" && btn[i+2].value =="X" && btn[i].value==""){
                    return i;
                }
            }
            for (let i=0; i<=2; i++){
            
                if( btn[i].value=="X" && btn[i+3].value =="X" && btn[i+6].value=="" ){
                    return i+6;
                }else if(btn[i].value=="X" && btn[i+6].value =="X" && btn[i+3].value==""){
                    return i+3;
                }else if(btn[i+3].value=="X" && btn[i+6].value =="X" && btn[i].value==""){
                    return i;
                }
            }

            // diagonal 2
            if( btn[0].value=="X" && btn[4].value =="X" && btn[8].value=="" ){
                return 8;
            }else if( btn[4].value=="X" && btn[8].value =="X" && btn[0].value=="" ){
                return 0;
            }else  if( btn[0].value=="X" && btn[8].value =="X" && btn[4].value=="" ){
                return 4;
            }
            // diagonal 2
            if( btn[2].value=="X" && btn[4].value =="X" && btn[6].value=="" ){
                return 6;
            }else  if( btn[4].value=="X" && btn[6].value =="X" && btn[2].value=="" ){
                return 2;
            }else if( btn[2].value=="X" && btn[6].value =="X" && btn[4].value=="" ){
                return 4;
            }
            return aleatorios(0,8);
        
    }
    // nivel dificil
    if (rdoNivel[2].checked){
        for (let i=0; i<=6; i+=3){
            
            if( btn[i].value=="O" && btn[i+1].value =="O" && btn[i+2].value=="" ){
                return i+2;
            }else if(btn[i].value=="O" && btn[i+2].value =="O" && btn[i+1].value==""){
                return i+1;
            }else if(btn[i+1].value=="O" && btn[i+2].value =="O" && btn[i].value==""){
                return i;
            }
        }
        for (let i=0; i<=2; i++){
        
            if( btn[i].value=="O" && btn[i+3].value =="O" && btn[i+6].value=="" ){
                return i+6;
            }else if(btn[i].value=="O" && btn[i+6].value =="O" && btn[i+3].value==""){
                return i+3;
            }else if(btn[i+3].value=="O" && btn[i+6].value =="O" && btn[i].value==""){
                return i;
            }
        }
        // diagonal 1 para "O" ganhar 
        if( btn[0].value=="O" && btn[4].value =="O" && btn[8].value=="" ){
            return 8;
        }else if( btn[4].value=="O" && btn[8].value =="O" && btn[0].value=="" ){
            return 0;
        }else  if( btn[0].value=="O" && btn[8].value =="O" && btn[4].value=="" ){
            return 4;
        }
        // diagonal  2 para "O" ganhar 
        if( btn[2].value=="O" && btn[4].value =="O" && btn[6].value=="" ){
            return 6;
        }else  if( btn[4].value=="O" && btn[6].value =="O" && btn[2].value=="" ){
            return 2;
        }else if( btn[2].value=="O" && btn[6].value =="O" && btn[4].value=="" ){
            return 4;
        }




        // verifica se o jogador "X" tem a chance de ganhar e bloqueia ele na horizontal;
        for (let i=0; i<=6; i+=3){
            
            if( btn[i].value=="X" && btn[i+1].value =="X" && btn[i+2].value=="" ){
                return i+2;
            }else if(btn[i].value=="X" && btn[i+2].value =="X" && btn[i+1].value==""){
                return i+1;
            }else if(btn[i+1].value=="X" && btn[i+2].value =="X" && btn[i].value==""){
                return i;
            }
        }
        for (let i=0; i<=2; i++){
        
            if( btn[i].value=="X" && btn[i+3].value =="X" && btn[i+6].value=="" ){
                return i+6;
            }else if(btn[i].value=="X" && btn[i+6].value =="X" && btn[i+3].value==""){
                return i+3;
            }else if(btn[i+3].value=="X" && btn[i+6].value =="X" && btn[i].value==""){
                return i;
            }
        }

        // diagonal 2
        if( btn[0].value=="X" && btn[4].value =="X" && btn[8].value=="" ){
            return 8;
        }else if( btn[4].value=="X" && btn[8].value =="X" && btn[0].value=="" ){
            return 0;
        }else  if( btn[0].value=="X" && btn[8].value =="X" && btn[4].value=="" ){
            return 4;
        }
        // diagonal 2
        if( btn[2].value=="X" && btn[4].value =="X" && btn[6].value=="" ){
            return 6;
        }else  if( btn[4].value=="X" && btn[6].value =="X" && btn[2].value=="" ){
            return 2;
        }else if( btn[2].value=="X" && btn[6].value =="X" && btn[4].value=="" ){
            return 4;
        }


        //fechandop uma estrategia 
        if( btn[3].value=="X" && btn[1].value =="X" && btn[0].value=="" ){
            return 0;
        }else  if( btn[1].value=="X" && btn[5].value =="X" && btn[2].value=="" ){
            return 2;
        }else if( btn[3].value=="X" && btn[7].value =="X" && btn[6].value=="" ){
            return 6;
        }else if( btn[7].value=="X" && btn[5].value =="X" && btn[6].value=="" ){
            return 6;
        }

        // if "x" começar no MEIO 
        if( btn[4].value=="X" && btn[0].value =="" && btn[1].value=="" && btn[2].value =="" && btn[3].value=="" && btn[5].value=="" && btn[6].value =="" && btn[7].value=="" && btn[8].value ==""){

            return matrizCanto[aleatorios(0,3)];
        }
        
        if( btn[0].value=="X" && btn[4].value =="X" && btn[3].value=="" && btn[6].value =="" && btn[7].value=="" && btn[2].value==""){

            return 6;
        }
        if( btn[2].value=="X" && btn[4].value =="X" && btn[3].value=="" && btn[0].value =="" && btn[1].value=="" && btn[3].value==""){

            return 0;
        }



        //ESTRATEGIA DO X
        if( btn[7].value=="X" && btn[0].value =="X" && btn[3].value=="" && btn[6].value =="" ){


            return 6;
        }
         if( btn[2].value=="X" && btn[7].value =="X" && btn[5].value=="" && btn[8].value =="" ){

             return 8;
        }
        if (btn[4].value=="X" &&  btn[6].value=="X" && btn[2].value=="O" && btn[0].value==""){
            return 0;
        }
        if (btn[4].value=="X" &&  btn[8].value=="X" && btn[0].value=="O" && btn[2].value==""){
            return 2;
        }
        // if( btn[2].value=="X" && btn[4].value =="X" && btn[3].value=="" && btn[0].value =="" && btn[1].value=="" && btn[3].value==""){

        //     return 0;
        // }




        if (btn[4].value==""){
        return 4;
        }
        
        if (btn[1].value==""){
            return 1;
        }
        if (btn[5].value==""){
                return 5;
        }
         if (btn[7].value==""){
            return 7;
        }
        if (btn[3].value==""){
            return 3;
        }

        return aleatorios(0,8);
    }
}