import React, {Component} from 'react';

import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Touchable,
} from 'react-native';
import Global from '../css/Global';
import Snackbar from 'react-native-snackbar';
import {updatePassword} from '../services/UserServices';
import ResetPasswordScreenCss from '../css/ResetPasswordScreenCss';

class ResetPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Password1: '',
      Password2: '',
      passwordError1: '',
      passwordError2: '',
    };
  }

  validatePassword1 = val => {
    this.setState({Password1: val});
    let rjx =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[*.!@#$%^&(){}:'<>,.>/~`_+=|].).{8,}$/;
    let isValid = rjx.test(val);
    if (!isValid) {
      this.setState({passwordError1: 'invalid password'});
    } else {
      this.setState({passwordError1: ''});
    }
  };

  validatePassword2 = val => {
    this.setState({Password2: val});
    let rjx =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[*.!@#$%^&(){}:'<>,.>/~`_+=|].).{8,}$/;
    let isValid = rjx.test(val);
    if (!isValid) this.setState({passwordError2: 'invalid password'});
    else this.setState({passwordError2: ''});
  };

  onSubmit = async () => {
    let response = await updatePassword(this.state.Password1);
    //console.log('==+++++++++++++++',response)
    if (response) {
      Snackbar.show({
        text: 'password update',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'UNDO',
          textColor: 'green',
        },
      });
      this.props.navigation.navigate('SignIn');
    } else {
      Snackbar.show({
        text: 'password not updated',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'UNDO',
          textColor: 'red',
        },
      });
    }
  };

  render() {
    return (
      <View style={ResetPasswordScreenCss.container1}>
        <View style={Global.ImageLabelView}>
          <Image
            source={require('G:/@react native bridgelabz/Fundoo_Notes_RN/src/Assets/images/noteslogo1.png')}
            style={Global.ImageLogo}></Image>
          <Text style={Global.FundooNotestxt}>Fundoo Notes</Text>
        </View>

        <View style={ResetPasswordScreenCss.container2}>
          <View style={ResetPasswordScreenCss.container3}>
            <View>
              <TextInput
                placeholder="Password"
                secureTextEntry={true}
                style={ResetPasswordScreenCss.TextInput}
                onChangeText={this.validatePassword1}
              />
              <Text style={ResetPasswordScreenCss.regexredError}>
                {this.state.passwordError1}
              </Text>
            </View>

            <View>
              <TextInput
                placeholder="Confirm Password"
                secureTextEntry={true}
                style={ResetPasswordScreenCss.TextInput}
                onChangeText={this.validatePassword2}
              />
              <Text style={ResetPasswordScreenCss.regexredError}>
                {this.state.passwordError2}
              </Text>
            </View>

            <TouchableOpacity
              style={ResetPasswordScreenCss.buttonResetView}
              onPress={this.onSubmit}>
              <Text>Reset password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
export default ResetPasswordScreen;
