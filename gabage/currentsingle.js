import React from 'react'
import { View, Text, TextInput, Button, Image, Touchable, TouchableOpacity } from 'react-native'
import ForgotPasswordCss from '../css/ForgotPasswordScreenCss'
import Global from '../css/Global'
class ForgotPasswordScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Email: '',
            EmailError: ''
        }
    }
    
    navigateSignIn = () => {
        this.props.navigation.navigate('SignIn')
    }

    validateEmail = (val) => {
        this.setState({ Email: val })
        //console.warn(this.state.Email)
        let rjx = /^[0-9a-zA-Z]+([._+-][0-9A-Za-z]+)*@[0-9A-Za-z]+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?$/
        let isValid = rjx.test(val)
        if (!isValid)
            this.setState({ EmailError: 'invalid Email' })
        else
            this.setState({ EmailError: '' })
    }

    

    

    render() {
        return (
            <View style={ForgotPasswordCss.container1}>

                  <View style={Global.ImageLabelView}>
                            <Image source={require('G:/@react native bridgelabz/Fundoo_Notes_RN/src/Assets/images/noteslogo.png')}
                                style={Global.ImageLogo}>
                            </Image>
                            <Text style={Global.FundooNotestxt}>Fundoo Notes</Text>
                        </View>

                <View style={ForgotPasswordCss.container2}>

                    <View style={ForgotPasswordCss.container3}>
                  

                        
                        <View>
                        <TextInput placeholder='Email Id' style={ForgotPasswordCss.TextInput} onChangeText={this.validateEmail} />
                        <Text style={ForgotPasswordCss.TextRedError}>{this.state.EmailError}</Text>
                        </View>

                        <TouchableOpacity style={ForgotPasswordCss.buttonReset}>
                            <Text>Reset Password</Text>
                        </TouchableOpacity>

                        <View style={ForgotPasswordCss.BackToSignIntxtView}>
                            <TouchableOpacity onPress={this.navigateSignIn} >
                                <Text style={ForgotPasswordCss.BackToSignIntxt}>Back to login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    };
}

export default ForgotPasswordScreen