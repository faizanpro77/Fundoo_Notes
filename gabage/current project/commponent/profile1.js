import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asyncemail: '',
      asyncFirstName: '',
      asyncLastName: '',
    };
  }

  removeAsyncStorage = () => {
    AsyncStorage.clear();
    // this.props.navigation.navigate('SignIn');
  };

  async componentDidMount(){
      var asyncEmailValue = await AsyncStorage.getItem('Email');
      var _asyncFirstName = await AsyncStorage.getItem('firstName');
      var _asyncLastName = await AsyncStorage.getItem('lastName')
      console.log('async..........', asyncEmailValue);
      this.setState({asyncemail:asyncEmailValue,asyncFirstName:_asyncFirstName,asyncLastName:_asyncLastName})

   }

//  componentDidMount(){
     
//   //  this.focusListener = this.props.navigation.addListener('focus', () => {

//     var asyncEmailValue =  AsyncStorage.getItem('Email');
//     var _asyncFirstName =  AsyncStorage.getItem('firstName');
//     var _asyncLastName =  AsyncStorage.getItem('lastName')
//     console.log('async..........', asyncEmailValue);
//     this.setState({asyncemail:asyncEmailValue,asyncFirstName:_asyncFirstName,asyncLastName:_asyncLastName})
// });

//  }

 


  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{marginLeft: 20}}>
          <Image
            style={{height: 35, width: 35, marginTop: 4}}
            source={require('../Assets/icons/profile.png')}
          />
        </View>
        <View style={{flexDirection: 'column', marginLeft: 10}}>
          <Text style={{fontWeight: 'bold'}}>
            {this.state.asyncFirstName} {this.state.asyncLastName}
          </Text>
          <Text>{this.state.asyncemail}</Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#ffa500',
              height: 35,
              width: 230,
              marginTop: 20,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 17}} onPress={this.removeAsyncStorage}>
              Lougout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
