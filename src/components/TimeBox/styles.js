import { StyleSheet } from 'react-native'

import { systemWeights } from 'react-native-typography'


const styles = StyleSheet.create({
    timeBox: {
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#ddd',
        paddingVertical: 10,
    },
    timeTitle: {
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
        ...systemWeights.light,
    },
    hour: {
        fontSize: 40,
        color: '#FC5185',
        ...systemWeights.thin,
    },
})

export default styles
