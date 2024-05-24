const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const imgpp = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')
const title = document.querySelector('.app__title')
const botoes =document.querySelectorAll('.app__card-button')
const musicainput = document.querySelector('#alternar-musica')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const musica = new Audio ('/sounds/xandao.mp3')
const startPauseBt =document.querySelector ('#start-pause')
const audioPlay = new Audio('/sounds/play.wav');
const audioPausa = new Audio('/sounds/pause.mp3');
const audioTempoFinalizado = new Audio('./sounds/beep.mp3')



let tempoDecorridoEmSegundos = 1500
let intervaloId = null

musica.loop = true

musicainput.addEventListener('change', () => {
if(musica.paused){
    musica.play()
}
else{
    musica.pause()
}
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
   alterarContexto('descanso-longo')
   longoBt.classList.add('active')
})

function alterarContexto (contexto) {
    mostrarTempo ()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/img/${contexto}.png`)
    switch (contexto){
        case "foco":
            title.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">Mergulhe no que importa.</strong>
            `

        break;

        case "descanso-curto":
            title.innerHTML =`
            Que tal da uma respirada,<br>
                <strong class="app__title-strong">Faça uma pausa curta.</strong>
            `
            break;

        case "descanso-longo":
            title.innerHTML =`
            Hora de voltar à superfície,<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
        default:

        break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        audioTempoFinalizado.play()
        alert ('Tempo Finalizado!')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}
startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloId){
        audioPausa.play()
        imgpp.setAttribute('src', `/img/play_arrow.png`)
        zerar()
        return
    }
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000) 
    imgpp.setAttribute('src', `/img/pause.png`)
    iniciarOuPausarBt.textContent = "Pausar"
        
}

function zerar () {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    intervaloId = null
}

function mostrarTempo () {
    const tempo= new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()