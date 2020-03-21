import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    timeContainer: {
        width: '90%',
        borderRadius: 4,
        backgroundColor: '#212B42',
        alignItems: 'center', 
    },
    separatorLine: {
        width: '80%',
        height: StyleSheet.hairlineWidth ,
        backgroundColor: '#574B90',
    },
    separator: {
        width: '40%',
        height: 5,
        backgroundColor: '#574B90',
    },
    breakInfoContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    frase: {
        fontSize: 16,
        textAlign: 'justify',
        paddingHorizontal: 15,
        color: '#ccc'
    },
    txtBtn: {
        color: '#fff',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 20,
        paddingVertical: 10, 
        paddingHorizontal: 15,
        borderRadius: 4,
        borderColor: '#FC5185',
        backgroundColor: '#FC5185',
    },
    
})

export default styles