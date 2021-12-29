import AsyncStorage from '@react-native-async-storage/async-storage';
//import firestore from '@react-native-firebase/firestore';
import React, {Component} from 'react';
//import { DrawerActions} from '@react-navigation/native';
//import RBSheet from 'react-native-raw-bottom-sheet';
//import {Card} from 'react-native-elements';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
// import {gridlistvalue} from '../Component/DashboardCard';
import DashBoardCss from '../css/DashBoardCss';
import DashboardCard from '../Component/DashboardCard';
import Profile from '../Component/Profile';
//import {TextInput} from 'react-native-gesture-handler';
import { setAllCheckBoxValueFalse} from '../services/NotesServices';
//import {NodePath} from '@babel/traverse';
//import {Avatar} from 'react-native-elements';
import PinCard from '../Component/PinCard';
//import { firstNameLastName } from '../services/UserServices';

class DashBoardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      searchText: '',
      filterSearch: false,
      notesdata: [],
      filterArray: [],
      note: [],
      isSearching: false,
      searchText: '',
      note: [],
      filterArr: [],
      userprofile: 'https://www.w3schools.com/howto/img_avatar.png',
      imageUrlProps: 'https://www.w3schools.com/howto/img_avatar.png',
      avtarImage: 'https://www.w3schools.com/howto/img_avatar.png',
      userprofileData: null,
      userprofileCop: '',
      pinDataBoolean: true,
      firstIf: false,
    };
  }

  // gridView = () => {
  //   this.setState({
  //     open: !this.state.open,
  //   });
  // };

  navigateCreateNOteScreen = () => {
    setAllCheckBoxValueFalse();
    this.props.navigation.navigate('CreateNote');
  };

  async componentDidMount() {
    // this.focusListener = this.props.navigation.addListener('focus', function() {

    let asyimage = await AsyncStorage.getItem('userImage');

    this.setState({userprofile: asyimage});
    // });
  }

  handleProfiledata = imgurl => {
    // this.setState({imageUrlProps:imgurl})
    this.setState({userprofile: imgurl});
  };

  // CheckPin = val => {
  //   if (!this.state.firstIf) {
  //     this.setState({pinDataBoolean: val}, () =>
  //       console.log('++++++++++++++++++++>>>>', this.state.pinDataBoolean),
  //     );
  //     this.setState({firstIf: true});
  //   }
  // };
  handleGrideData = data => {
    console.log('gridddddddddddddddd', data);
    this.setState({
      open: data,
    });
  };
  render() {
    return (
      <View style={DashBoardCss.container1}>
        <StatusBar
          backgroundColor="white"
          hidden={false}
          barStyle="dark-content"
        />
        <Profile ListData={this.handleGrideData} />

        <ScrollView style={{marginBottom: 60}}>
          {/* {this.state.pinDataBoolean ? ( */}

          {/* <View > */}
          <Text style={{marginLeft: 30, marginTop: 20}}>Pin</Text>
          {/* <PinCard pinBoolean={this.CheckPin} /> */}
          <PinCard gridListdata={this.state.open} />

          <Text style={{marginLeft: 30, marginTop: 20}}>others</Text>
          {/* </View>
          ) : null} */}
          <DashboardCard
            gridListdata={this.state.open}
            seachNoteData={this.state.searchText}
          />
        </ScrollView>

        <View style={DashBoardCss.footerContainer}>
          <View style={DashBoardCss.footer}>
            <View>
              <TouchableOpacity>
                <Image
                  style={DashBoardCss.checkboxImg}
                  source={require('../Assets/icons/checkbox.png')}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity>
                <Image
                  style={DashBoardCss.brushImg}
                  source={require('../Assets/icons/brush.png')}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity>
                <Image
                  style={DashBoardCss.micImg}
                  source={require('../Assets/icons/mic.png')}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity>
                <Image
                  style={DashBoardCss.Img}
                  source={require('../Assets/icons/photo.png')}
                />
              </TouchableOpacity>
            </View>

            <View style={DashBoardCss.plusView}>
              <TouchableOpacity
                style={DashBoardCss.Touchablestyle}
                onPress={this.navigateCreateNOteScreen}
                //hitSlop={{ top: 200, bottom: 200, left: 200, right: 200 }}
              >
                <Image
                  style={DashBoardCss.plusImg}
                  source={require('../Assets/icons/add.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default DashBoardScreen;
