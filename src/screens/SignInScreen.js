import React, {Component} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Touchable,
  StatusBar,
  Alert,
  ScrollView,
} from 'react-native';
import styles from '../css/SignIncss';
import Global from '../css/Global';
import Snackbar from 'react-native-snackbar';
import {signIn, signInOnlyForCheck} from '../services/UserServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import IconeZocial from 'react-native-vector-icons/Zocial';
//import { ScrollView } from 'react-native-gesture-handler';

//import AuthLoginDetails from '../Component/AuthLoginDetails';

class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: '',
      EmailError: '',
      Password: '',
      passwordError: '',
      GoogleEmail: '',
      GoogleCheckValue: 'true',
    };
  }

  navigateForgetPasswordScreen = () => {
    this.props.navigation.navigate('ForgotPassword');
  };

  navigateSignUp = () => {
    this.props.navigation.navigate('SignUp');
  };

  validateEmail = val => {
    this.setState({Email: val});
    let rjx =
      /^[0-9a-zA-Z]+([._+-][0-9A-Za-z]+)*@[0-9A-Za-z]+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?$/;
    let isValid = rjx.test(val);
    if (!isValid) this.setState({EmailError: 'invalid Email'});
    else this.setState({EmailError: ''});
  };

  validatePassword = val => {
    this.setState({Password: val});
    let rjx =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[*.!@#$%^&(){}:'<>,.>/~`_+=|].).{8,}$/;
    let isValid = rjx.test(val);
    if (!isValid) this.setState({passwordError: 'invalid password'});
    else this.setState({passwordError: ''});
  };

  onSubmit = async () => {

    let response = await signIn(this.state.Email, this.state.Password);
   // let checkresponse = await signInOnlyForCheck(this.state.Email, this.state.Password);
    //console.log('checkresponseeeeeeeeeeeeeeee',checkresponse);

    if (response === 'success') {
      await AsyncStorage.setItem('Email', this.state.Email);
      var emialdatavalue = await AsyncStorage.getItem('Email');
      console.log('asyncccccccc1..........', emialdatavalue);
      Snackbar.show({
        text: 'login successfully',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'UNDO',
          textColor: 'green',
        },
      });
      this.props.navigation.navigate('DashBoard');
      //  this.AsyncStoragedata();
    } else {
      Snackbar.show({
        text: 'login fail',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'UNDO',
          textColor: 'red',
        },
      });
    }
  };

  //   AsyncStoragedata = async()=>{
  //      console.log('hello')
  //     try{
  //       await AsyncStorage.setItem('Email',this.state.Email)
  //     }catch(err){
  //       console.log(err)

  //     }
  //   }

  componentDidMount() {
    GoogleSignin.configure({
      webClientId:
        '148030546764-d0nfpkdqg2p8uf1u2n64hk83gahdq70g.apps.googleusercontent.com',
    });
  }

  onGoogleButtonPress = async () => {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };

  render() {
    return (
      // <ScrollView>
      <View style={styles.container1}>
        <StatusBar
          backgroundColor={'white'}
          hidden={false}
          barStyle={'dark-content'}
        />

        <ScrollView>
          <View style={Global.ImageLabelView}>
            <Image
              source={require('G:/@react native bridgelabz/Fundoo_Notes_RN/src/Assets/images/noteslogo1.png')}
              style={Global.ImageLogo}></Image>
            <Text style={Global.FundooNotestxt}>Fundoo Notes</Text>
          </View>

          <View style={styles.container2}>
            <View style={styles.container3}>
              <TextInput
                placeholder="Email Id"
                style={styles.TextInput}
                onChangeText={this.validateEmail}
              />
              <Text style={styles.regexredError}>{this.state.EmailError}</Text>

              <TextInput
                placeholder="Password"
                secureTextEntry={true}
                style={styles.TextInput}
                onChangeText={this.validatePassword}
              />
              <Text style={styles.regexredError}>
                {this.state.passwordError}
              </Text>

              <TouchableOpacity onPress={this.navigateForgetPasswordScreen}>
                <Text style={styles.Forgottxt}>Forgot password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonSignInView}
                onPress={this.onSubmit}>
                <Text style={styles.SignIntxt}>SignIn</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  this.onGoogleButtonPress().then(userData => {
                    //console.log('Signed in with Google==!',userData.additionalUserInfo.profile.email),
                    this.setState(
                      {GoogleEmail: userData.additionalUserInfo.profile.email},
                      () => {
                        AsyncStorage.setItem('Email', this.state.GoogleEmail),
                          AsyncStorage.setItem(
                            'googleCheck',
                            this.state.GoogleCheckValue,
                          );
                        console.log(
                          'this.state.GoogleEmail',
                          this.state.GoogleCheckValue,
                        );
                      },
                    );

                    this.props.navigation.navigate('DashBoard');

                    Alert.alert('Signed in with Google');
                  })
                }
                style={styles.GoolebuttonSignInView}>
                <Image
                  style={styles.GoogleImg}
                  source={require('../Assets/icons/GoogleImg.png')}
                />
                <Text style={styles.GooleSignIntxt}>Sign in with Google</Text>
              </TouchableOpacity>

              {/* <AuthLoginDetails/> */}

              <TouchableOpacity
                //  onPress={() => this.googleSignout()}
                style={styles.facebookButtonView}>
                <IconeZocial name="facebook" size={25} color={'white'} />
                <Text style={styles.facebookSignIntxt}>
                  Login With FaceBook
                </Text>
              </TouchableOpacity>

              <View style={styles.accountSignUpView}>
                <Text style={styles.accounttxt}>Don't have an account?</Text>
                <TouchableOpacity onPress={this.navigateSignUp}>
                  <Text style={styles.SignUptxt}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* </ScrollView> */}
        </ScrollView>
      </View>
    );
  }
}
export default SignInScreen;
