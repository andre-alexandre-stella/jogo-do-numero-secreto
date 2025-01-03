// Botão "Chutar"
function verificarChute() {
    let chute = document.querySelector("input").value;

    validarChute(chute);
    if (chuteValidado == false) {
        exibirTextoNaTela("h1", "Chute um valor válido!");
        let mensagem = `O valor deve ser um número entre 1 e ${numeroMaximo}:`;
        exibirTextoNaTela('p', mensagem);
        limparCampo();
        return;
    }

    exibirTextoNaTela("h1", "Jogo do Número Secreto");

    if (chute == numeroSecreto) {
        exibirTextoNaTela("h1", "Acertou!");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagem = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela("p", mensagem);
        // document.getElementById("reiniciar").removeAttribute("disabled");
        document.querySelector("#reiniciar").removeAttribute("disabled");
        document.querySelector("#chutar").setAttribute("disabled", true);
    } else {
        // if (chute > numeroSecreto) {
        //     exibirTextoNaTela("p", "O número secreto é menor!");
        // } else {
        //     exibirTextoNaTela("p", "O número secreto é maior!");
        // }
        chute > numeroSecreto ? exibirTextoNaTela("p", "O número secreto é menor!") : exibirTextoNaTela("p", "O número secreto é maior!");
        tentativas++;
        limparCampo();
    }
}

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    // responsiveVoice.speak(texto, "Brazilian Portuguese Female", { rate: 1.2 });
    if ("speechSynthesis" in window) {
        let mensagem = new SpeechSynthesisUtterance(texto);
        mensagem.lang = "pt-BR";
        mensagem.rate = 2.5;
        window.speechSynthesis.speak(mensagem);
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function gerarNumeroAleatorio() {
    // return parseInt(Math.random() * numeroMaximo) + 1;
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo) + 1;
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        if (listaDeNumerosSorteados.length == numeroMaximo) {
            listaDeNumerosSorteados = [];
        }
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }

}

function limparCampo() {
    chute = document.querySelector("input");
    chute.value = "";
}

// Botão "Novo jogo"
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.querySelector("#reiniciar").setAttribute("disabled", true);
    document.querySelector("#chutar").removeAttribute("disabled");
}

function exibirMensagemInicial() {
    // let titulo = document.querySelector("h1");
    // titulo.innerHTML = "Jogo do Número Secreto";
    exibirTextoNaTela("h1", "Jogo do Número Secreto");

    // let paragrafo = document.querySelector("p");
    // paragrafo.innerHTML = "Escolha um número entre 1 e 10:";
    let mensagem = `Escolha um número entre 1 e ${numeroMaximo}:`;
    exibirTextoNaTela("p", mensagem);
}

function validarChute(chute) {
    chuteValidado = (chute >= 1 && chute <= numeroMaximo) ? true : false;
}

let numeroMaximo = 100;
exibirMensagemInicial();
let listaDeNumerosSorteados = [];
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
let chuteValidado;

