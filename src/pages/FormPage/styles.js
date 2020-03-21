import { StyleSheet, Dimensions, StatusBar } from 'react-native'

import { systemWeights } from 'react-native-typography'


const { width, height } = Dimensions.get("screen")

// #fc5185 rosa
const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: "transparent",
        alignItems: 'center',
    },
    topBackground: { 
        position: 'absolute', 
        height: '115%', 
        width: '100%', 
        backgroundColor: '#1A2236', 
        top: -height 
    },
    header:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerBackgoundImg: {   
        flexDirection: 'column',
        width, 
        height: 225,
        alignItems: 'center', 
        paddingTop: StatusBar.currentHeight/2,
    },
    logo: {
        height: 40,
        width: 120,
    },
    headerHelpText: {
        color: '#fff',
        letterSpacing: 1.5,
        fontSize: 15,
        marginBottom: StatusBar.currentHeight ,
        ...systemWeights.light,
    },
    content: {
        flex: 1,
        alignItems: 'center',   
        justifyContent: 'space-evenly',    
        zIndex: -1,
    },
    totalTimeContainer: {
        paddingHorizontal: 40,
        paddingVertical: 15,        
        backgroundColor: '#2A3551',
        borderRadius: 4,
        alignItems: 'center', 
        justifyContent: 'space-evenly',
    },
    totalTimeText: {
        color: '#fff',
        fontSize: 0.04*height,
        ...systemWeights.light,
    },
    totalTime:{
        color: '#FC5185',
        fontSize: 0.05*height,
        ...systemWeights.thin,
    },
    info:{
        color: '#fff',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 14,
    },
    
})

export default styles