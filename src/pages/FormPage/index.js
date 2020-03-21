import React, { useState, useEffect, } from 'react'
import { View, Text, TouchableOpacity, Animated, Dimensions, ImageBackground, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons'
import * as Animatable from 'react-native-animatable'
import FormQuestion from '../../components/FormQuestion'
import { updateTotalTime, updateNumberOfBreaks } from "../../negocio/CreateCicleManager";
import styles from './styles'


const { width, height } = Dimensions.get('screen')

export default function FormPage({ navigation }) {
    const translateY = new Animated.Value(0)
    const animatedEvent = Animated.event(
        [
            {
                nativeEvent: {
                    translationY: translateY,
                }
            },
        ],
        { useNativeDriver: false },
    )
    const AnimatableIcon = Animatable.createAnimatableComponent(Icon)

    const [ tempoDeAtividade, setTempoDeAtividade ] = useState ("2:00")
    const [ temporizador, setTemporizador ] = useState ("30")
    const [ tempoDeIntervalo, setTempoDeIntervalo ] = useState("5")
    const [ quantidadeDeIntervalos, setQuantidadeIntervalos ] = useState(4)
    const [ tempoTotal, setTempoTotal ] = useState("02h:20")

    useEffect( () => {
        let qntIntervalos = updateNumberOfBreaks(temporizador, tempoDeAtividade)

        setQuantidadeIntervalos(qntIntervalos)
    }, [tempoDeAtividade])

    useEffect( () => {
        let tempTotal = updateTotalTime(tempoDeAtividade, tempoDeIntervalo, quantidadeDeIntervalos)

        setTempoTotal(tempTotal)
    }, [tempoDeAtividade, quantidadeDeIntervalos, tempoDeIntervalo])

    function tempoDeAtividadeHandler(time){
        if (time === "30 min") {
            setTemporizador("15")
            setTempoDeAtividade("30 min")
            return
        } 
        setTemporizador("30")

        let tempoAtividadeString = time.replace('h', '')
        
        setTempoDeAtividade(tempoAtividadeString)  
    }

    function intervaloHandler(time){
        if (time.length === 5) {
            setTempoDeIntervalo("5")
        } else {
            setTempoDeIntervalo(time.slice(0,2))
        }
    }

    function startCicle() {
        const data = {
            tempoTotal,
            tempoDeAtividade,
            temporizador,
            quantidadeDeIntervalos,
            tempoDeIntervalo,
        }

        Animated.timing(translateY, {
            toValue:  0,
            duration: 0,
            useNativeDriver: true,
        }).start()

        navigation.navigate("RunningCiclePage", data)
    }

    function onHandlerPanStateChange(event) {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            // Usuário parou a animação
            let shouldCompleteScroll = false
            const { translationY } = event.nativeEvent
            
            if (translationY >= 100){
                shouldCompleteScroll = true
            }
    
            Animated.timing(translateY, {
                toValue: shouldCompleteScroll ? height : 0,
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                shouldCompleteScroll && startCicle()
            })
        }
    }

    return(
        <LinearGradient colors={['#182138', '#93ABE8']} style={{flex: 1}}>
        <View style={styles.container}> 
            <Animated.View 
                style={[
                    styles.topBackground,
                    {
                        transform: [{ 
                            translateY: translateY.interpolate({
                                inputRange: [0, height],
                                outputRange: [0, height],
                                extrapolate: 'clamp',
                            })
                        }]
                    }
                ]} 
            />
            
            <PanGestureHandler
                onGestureEvent={animatedEvent}
                onHandlerStateChange={onHandlerPanStateChange}
            >
                <Animated.View 
                    style={[
                        styles.header, 
                        { 
                            transform: [{ 
                                translateY: translateY.interpolate({
                                    inputRange: [-200, 0, height],
                                    outputRange: [-10, 0, height],
                                    extrapolate: 'clamp',
                                })
                            }],
                        }
                    ]}
                >
                    <ImageBackground style={ styles.headerBackgoundImg } source={require('../../assets/header.png')}>
                        <Image style={styles.logo} source={require('../../assets/Logo.png')} />
                        <Text style={styles.headerHelpText} >Arraste para iniciar</Text>
                    </ImageBackground>
                    <AnimatableIcon 
                        name={'keyboard-arrow-down'} 
                        size={30} 
                        color='#fff' 
                        animation={{from: {top: 0}, to: {top: 5}}} 
                        iterationCount={Infinity} 
                    />
                </Animated.View>
            </PanGestureHandler>

            <Animated.View
                style={[
                    styles.content,
                    { 
                        opacity: translateY.interpolate({
                            inputRange: [0, height/2], 
                            outputRange: [1, 0],
                        }),
                        transform: [{ 
                            translateY: translateY.interpolate({
                                inputRange: [0, height ],
                                outputRange: [0, height + 80],
                                extrapolate: 'clamp',
                            })
                        }] 
                    }
                ]}
            >
                <View 
                    style={styles.totalTimeContainer}>
                        <Text style={styles.totalTimeText}>Tempo Total</Text>
                        <Text style={styles.totalTime}>{tempoTotal}</Text>
                        <Text style={styles.info}>
                            {`${tempoDeAtividade.replace(':', "h:")} de atividade \n+\n ${quantidadeDeIntervalos} intervalo${quantidadeDeIntervalos>1?'s': ''} de ${tempoDeIntervalo} min`}
                        </Text>
                </View>

                <FormQuestion defaultValue="2h:00" onValueSelected={tempoDeAtividadeHandler} question="Tempo de atividade" options={
                    ["30 min", "1h:00", "1h:30", "2h:00", "2h:30", "3h:00", "3h:30", "4h:00", "4h:30", "5h:00",]} 
                />
                <FormQuestion defaultValue="5 min" onValueSelected={intervaloHandler} question="Tempo de intervalo" options={["5 min", "10 min", "15 min"]} />
                
                <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="cancel" size={0.07 * height}  color="#fff" />
                </TouchableOpacity>
            </Animated.View>
                
        </View>
        </LinearGradient>
    )
}


