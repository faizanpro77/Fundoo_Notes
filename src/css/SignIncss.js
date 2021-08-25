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
        height:50,
        borderRadius:10      
    },

    Forgottxt:{
        fontWeight:'bold',
        fontSize:17,
        color:'#ffa500'
    },
    accountSignUpView: {
        flexDirection: 'row'
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
    
    regexredError:{
        color:'red'
    },

    buttonSignInView:{
        backgroundColor:'#ffa500',
        height:50,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'


        
    }
    

});

export default styles