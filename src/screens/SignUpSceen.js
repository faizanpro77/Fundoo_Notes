import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from '../css/SignUpcss';
import Global from '../css/Global';
import {signUp} from '../services/UserServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createImagecolleciton} from '../services/NotesServices';
import SQLite from 'react-native-sqlite-storage';
const db = SQLite.openDatabase(
    {
        name: 'MainDB',
        location: 'default',
    },
    () => { },
    error => { console.log(error) }
);
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
    };
    this.createTable();
  }

  navigateSignIn = () => {
    this.props.navigation.navigate('SignIn');
  };

  validateFirstName = val => {
    this.setState({firstName: val});
    // this.setState({ firstName:val})
    let rjx = /^[A-Z][a-z]{1,}$/;
    let isValid = rjx.test(val);
    if (!isValid) this.setState({firstNameError: 'invalid firstName'});
    else this.setState({firstNameError: ''});
  };

  validatelastName = val => {
    this.setState({lastName: val});
    let rjx = /^[A-Z][a-z]{2,}$/;
    let isValid = rjx.test(val);
    if (!isValid) this.setState({lastNameError: 'invalid lastName'});
    else this.setState({lastNameError: ''});
  };

  validateEmail = val => {
    this.setState({Email: val});
    let rjx =
      /^[0-9a-zA-Z]+([._+-][0-9A-Za-z]+)*@[0-9A-Za-z]+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?$/;
    let isValid = rjx.test(val);
    if (!isValid) this.setState({EmailError: 'invalid email'});
    else this.setState({EmailError: ''});
  };

  validatePassword = val => {
    this.setState({Password: val});
    let rjx =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[*.!@#$%^&(){}:'<>,.>/~`_+=|].).{8,}$/;
    let isValid = rjx.test(val);
    if (!isValid) this.setState({PasswordError: 'invalid password'});
    else this.setState({PasswordError: ''});
  };

  onSubmit = async () => {

    this.getData()
    let signUpData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      Emial: this.state.Email,
      Password: this.state.Password,
    };
    let response = signUp(signUpData);
    this.AsyncStoragedata();
    createImagecolleciton();
  };

  
  
  AsyncStoragedata = async () => {
    try {
      await AsyncStorage.setItem('Email', this.state.Email);
      await AsyncStorage.setItem('firstName', this.state.firstName);
      await AsyncStorage.setItem('lastName', this.state.lastName);
    } catch (err) {
      console.log(err);
    }
    db.transaction(async(tx)=>{
      await  tx.executeSql(
            "INSERT INTO Users (FirstName,LastName)VALUES(?,?)",
            [this.state.firstName,this.state.lastName]
        )
    })

   };

 

    createTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS "
            + "Users "
            + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, FirstName TEXT, LastName TEXT);"
        )
    })
}

  componentDidMount() {
   
  }


  getData=()=>{
    db.transaction((tx) => {
        tx.executeSql(
            "SELECT FirstName, LastName FROM Users",
            [],
            (tx, results) => {
                var len = results.rows.length;
                if (len > 0) {
                    console.log('grater than 0 jokes a part' ,len);
                    var userFirstName = results.rows.item(1).FirstName;
                    var userLastNamee = results.rows.item(0).LastName;
                    console.log('userFirstNameuserFirstName',userFirstName);
                }
                
            }
        )
    })





    //   db.transaction((tx)=>{
    //       tx.executeSql(
    //           "SELECT FirstName,LastName FROM Users",
    //           [],
    //           (tx,results)=>{
    //               var len=results.rows.length;
    //               if(len >0){
    //                var userFirstName = results.rows.item(0).FirstName;
    //                var userLastNamee = results.rows.item(0).LastName;
    //                console.log('userFirstNameuserFirstName',userFirstName);
    //               }
                  
    //           }
    //       )
    //   })
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

        <View style={styles.container2}>
          <View style={styles.container3}>
            <View>
              <TextInput
                placeholder="First Name"
                style={styles.FirstNameInput}
                onChangeText={this.validateFirstName}
              />
              <Text style={styles.TextRedError}>
                {this.state.firstNameError}
              </Text>
            </View>

            <View>
              <TextInput
                placeholder="Last Name"
                style={styles.LastNameInput}
                onChangeText={this.validatelastName}
              />
              <Text style={styles.TextRedError}>
                {this.state.lastNameError}
              </Text>
            </View>

            <View>
              <TextInput
                placeholder="Email Id"
                style={styles.EmailIdInput}
                onChangeText={this.validateEmail}
              />
              <Text style={styles.TextRedError}> {this.state.EmailError} </Text>
            </View>

            <View>
              <TextInput
                placeholder="Password"
                secureTextEntry={true}
                style={styles.PasswordInput}
                onChangeText={this.validatePassword}
              />
              <Text style={styles.TextRedError}>
                {this.state.PasswordError}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.buttonSignUP}
              onPress={this.onSubmit}>
              <Text style={styles.SignUptxt}>SignUp</Text>
            </TouchableOpacity>

            <View style={styles.TextView}>
              <Text>Have an account with us?</Text>

              <TouchableOpacity onPress={this.navigateSignIn}>
                <Text style={styles.LoginText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default SignUpSceen;
