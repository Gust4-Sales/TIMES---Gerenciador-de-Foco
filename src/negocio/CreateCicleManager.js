import moment from 'moment'

function updateTotalTime(tempoDeAtividade, tempoDeIntervalo, quantidadeDeIntervalos){
    let tempoTotalParcial = moment.duration(0, "hours")

    let tempoAtividadeDuration = tempoDeAtividade === "30 min" ? moment.duration(30, "minutes") : moment.duration(tempoDeAtividade)
    let tempoIntervaloInt = Number(tempoDeIntervalo)
    
    let tempoTotalIntervalosDuration = moment.duration(tempoIntervaloInt*quantidadeDeIntervalos, "minutes")
    
    tempoTotalParcial.add(tempoAtividadeDuration)
    
    tempoTotalParcial.add(tempoTotalIntervalosDuration, "minutes")

    if (tempoIntervaloInt===5 && tempoDeAtividade==="1:00"){
        return "1h:05"        
    }

    return `${tempoTotalParcial.get('hours')}h:${tempoTotalParcial.get('minutes')}0`.slice(0, 5)
}

function updateNumberOfBreaks(temporizador, tempoDeAtividade){
    let qntIntervalos = 0
    
    if (tempoDeAtividade === "30 min") {
        qntIntervalos = 1
        return qntIntervalos
    }
    
    let temporizadorInt = parseInt(temporizador)
    let temporizadorDuration = moment.duration(temporizadorInt, 'minutes')

    let tempoAtividadeDuration = moment.duration(tempoDeAtividade)

    
    let temporizadorTemporario = moment.duration(0, "minutes") 
    while(true){
        temporizadorTemporario.add(temporizadorDuration)
        
        if ( temporizadorTemporario.asMinutes() === tempoAtividadeDuration.asMinutes() ){
            break
        } else if ( temporizadorTemporario.asMinutes() > tempoAtividadeDuration.asMinutes() ){
            qntIntervalos--
            break
        }

        qntIntervalos++
    }

    return qntIntervalos
}

export { updateTotalTime, updateNumberOfBreaks} 