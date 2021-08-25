import { StyleSheet } from 'react-native'
const ForgotPasswordCss = StyleSheet.create({
    container1: {
        height: '100%',
        width: '100%'
    },
    container2: {
        width: '80%',
        height: '100%',
        marginLeft: '10%',
        marginRight: '10%',
        justifyContent: 'center',


    },
    container3: {
        justifyContent: 'space-between',
        height: '21%',//33


    },

    TextInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius:10,
        height:50
    },
    BackToSignIntxtView: {
        alignItems: 'center'

    },

    buttonReset:{
        backgroundColor:'#ffa500',
        height:50,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'

    },

    BackToSignIntxt: {
        fontWeight: 'bold',
        color: '#ffa500'

    },

    TextRedError: {
        color: 'red'
    }



})

export default ForgotPasswordCss;