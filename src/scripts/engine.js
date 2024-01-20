// Ojeto que representa o estado dos elementos do projeto.
const state = {
    // Ojeto que armazena os elementos visuais do projeto.
    view: {
        /* Seleciona todos os elementos que são os quadros do painel e armazena na variável. */
        squares: document.querySelectorAll(".square"),

        /* Seleciona o elemento que possui o inimigo e armazena na variável. */
        enemy: document.querySelector(".enemy"),

        /* Seleciona o elemento HTML que contém o tempo do jogo e armazena na variável. */
        timeLeft: document.querySelector("#time-left"),

        /* Seleciona o elemento HTML que possui a pontuação do jogo e armazena na variável. */
        score: document.querySelector("#score"),
    },
    
    //Objeto que armazena os valores dos elementos do projeto.
    values: {
        /* Defini uma variável que obtém a função responsável pela aparição do inimigo nos quadros em um intervalo de tempo determinado. */
        timerId: null,

        /* Tempo de intervalo para cada aparição do inimigo no quadro */
        gameVelocity: 580,
        
        /* Armazena o id do quadro que contém o enemy(inimigo) */
        hitPosition: 0,

        /* Adiciona +1 a cada clique no quadro que esta o enemy(inimigo). */
        result: 0,

        /* Tempo de duração do game. */
        currentTime: 60,

        /* A cada segundo decrementa o valor do tempo atual em 1 e apresenta na tela do game. */
        countDownTimerId: setInterval(countDown, 1000),
    },
};

function randomSquare(){
    /* Percorre os quadros e remove a classe enemy. */
    state.view.squares.forEach((square)=> {
        square.classList.remove("enemy");
    })
    /* Sorteia um número aleatório de 1 a 9 e armazena na variável. */
    let randomNumber = Math.floor(Math.random() * 9);

    /* Acessa o quadro correspondente ao número sorteado e o armazena na variável. */
    let randomSquare = state.view.squares[randomNumber];

    /* Adiciona a classe enemy no quadro correspondente ao número sorteado. */
    randomSquare.classList.add("enemy");

    /* Obtém o id do quadro onde esta o inimigo e armazena na variável hitPosition para poder verificar se este é o quadro que foi clicado pelo usuário na função addListenerHitBox. */
    state.values.hitPosition = randomSquare.id;
}

/* Adiciona um intervalo de tempo para a aparição do inimigo e armazena na variável. */
function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

/* Adiciona um evento de clique no game. */
function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        
        /* Adciona um evento de clique nos quadros do painel. */
        square.addEventListener("mousedown", () => {

            /* Verifica se o id do quadro que foi clicado é igual ao id do quadro que estava o inimigo(enemy). */
            if(square.id === state.values.hitPosition){

                /* Adiciona +1 a variavel result toda vez que o quadro que estava o enemy for clicado. */
                state.values.result++;

                /* Adiciona o valor da pontuação na tela do game. */
                state.view.score.textContent = state.values.result;

                /* Limpa o id do quadro atual. */
                state.values.hitPosition = null;

                /* Invoca a função para tocar o som, que foi passado como parâmetro, quando o inimigo for clicado. */
                playSound('hit');
            }
        })
    })
}
/* Implementa a contagem regressiva de tempo do jogo. */
function countDown(){
    // Decrementa o tempo do jogo em 1s.
    state.values.currentTime--;
    // Adiciona o tempo atual na tela.
    state.view.timeLeft.textContent = state.values.currentTime;

    //Adiciona uma ação se o tempo atual do game for menor ou igual a 0.
    if(state.values.currentTime <= 0){
        
        // Limpa os intervalos do jogo.
        clearInterval(state.values.countDownTimerId);
        clearInterval(state.values.timerId);
        
        alert('Game Over. Pontuação final: ' + state.values.result)
    }
}

/* Adciona um som que tocará toda vez que o enemy for clicado. */
function playSound(audioName){
    let sound = new Audio(`./src/sounds/${audioName}.m4a`);
    sound.volume = 0.2;
    sound.play();
}

/* Função principal. Inicia as ações do jogo. */
function main(){
    // Invoca a função responsável por mover o inimigo.
    moveEnemy();

    // Invoca a função responsável por adicionar um evento de clique no inimigo.
    addListenerHitBox();
}

/* Invoca a função principal. */
main();