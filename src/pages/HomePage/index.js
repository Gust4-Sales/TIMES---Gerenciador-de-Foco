import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal'
import { configureNotification } from '../../Notification.config'
import styles from './styles';

function Topic(props){
    return (
        <View style={styles.topicContainer}>
            <View style={styles.topicCircle}/>
            <Text style={styles.topic}>{props.text}</Text>
        </View>
    )
}

function Example({ closeModal }){
    return(
        <View style={styles.exampleContainer}>
            <View style={styles.exampleHeader}>
                <View style={[styles.exampleSeparator]}/>
                <Text style={styles.exampleTitle}>Exemplo</Text>
                <View style={styles.exampleSeparator}/>
            </View>
            
            <Text style={styles.exampleText}>
                {"\t"}{"\t"}Vitor deseja passar 1 hora estudando.{"\n"}{"\n"}
                {"\t"}{"\t"}Ele cria um ciclo de 1h de atividade, e apenas 5 minutos de intervalo, por 
                não se tratar de um período muito longo.{"\n"}{"\n"}
                {"\t"}{"\t"}Ao começar, Vitor desliga seu wifi e foca apenas nos seus estudos 
                até tocar o primeiro intervalo. Ele inspeciona como foi seu uso do tempo durante a atividade e 
                coloca seu foco nessa primeira parte como "Ótimo".{"\n"}{"\n"}
                {"\t"}{"\t"}Quando seu intervalo acaba, Vitor volta para atividade, mas se distrai um pouco com
                seu celular. Dessa vez, no fim do ciclo, avalia seu foco como "Médio".{"\n"}{"\n"}
                {"\t"}{"\t"}Ao terminar, Vitor verifica seu feedback para saber seu desempenho.
            </Text>
            <TouchableOpacity style={styles.exampleExitBtn} onPress={closeModal}>
                <Icon name="times-circle" size={35} color="#574B90"/>
            </TouchableOpacity>
        </View>
    )
}

export default function HomePage({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false)
    
    useEffect(() => {
        configureNotification()
    }, [])

    function closeModal(){
        setModalVisible(false)
    }


    return (
        <LinearGradient colors={['#192239', '#93ABE8']} locations={[0.15, 1]} style={styles.container}>
            <View style={styles.header}>
                <Image style={{width: 120, height: 35}} source={require('../../assets/Logo.png')} />
                <Image style={{width: 130, height: 130}} source={require('../../assets/icon-transparent.png')} />
            </View>            
            
            <View style={[styles.separator, {alignSelf: 'flex-start'}]} />

            <View style={styles.topics}>
                <Topic text="Defina o tempo de atividade e o tempo de intervalo do ciclo" />
                <Topic text="Foque apenas na sua atividade até o alarme do temporizador" />
                <Topic text="Inspecione o seu uso do tempo a cada parada" />
                <Topic text="Descanse durante os intervalos" />
                <Topic text="Continue com foco até o fim do ciclo" />
            </View>

            <View style={[styles.separator, {alignSelf: 'flex-end'}]} />

            <View style={styles.footer}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.frase}>Produza</Text>
                    <Text style={[styles.frase, {color: '#2A3551'}]}> MAIS</Text>
                    <Text style={styles.frase}> com</Text>
                    <Text style={[styles.frase, {color: '#2A3551'}]}> MENOS</Text>
                    <Text style={styles.frase}> estresse</Text>
                </View>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("FormPage")}>
                    <Text style={styles.textBtn}>Criar Ciclo</Text>
                </TouchableOpacity>

                
            </View>
            <TouchableOpacity style={styles.exampleBtn} onPress={() => setModalVisible(true)}>
                <Icon name="lightbulb" size={30} color="#eee" />
            </TouchableOpacity>


            <Modal 
                isVisible={modalVisible}
                backdropOpacity={0.8}
                useNativeDriver={true}
                onBackButtonPress={() => {
                    setModalVisible(false)
                    return true
                }}
                onBackdropPress={closeModal}
            >   
                <Example closeModal={() => closeModal()} />
            </Modal>
        </LinearGradient>
    )
}

