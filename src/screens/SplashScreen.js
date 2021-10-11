import React, {Component} from 'react';
import {View, Image, Text} from 'react-native';
import Global from '../css/Global';
import styles from '../css/SignIncss';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import PushNotification from "react-native-push-notification";


export async function CheckEmailSplash() {
  var emialdata1 = await AsyncStorage.getItem('Email');

  // console.log("\\\\\\\\\\\\\\\\\\\\\\\\",emialdata1)
  if (emialdata1 != '') {
    let fial1 = 'fail';
    let success1 = 'success';
    let response1;

    await firestore()
      .collection('Users')
      .where('Emial', '==', emialdata1)
      .get()
      .then(data => {
        data.docs.forEach(element => {
          var elementdata = element.exists;
            //console.warn('elementelement',element);
            // console.warn('true true0000',elementdata);
          if (elementdata) return (response1 = success1);
          else return (response1 = fial1);
        });
      })
      .catch(error => {
        return error;
      });
    return response1;
  }
}
/************************************************************ */
export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
  }

  createChannels=()=>{
    console.log('splash timer');
    PushNotification.createChannel({
      channelId:'test-channel',
      channelName:'Test Channel'
    })
  }
  async componentDidMount() {

    this.createChannels()
    let response = await CheckEmailSplash();
    if (response == 'success') {
      //console.log('55555555555555555',response);
      setTimeout(() => {
        this.props.navigation.navigate('DashBoard');
      }, 300);
    } else {
      setTimeout(() => {
        this.props.navigation.navigate('SignIn');
      }, 300);
    }
  }

  render() {
    return (
      <View style={styles.container1}>
        <View style={Global.ImageLabelView}>
          <Image
            source={require('G:/@react native bridgelabz/Fundoo_Notes_RN/src/Assets/images/noteslogo.png')}
            style={Global.ImageLogo}></Image>
          <Text style={Global.FundooNotestxt}>Fundoo Notes</Text>
        </View>
      </View>
    );
  }
}
