
import React, { Component } from 'react';

import { View, Text, Image, TextInput, Button, TouchableOpacity, Touchable } from 'react-native';
import styles from '../css/SignIncss';
import Global from '../css/Global';
import Snackbar from 'react-native-snackbar';
import { signIn,  } from '../services/UserServices';
import AsyncStorage from '@react-native-async-storage/async-storage';



class SignInScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Email: '',
            EmailError: '',
            Password: '',
            passwordError: '',

        }

    }

    navigateForgetPasswordScreen = () => {
        this.props.navigation.navigate('ForgotPassword')
    }

    navigateSignUp = () => {
        this.props.navigation.navigate('SignUp')
    }

    validateEmail = (val) => {
        this.setState({ Email: val });
        let rjx = /^[0-9a-zA-Z]+([._+-][0-9A-Za-z]+)*@[0-9A-Za-z]+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?$/
        let isValid = rjx.test(val)
        if (!isValid)
            this.setState({ EmailError: 'invalid Email' })
        else
            this.setState({ EmailError: '' })
    }

    validatePassword = (val) => {
        this.setState({ Password: val });
        let rjx = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[*.!@#$%^&(){}:'<>,.>/~`_+=|].).{8,}$/
        let isValid = rjx.test(val)
        if (!isValid)
            this.setState({ passwordError: 'invalid password' })
        else
            this.setState({ passwordError: '' })
    }

    onSubmit =  async() => {
        let response = await signIn(this.state.Email, this.state.Password)

            if(response == 'success'){

        Snackbar.show({
            text: 'login successfully',
            duration: Snackbar.LENGTH_INDEFINITE,
            action: {
                text: 'UNDO',
                textColor: 'green',
            },
        });
        this.props.navigation.navigate('DashBoard')
        this.AsyncStoragedata();

    } else {
            Snackbar.show({
                text: 'login fail',
                duration: Snackbar.LENGTH_INDEFINITE,
                action: {
                    text: 'UNDO',
                    textColor: 'red', 
        }})}

    }

      AsyncStoragedata = async()=>{
         console.log('hello')
        try{
          await AsyncStorage.setItem('Email',this.state.Email)
        }catch(err){
          console.log(err)
    
        }
      }
    


        
    render() {
        return (
            <View style={styles.container1}>
                <View style={Global.ImageLabelView}>
                    <Image source={require('G:/@react native bridgelabz/Fundoo_Notes_RN/src/Assets/images/noteslogo.png')}
                        style={Global.ImageLogo}>
                    </Image>
                    <Text style={Global.FundooNotestxt}>Fundoo Notes</Text>
                </View>

                <View style={styles.container2}>

                    <View style={styles.container3}>

                        <View>
                            <TextInput placeholder='Email Id'  style={styles.TextInput} onChangeText={this.validateEmail} />
                            <Text style={styles.regexredError}>{this.state.EmailError}</Text>
                        </View>

                        <View>
                            <TextInput placeholder='Password' secureTextEntry={true} style={styles.TextInput} onChangeText={this.validatePassword} />
                            <Text style={styles.regexredError}>{this.state.passwordError}</Text>
                        </View>

                        <TouchableOpacity onPress={this.navigateForgetPasswordScreen}>
                            <Text style={styles.Forgottxt}>Forgot password?</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.buttonSignInView} onPress={this.onSubmit} >
                            <Text style={styles.SignIntxt}>SignIn</Text>
                        </TouchableOpacity>

                        <View style={styles.accountSignUpView}>
                            <Text style={styles.accounttxt}>
                                Don't have an account?
                            </Text>
                            <TouchableOpacity onPress={this.navigateSignUp} >
                                <Text style={styles.SignUptxt}>
                                    Sign Up
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
export default SignInScreen
