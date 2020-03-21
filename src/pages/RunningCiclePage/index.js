import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, BackHandler, } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Modal from "react-native-modal"
import ProgressBar from 'react-native-progress/Bar'
import TimeBox from '../../components/TimeBox'
import BreakIconsContainer from '../../components/BreakIconsContainer'
import BreakContainer from '../../components/BreakContainer'
import { scheduleBreakStartNotification, cancellAllNotifications, scheduleCicleFinishedNotification } from '../../Notification.config'
import moment from 'moment'
import styles from './styles'

const json =  require("../../assets/frases.json")

let workTimeStart = null
let cicleTimeStart = null
let temporizadorEmPausa = null

export default function RunningCiclePage({ route, navigation }){
    navigation.setOptions({
        animationEnabled: false, 
    })

    let { tempoTotal, tempoDeAtividade, temporizador, quantidadeDeIntervalos, tempoDeIntervalo, } = route.params
    temporizador = temporizador*60 //segundos
    // temporizador = 2
    
    function handler () {
        cancellCicle()
        return true
    }

    navigation.addListener('focus', payload => {
        BackHandler.addEventListener('hardwareBackPress', handler)
    })
    

    const [tempoDecorrido, setTempoDecorrido] = useState('0h:0:0')
    const [breakProgress, setBreakProgress] = useState(0)
    const [modalBreakVisible, setModalBreakVisible] = useState(false)
    const [lastWorkingCicle, setLastWorkingCicle] = useState(false)
    const [modalTitle, setModalTitle] = useState("Intervalo 1")
    const [intervalosPassados, setIntervalosPassados] = useState(0)
    const [fraseMotivacional, setFraseMotivacional] = useState("")
    const [pauseActive, setPauseActive] = useState(false)
    const [focusValues, setFocusValues] = useState([])

    //Seta notificação do primeiro intervalo e algumas configs
    useEffect(() => {
        //Notification
        scheduleBreakStartNotification(temporizador)

        workTimeStart = moment()
        cicleTimeStart = moment()

        setBreakProgress(0)
        setFocusValues([])
        setIntervalosPassados(0)
        setLastWorkingCicle(false)
        setModalBreakVisible(false)
        setModalTitle("Intervalo 1")
        setPauseActive(false)
        setTempoDecorrido("0h:0:0")
        setFraseMotivacional(json.frases[Math.floor(Math.random() * json.frases.length)].texto)

        navigation.addListener('blur', payload => {
            BackHandler.removeEventListener('hardwareBackPress', handler)
        })
        
        return () => {
            cancellAllNotifications()
        }
    }, [])

    //Timer que fica rodando desde o tempo que o ciclo começou
    useEffect(() => {
        let timer = null

        timer = setInterval(() => {
            let now = moment()
            let secsPassedSinceCicleStarted = now.diff(cicleTimeStart, 'seconds')
            
            let tempoPassado = moment.duration(secsPassedSinceCicleStarted, 'seconds')
            setTempoDecorrido(`${tempoPassado.hours()}h:${tempoPassado.minutes()}:${tempoPassado.seconds()}`)        
        }, 1000)

        return () => clearInterval(timer)
    }, [tempoDecorrido])

    // Timer do intervalo, atualiza a barra de progresso e quando cheia seta mais um nos Intervalos Passados
    useEffect(() => {
        let breakTimer = null
        
        if (pauseActive) {
            return
        }

        if (breakProgress < 1) {
            breakTimer = setInterval(() => {
                let now = moment()
                let secsSinceWorkTimeStarted = now.diff(workTimeStart, 'seconds')
                setBreakProgress(secsSinceWorkTimeStarted/temporizador) // SecsPassed / Temporizador in secs
            }, 1000)
        } else {
            clearInterval(breakTimer)
            setIntervalosPassados(intervalosPassados + 1)
        } 

        return () => clearInterval(breakTimer) 
    }, [breakProgress, pauseActive])

    // Verifica se deve abrir o model de intervalo ou se já é o fim do ciclo
    useEffect(() => {
        if (intervalosPassados > quantidadeDeIntervalos){
            setLastWorkingCicle(true)
        } else if (intervalosPassados > 0){
            openBreakModel()
        }
    }, [intervalosPassados])

    // Se for o fim do ciclo abre o model para o fim do ciclo
    useEffect(() => {
        if (lastWorkingCicle){
            setModalTitle(`Fim do Ciclo`)            
            setModalBreakVisible(true)
        }
    }, [lastWorkingCicle])

    // Cancela todas as notificações e para o progresso de tempo. Temporizador em pausa salva o tempo que a pausa começou.
    useEffect(() => {
        if (pauseActive) {
            cancellAllNotifications()
            
            temporizadorEmPausa = moment()
        }
    }, [pauseActive])

    useEffect(() => {
        if (lastWorkingCicle){
            finishCicle()
        }
    }, [focusValues])

    // Abre model de intervalo
    function openBreakModel(){
        setModalTitle(`Intervalo ${intervalosPassados}`)            
        setModalBreakVisible(true) 
    }

    // Função chamada quando o model é fechado. Faz o schedule apropriado da próxima notificação que vai vim (outro intervalo || fim do ciclo)
    function closeBreakModal(){
        cancellAllNotifications()
        if (intervalosPassados >= quantidadeDeIntervalos){
            //Notification scheduled for the last working cicle
            scheduleCicleFinishedNotification(temporizador)
        } else {
            //Break Notification 
            scheduleBreakStartNotification(temporizador)
        }    

        // Restarting timer
        workTimeStart = moment()
    
        setModalBreakVisible(false)         
        setBreakProgress(0)
    }

    // Função chamada quando o model do ultimo ciclo e fechado. Envia para a tela de fim do ciclo
    function finishCicle(){
        cancellAllNotifications()        
        BackHandler.removeEventListener('hardwareBackPress', handler)
        setModalBreakVisible(false)
        navigation.navigate('FeedbackPage', {tempoTotal, tempoDecorrido, tempoDeAtividade, focusValues,})
    }

    // Função que retira da pausa. Corrige a barra de progresso com o tempo que ficou em pausa, e schedule as notificações com o tempo restante de trabalho
    function playScreen(){
        let temporizadorAuxiliarNotificacao = ((1-breakProgress) * temporizador) - 2
        if ( temporizadorAuxiliarNotificacao <=2 ) {
            temporizadorAuxiliarNotificacao = 0
        } 

        temporizadorEmPausa = moment().diff(temporizadorEmPausa, "milliseconds")
        
        workTimeStart.add(temporizadorEmPausa, "milliseconds")
        
        if (intervalosPassados >= quantidadeDeIntervalos){
            // Notification ciclo final
            scheduleCicleFinishedNotification(temporizadorAuxiliarNotificacao)
        } else {
            // Notification intervalo com o tempo restante
            scheduleBreakStartNotification(temporizadorAuxiliarNotificacao)
        }

        setPauseActive(false)
    }

    // Função que reseta tudo
    function reloadScreen(){
        Alert.alert(
            "",
            "Tem certeza que deseja reiniciar?",
            [
                {
                    text: "Cancelar", onPress: () => {return}
                },
                {
                    text: "Sim", onPress: () => {
                        cancellAllNotifications()
                        //Notification
                        scheduleBreakStartNotification(temporizador)
                                 
                        workTimeStart = moment()
                        cicleTimeStart = moment()
                 
                        setBreakProgress(0)
                        setIntervalosPassados(0)
                        setLastWorkingCicle(false)
                        setPauseActive(false)
                }
            }
        ],
        {cancelable: true}
        )
    }
    
    // Cancelar ciclo
    function cancellCicle(){
        Alert.alert(
            "",
            "Tem certeza que deseja retornar? Irá perder todo o progresso",
            [
                {
                    text: "Não", onPress: () => {return}
                },
                {
                    text: "Sim", onPress: () => {
                        cancellAllNotifications()
                        navigation.goBack()
                }
            }
        ],
        {cancelable: true}
        )
    }

    return(
        <LinearGradient colors={["#303A52","#1A2236" ]} style={styles.container}>
            
            <View style={styles.timeContainer}>
                {/* Horario de Brasilia */}
                <TimeBox title="Tempo Total do Ciclo" hour={tempoTotal} />
                <View style={styles.separatorLine} />
                <TimeBox title="Tempo Decorrido" hour={tempoDecorrido} /> 
            </View>
            <View style={[styles.separator, {alignSelf: 'flex-start',}]} />

            <View style={styles.breakInfoContainer} >
                <Text style={{ fontSize: 24, color: 'white', marginBottom: 10, }}>Intervalos</Text>
                <ProgressBar 
                    progress={breakProgress} 
                    style={{marginBottom: 20}}
                    borderRadius={1} 
                    borderColor="#574B90" 
                    borderWidth={2} 
                    color="#FC5185" 
                    width={250} 
                    height={15}
                    useNativeDriver={true} 
                />
                <BreakIconsContainer breakCounter={quantidadeDeIntervalos} finishedBreaks={intervalosPassados} pauseActive={pauseActive}/>

            </View>
            
            <View style={[styles.separator, {alignSelf: 'flex-end',}]} />

            <View style={{width: '50%', flexDirection: 'row', justifyContent: 'space-around'}}>
                { !pauseActive && 
                    <TouchableOpacity onPress={() => setPauseActive(true)}>
                        <Icon name="pause" color="#fff" size={60} />
                    </TouchableOpacity> }
                { pauseActive && 
                    <TouchableOpacity onPress={playScreen}>
                        <Icon name="play-arrow" color="#fff" size={60} />
                    </TouchableOpacity> }
                <TouchableOpacity onPress={reloadScreen}>
                    <Icon name="refresh" color="#fff" size={60} />
                </TouchableOpacity>
            </View>
                

            <Text style={styles.frase}>{fraseMotivacional}</Text>

            <TouchableOpacity onPress={cancellCicle}>
                <Text style={styles.txtBtn}>Cancelar</Text>
            </TouchableOpacity>
            
            <Modal 
                isVisible={modalBreakVisible}
                backdropOpacity={0.6}
                useNativeDriver={true}
                onBackButtonPress={() => {
                    cancellCicle()
                    return true
                }}
            >
                <BreakContainer 
                    closeModal={closeBreakModal} 
                    setFocusValue = { value => {setFocusValues([...focusValues, value])} }
                    breakTime={tempoDeIntervalo} 
                    title={modalTitle} 
                    lastWorkingCicle={lastWorkingCicle}
                    finishCicle={finishCicle} 
                />
            </Modal>
        </LinearGradient>
    )
}

