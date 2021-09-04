import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, Image } from 'react-native'
import styles from '../css/SignUpcss';
import Global from '../css/Global';
import { signUp } from '../services/UserServices';

class SignUpSceen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            firstNameError: '',
            lastName: '',
            lastNameError: '',
            Email: '',
            EmailError: '',
            Password: '',
            PasswordError: '',
          

        }
    }

    navigateSignIn = () => {
        this.props.navigation.navigate('SignIn')
    }

    validateFirstName = (val) => {
        this.setState({firstName:val});
         this.setState({ firstName:val})
        let rjx = /^[A-Z][a-z]{1,}$/
        let isValid = rjx.test(val)
        if (!isValid)
            this.setState({firstNameError: 'invalid firstName' })
        else
            this.setState({firstNameError: '' })

    }

    validatelastName = (val) => {
        this.setState({lastName:val});
        let rjx = /^[A-Z][a-z]{2,}$/
        let isValid = rjx.test(val)
        if (!isValid)
            this.setState({ lastNameError: 'invalid lastName' })
        else
            this.setState({ lastNameError: '' })
    }

    validateEmail = (val) => {
        this.setState({Email:val});
        let rjx = /^[0-9a-zA-Z]+([._+-][0-9A-Za-z]+)*@[0-9A-Za-z]+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?$/
        let isValid = rjx.test(val);
        if (!isValid)
            this.setState({ EmailError: 'invalid email' })
        else
            this.setState({ EmailError: '' })
    }

    validatePassword = (val) => {
        this.setState({Password:val});
        let rjx = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[*.!@#$%^&(){}:'<>,.>/~`_+=|].).{8,}$/
        let isValid = rjx.test(val);
        if (!isValid)
            this.setState({ PasswordError: 'invalid password' });
        else
            this.setState({ PasswordError: '' })
    }

    

    onSubmit = async() =>{
       // console.warn('hello')
        let signUpData = {
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            Emial:this.state.Email,
            Password:this.state.Password
        }

      let response = signUp(signUpData)
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
                    <TextInput placeholder='First Name' style={styles.FirstNameInput} onChangeText={this.validateFirstName}/>
                    <Text style={styles.TextRedError}>{this.state.firstNameError}</Text>
                    </View>

                    <View>
                    <TextInput placeholder='Last Name' style={styles.LastNameInput} onChangeText={this.validatelastName} />
                    <Text style={styles.TextRedError}>{this.state.lastNameError}</Text>
                    </View>

                    <View>
                    <TextInput placeholder='Email Id' style={styles.EmailIdInput} onChangeText={this.validateEmail} />
                    <Text style={styles.TextRedError}> {this.state.EmailError} </Text>
                    </View>

                    <View>
                    <TextInput placeholder='Password' secureTextEntry={true} style={styles.PasswordInput} onChangeText={this.validatePassword} />
                    <Text style={styles.TextRedError} >{this.state.PasswordError}</Text>
                    </View>

                    <TouchableOpacity style={styles.buttonSignUP} onPress={this.onSubmit}>
                            <Text style={styles.SignUptxt}>SignUp</Text>
                        </TouchableOpacity>


                    <View style={styles.TextView} >
                        <Text>
                            Have an account with us?
                        </Text>

                        <TouchableOpacity onPress={this.navigateSignIn}>
                            <Text style={styles.LoginText} >
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default SignUpSceen