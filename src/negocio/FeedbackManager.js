import moment from 'moment'

function calculateTimeOut(tempoDecorrido, tempoTotal){
    let timeDifference = moment(tempoDecorrido.replace('h', ''), "H:mm:ss").diff(moment(tempoTotal.replace('h', ''), "H:mm"), "seconds")
    let timeDifferenceFormatted = ''

    if (timeDifference >= 60  && timeDifference < 3600) {
        timeDifference = moment.duration(timeDifference, "seconds")

        timeDifferenceFormatted = `${timeDifference.get("minutes")}min e ${timeDifference.get("seconds")}s` 
    } else if (timeDifference > 3600) {
        timeDifference = moment.duration(timeDifference, "seconds")

        timeDifferenceFormatted = `${timeDifference.get("hours")}h:${timeDifference.get("minutes")}:${timeDifference.get("seconds")}` 
    } else {
        timeDifferenceFormatted = timeDifference + " segundos"
    }   

    return timeDifferenceFormatted
}

function calculateFocus(focusValues){
    const stringValue = ["Péssimo", "Ruim", "Médio", "Bom", "Ótimo"]

    const sum = focusValues.reduce((total, num) => {
        return total += num
    })
    const average = Math.round(sum/focusValues.length)

    return stringValue[average-1]
}


function getTimeOutStringFormatted(tempoDecorrido, tempoTotal) {
    const timeDifference = moment(tempoDecorrido.replace('h', ''), "H:mm:ss").diff(moment(tempoTotal.replace('h', ''), "H:mm"), "seconds")
    const totalTimeInSecs = moment.duration(tempoTotal.replace('h', ''), "H:mm").asSeconds()
    
    const maxSecsAccepted = totalTimeInSecs*0.075
    
    if (timeDifference > maxSecsAccepted){
        return "*Tempo ultrapassado está acima da faixa esperada para uma atividade de " + tempoTotal
    } 

    return "*Tempo ultrapassado está dentro da faixa esperada para uma atividade de " + tempoTotal
}

export { calculateTimeOut, calculateFocus, getTimeOutStringFormatted }