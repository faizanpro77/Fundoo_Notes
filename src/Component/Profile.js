import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import {Avatar} from 'react-native-elements';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {handleProfileUpdate} from '../services/NotesServices';
import DashBoardCss from '../css/DashBoardCss';
import {Card} from 'react-native-elements';
import Modal from 'react-native-modal';
import IconeEntypo from 'react-native-vector-icons/Entypo';


import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import MaterialCommunityIconsIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Profile(props) {
  const navigation = useNavigation();

  const [asyncEmail, setasyncEmail] = useState('');
  const [asyncFirstName, setasyncFirstName] = useState('');
  const [asyncLastName, setasyncLastName] = useState('');
  const [profileId, setprofileId] = useState('');
  const [image, setImage] = useState('');
  const [avtarImage, setAvtarImage] = useState(
    'https://www.w3schools.com/howto/img_avatar.png',
  );
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [userData, setUserData] = useState(null);
  const [propsImage, setPropsImage] = useState(
    'https://www.w3schools.com/howto/img_avatar.png',
  );
  // const[avtarImage,setavtarImage]=useState('https://www.w3schools.com/howto/img_avatar.png')
  const [open, setopen] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [checkGoogle, setcheckGoogle] = useState('');

  const removeAsyncStorage = () => {
    setModalVisible(!isModalVisible);
    AsyncStorage.clear();

    googleSignout();

    navigation.navigate('SignIn');
  };
  //--------------
  googleSignout = async () => {
    // var checkGoogle =await AsyncStorage.getItem('googleCheck')
    console.log('-----------------000000', checkGoogle);
    if (checkGoogle == 'true') {
      console.log('lougouttttttttttttttttt');
      try {
        await GoogleSignin.signOut().then(function () {
          console.log('Signout Succesfull');
          Alert.alert('Signout Succesful');
        });
        // this.setState({user: null}); // Remember to remove the user from your app's state as well
      } catch (error) {
        console.error(error);
      }
      auth().signOut();
    }
  };

  const firstNameLastName = async emailData => {
    if (emailData != '') {
      await firestore()
        .collection('Users')
        // Filter results
        .where('Emial', '==', emailData)
        .get()
        .then(data => {
          data.docs.forEach(async doc => {
            var docdata = doc.exists;
            setasyncFirstName(doc._data.firstName);
            setasyncLastName(doc._data.lastName);
            // console.log('5555555555555', doc._data.lastName);
            //console.log('66666666666', doc._data.lastName);
          });
        })
        .catch(error => {
          console.log('something went wrong', error);
        });
    }
  };

  //------------

  useEffect(async () => {
    var asyncEmailValue = await AsyncStorage.getItem('Email');
    firstNameLastName(asyncEmailValue);
    var asyncEmailValue = await AsyncStorage.getItem('Email');
    var asyncFirstName = await AsyncStorage.getItem('firstName');
    var asyncLastName = await AsyncStorage.getItem('lastName');
    var checkGoogle = await AsyncStorage.getItem('googleCheck');

    // console.log('profilefirsttttttttttttt',);
    setcheckGoogle(checkGoogle);
    setasyncEmail(asyncEmailValue);
    setasyncFirstName(asyncFirstName);
    setasyncLastName(asyncLastName);
  }, [navigation]);

  const choosePhotoFromLibrary = () => {
    // console.log('choosePhotoFromLibrary........');
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
  };

  const takePhotoFromCamera = () => {
    // console.log('takePhotoFromCamerajfjjjjjjjjj');
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
  };

  const getUserProfileImage = async () => {
    var asyncemail = await AsyncStorage.getItem('Email');
    // console.log('asyncemailllllllllll', asyncemail);
    const currentUser = await firestore()
      .collection('profile')
      .where('Email', '==', asyncemail)
      .get()
      .then(data => {
        data.docs.forEach(doc => {
          var docdata = doc.exists;

          setUserData(doc.data());
          setImage(doc.data().Image);
          let profileuser = doc.data().Image;
          let asyncset = AsyncStorage.setItem('userImage', profileuser);

          setprofileId(doc.id);
        });
      });
  };

  useEffect(() => {
    getUserProfileImage();
  }, []);

  const handleUpdate = async url => {
    handleProfileUpdate(url, profileId);
  };

  const uploadimage = async () => {
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    setUploading(true);

    try {
      setUploading(false);
      setImage(null);

      const storageRef = storage().ref(filename);
      await storage().ref(filename).putFile(uploadUri);
      const url = await storageRef.getDownloadURL();
      handleUpdate(url);
      setImage(url);
      let asyncset = AsyncStorage.setItem('userImage', url);

      props.profileImageprops(url);

      return url;
    } catch (e) {
      // console.log('catchrrrrrrrrrrrreeeeee', e);
      return null;
    }
  };
  const handlesearch = () => {
    navigation.navigate('SearchNote');
  };

  const gridView = () => {
    // console.log('revertttttttttt');
    let check = !open;
    props.ListData(check);
    setopen(check);
  };

  const refRBSheetProfile = useRef();
  return (
    <View>
      <View style={DashBoardCss.header}>
        <Card containerStyle={DashBoardCss.card}>
          <View style={DashBoardCss.navBar}>
            <View style={{flexDirection: 'row'}}>
              <View style={DashBoardCss.menueImgview}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                  <IconeEntypo name="menu" size={25} color="black" />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={handlesearch}>
                  <Text>Search your notes</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={DashBoardCss.listprofileview}>
              {open ? (
                <View style={DashBoardCss.listImgview}>
                  <TouchableOpacity onPress={() => gridView()}>
                  <MaterialCommunityIconsIcons
                      name="view-grid-outline"
                      size={25}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={DashBoardCss.listImgview}>
                  <TouchableOpacity onPress={() => gridView()}>
                    <MaterialCommunityIconsIcons
                      name="view-agenda-outline"
                      size={25}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              )}

              <View>
                <TouchableOpacity
                  onPress={() => setModalVisible(!isModalVisible)}>
                  <Image
                    style={DashBoardCss.profileImg}
                    source={{
                      uri: image ? image : avtarImage,
                    }}
                  />
                </TouchableOpacity>
                <Modal isVisible={isModalVisible}>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: 'white',
                      height: '40%',
                      borderRadius: 10,
                    }}>
                    <View style={{marginLeft: 20}}>
                      <TouchableOpacity
                        onPress={() => setModalVisible(!isModalVisible)}>
                        <IconeEntypo name="cross" size={25} color={'black'} />
                      </TouchableOpacity>
                      <Avatar
                        style={{height: 35, width: 35, marginTop: 15}}
                        rounded
                        source={{
                          uri: image ? image : avtarImage,
                        }}
                      />
                    </View>
                    <View style={{flexDirection: 'column', marginLeft: 20}}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 18,
                          marginLeft: 40,
                          color: 'crimson',
                        }}>
                        fundoo notes
                      </Text>
                      <Text style={{fontWeight: 'bold', marginTop: 10}}>
                        {asyncFirstName} {asyncLastName}
                      </Text>
                      <Text>{asyncEmail}</Text>
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
                        <Text
                          style={{fontSize: 17}}
                          onPress={removeAsyncStorage}>
                          Lougout
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={takePhotoFromCamera}
                        style={{
                          backgroundColor: '#ffa500',
                          height: 35,
                          width: 230,
                          marginTop: 20,
                          borderRadius: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={{fontSize: 17}}>Take photo</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={choosePhotoFromLibrary}
                        style={{
                          backgroundColor: '#ffa500',
                          height: 35,
                          width: 230,
                          marginTop: 20,
                          borderRadius: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={{fontSize: 17}}>choose from library</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={uploadimage}
                        style={{
                          backgroundColor: '#ffa500',
                          height: 35,
                          width: 230,
                          marginTop: 20,
                          borderRadius: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: 20,
                          alignItems: 'center',
                        }}>
                        <Text style={{fontSize: 17}}>Upload</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </View>
            </View>
          </View>
        </Card>
      </View>

      {}
    </View>
  );
}
