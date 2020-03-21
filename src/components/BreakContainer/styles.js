import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: "#ddd"
    },
    title: {
        fontSize: 30,
        color: '#555',
        marginBottom: 15,
    },
    textInput: {
        width: '80%', 
        paddingBottom: 5.5, 
        paddingHorizontal: 3,
        color: 'black',
        fontSize: 16,
        marginBottom: 15,
    },
    txtBtn: {
        marginBottom: 8, 
        fontSize: 16,
        padding: 10, 
        backgroundColor: "#574B90",
        borderRadius: 4,
        color: 'white',
    }

})

export default styles