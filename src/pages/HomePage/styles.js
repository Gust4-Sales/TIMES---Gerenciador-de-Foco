import { StyleSheet, StatusBar } from 'react-native'
import { systemWeights } from 'react-native-typography'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        height: '25%',
        marginTop: 5,
        alignItems: 'center',
        marginBottom: 15
    },
    separator: {
        width: '40%',
        height: 5,
        backgroundColor: '#eee',
    },
    topics: {
        height: '50%',
        width: '85%',
        alignItems: 'flex-start',
        // backgroundColor: '#000',
        justifyContent: 'space-around'
    },
    footer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    frase: {
        fontSize: 20,
        color: 'white',
        ...systemWeights.bold
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 12,
        backgroundColor: '#FC5185',
        borderRadius: 8,
    },
    textBtn: {
        fontSize: 20,
        marginRight: 5,
        color: 'white',
    },
    exampleBtn: {
        position: 'absolute',
        right: 10,
        top: 20,
        padding: 20,
        // backgroundColor: '#ddd',
    },

    // Topic Styles
    topicContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    topicCircle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#FC5185',
        marginRight: 10,
    },
    topic: {
        fontSize: 20,
        color: 'white',
    },

    // Example Styles
    exampleContainer: {
        // height: '70%',
        width: '98%',
        backgroundColor: '#ddddee',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    exampleHeader: {
        width: '100%',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'absolute',
        top: 0,
    },
    exampleSeparator: {
        width: '25%',
        height: 2,
        backgroundColor: '#574B90',
    },
    exampleTitle: {
        fontSize: 24,
        color: "#555",
    },
    exampleText: {
        fontSize: 16,
        marginTop: 45,
        marginBottom: 70,
        width: '90%',
        textAlign: 'justify',
        lineHeight: 18,
    },
    exampleExitBtn: {
        position: 'absolute',
        bottom: 0,
        padding: 10,
    }
})

export default styles