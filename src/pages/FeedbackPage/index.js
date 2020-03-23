import React, { useEffect } from 'react'
import { StyleSheet, View, Text, BackHandler, } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import FeedbackResult from '../../components/FeedbackResult'
import { CommonActions } from '@react-navigation/native'
import { calculateTimeOut, calculateFocus, getTimeOutStringFormatted } from '../../negocio/FeedbackManager'


export default function FeedbackPage({ route, navigation }){
    navigation.setOptions({
        headerShown: true,
        headerTitle: "Feedback",
        headerTitleAlign: "center",
        headerTintColor: "#eee",
        headerStyle: {
            backgroundColor: "#1A2236",
        },
        headerTitleStyle: {
            fontSize: 30,
        },

        headerLeft: () => <Icon name="arrow-left" onPress={handler} color="#eee" size={25} 
            style={{marginLeft: 15, paddingVertical: 10, paddingHorizontal: 15}}/>
    })

    const { tempoTotal, tempoDecorrido, tempoDeAtividade, focusValues } = route.params
    // const tempoTotal = "1h:05"
    // const tempoDecorrido = "1h:10:50"
    // const tempoDeAtividade = "0h:30"
    // const focusValues = [5, 4, 3, 5]

    const timeDifferenceFormatted = calculateTimeOut(tempoDecorrido, tempoTotal)
    const focusResult = calculateFocus(focusValues)
    const timeOutFormatted = getTimeOutStringFormatted(tempoDecorrido, tempoTotal)
    
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handler)

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handler)
        }
    }, [])

    function handler(){
        navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                { name: 'HomePage' },
                { name: 'FormPage' }
              ],
            })
        )
        
        return true
    }

    return(
        <View style={styles.container}>
    
            <View style={styles.feedbackBox}>
                <Icon name="cat" size={30} color="#574B90" style={[styles.catFeed, {alignSelf: 'flex-end'}]}/>

                <FeedbackResult title="Tempo de Ciclo" value={tempoTotal} icon="clock"/>
                    <View style={styles.separator}/>
                <FeedbackResult title="Tempo decorrido" value={tempoDecorrido} icon="hourglass-end"/>
                    <View style={styles.separator}/>
                <FeedbackResult title="Tempo de Atividade" value={tempoDeAtividade} icon="user-clock"/>
                    <View style={styles.separator}/>
                <FeedbackResult title="Avaliação do Foco" value={focusResult} icon="brain"/>
                    <View style={styles.separator}/>
                <FeedbackResult title="Tempo ultrapassado*" value={timeDifferenceFormatted} icon="user-times"/>
            </View>
            <Text style={{color: "white", textAlign: 'justify', width: '90%'}}>{timeOutFormatted}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#212B42'
    },
    feedbackBox: {
        height: '75%',
        width:'92%',
        borderColor: '#5877E5',
        borderWidth: 2,
    },
    catFeed: {
        position: 'absolute',
        top: -34,
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        width: '90%',
        backgroundColor: '#5877E5',
        alignSelf: 'center'
    },
    
})