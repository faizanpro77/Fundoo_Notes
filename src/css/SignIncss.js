import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container1: {
        width: '100%',
        height: '100%',
    },
    container2: {
        width: '80%',
        height: '80%',
        marginRight: '10%',
        marginLeft: '10%',
        justifyContent: 'center',
    },
    container3: {
        justifyContent: 'space-between',
        height: '45%'
    },
    TextInput: {
        borderWidth: 1,
        borderColor: 'gray',
        height: 50,
        borderRadius: 10,
        paddingLeft: 17
    },

    Forgottxt: {
        fontWeight: 'bold',
        fontSize: 17,
        color: '#ffa500',
        bottom: 10,
    },
    accountSignUpView: {
        flexDirection: 'row',
        top: 10

    },
    accounttxt: {
        paddingLeft: '15%'
    },
    SignUptxt: {
        paddingLeft: '2%',
        fontWeight: 'bold',
        fontSize: 17,
        color: '#ffa500'
    },

    regexredError: {
        color: 'red',
        height: 55,
        top: 4
    },

    buttonSignInView: {
        backgroundColor: '#ffa500',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    SignIntxt: {
        fontSize: 17
    }


});

export default styles