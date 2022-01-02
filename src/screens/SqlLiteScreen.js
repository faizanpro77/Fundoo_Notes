import React, {Component} from 'react';

import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Touchable,
  Alert,
} from 'react-native';
import styles from '../css/SignIncss';
import Global from '../css/Global';
import SQLite from 'react-native-sqlite-storage';
const db = SQLite.openDatabase(
  {
    name: 'MainDB1',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);

class SqlLiteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      Age: '',
      SqlName: '',
      SqlAge: '',
    };
    
  }

  componentDidMount(){
    this.createTable();
  }
  setName = val => {
    this.setState({Name: val});
  };

  setAge = val => {
    this.setState({Age: val});
  };

  onSubmit = async () => {
    db.transaction(async tx => {
      await tx.executeSql('INSERT INTO Users1 (FirstName,Age)VALUES(?,?)', [
        this.state.Name,
        this.state.Age,
      ]);
    });
  };

  createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'Users1 ' +
          '(ID INTEGER PRIMARY KEY AUTOINCREMENT, FirstName TEXT, Age INTEGER);',
      );
    });
  };

  getData = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT FirstName, Age FROM Users1', [], (tx, results) => {
        var len = results.rows.length;
        if (len > 0) {
          console.log('grater than 0 jokes a part', len);
          var userName = results.rows.item(0).FirstName;
          var Age = results.rows.item(0).Age;
          this.setState({SqlName: userName, SqlAge: Age});
        }
      });
    });
  };

  removeData = () => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM Users1',
          [],
          this.setState({SqlName: '', SqlAge: ''}),
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  updateData = async () => {
    if (this.state.Name.length == 0) {
        Alert.alert('Warning!', 'Please write your data.')
    } else {
    try {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE Users1 SET FirstName=?',
          [this.state.Name],
          () => {
            Alert.alert('Success!', 'Your data has been updated.')
            

          },
          error => {
            console.log(error);
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
    }
  };

  render() {
    return (
      <View style={styles.container1}>
        <View style={Global.ImageLabelView}>
          <Image
            source={require('../Assets/images/noteslogo1.png')}
            style={Global.ImageLogo}></Image>
          <Text style={Global.FundooNotestxt}>
            User Name : {this.state.SqlName}
          </Text>
          <Text style={Global.FundooNotestxt}>
            User Age :{this.state.SqlAge}
          </Text>
        </View>

        <View style={styles.container2}>
          <View style={{ justifyContent: 'space-between',
        height: '60%'}}>
            <View>
              <TextInput
                placeholder="Name"
                style={styles.TextInput}
                onChangeText={this.setName}
              />
            </View>

            <View>
              <TextInput
                placeholder="Age"
                secureTextEntry={true}
                style={styles.TextInput}
                onChangeText={this.setAge}
              />
            </View>

            <TouchableOpacity
              style={styles.buttonSignInView}
              onPress={this.onSubmit}>
              <Text style={styles.SignIntxt}>add data</Text>
            </TouchableOpacity>

            <View style={{marginTop: 10}}>
              <TouchableOpacity
                style={styles.buttonSignInView}
                onPress={this.getData}>
                <Text style={styles.SignIntxt}>get data</Text>
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 10}}>
              <TouchableOpacity
                style={styles.buttonSignInView}
                onPress={this.removeData}>
                <Text style={styles.SignIntxt}>delete data</Text>
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 10}}>
              <TouchableOpacity
                style={styles.buttonSignInView}
                onPress={this.updateData}>
                <Text style={styles.SignIntxt}>update data</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default SqlLiteScreen;
