import { StyleSheet } from 'react-native'

import { systemWeights } from 'react-native-typography'

const styles = StyleSheet.create({
    questionContainer: {
        flexDirection: 'row',
        width: "85%",
        height: '17.5%',
        backgroundColor: "#36415B",
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 8,
    },
    timeContainer: {
        backgroundColor: '#3A496A',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    question: {
        maxWidth: 180,
        flexWrap: 'wrap',
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        ...systemWeights.light,
        letterSpacing: 0.5,
    },
    selectedValue: {
        color: '#FC5185',
        fontSize: 32,
        ...systemWeights.thin,
    },
    picker: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        opacity: 0,
    },
    pickerItem: {
        borderWidth: 2,
        borderBottomColor: '#000',
    }
})

export default styles