import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import {Avatar} from 'react-native-elements';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import DashBoardScreen from '../screens/DashBoardScreen';
import { handleProfileUpdate } from '../services/NotesServices';
//import { getUserProfileImage } from '../services/NotesServices';

export default function Profile(props) {
  const navigation = useNavigation();

  const [asyncEmail, setasyncEmail] = useState('');
  const [asyncFirstName, setasyncFirstName] = useState('');
  const [asyncLastName, setasyncLastName] = useState('');
  const [profileId, setprofileId] = useState('');
  const [image, setImage] = useState(
    'https://www.w3schools.com/howto/img_avatar.png',
  );
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [userData, setUserData] = useState(null);

  //const task = storageRef.putFile(uploadUri);

  const removeAsyncStorage = () => {
    AsyncStorage.clear();
    navigation.navigate('SignIn');
  };

  useEffect(async () => {
    var asyncEmailValue = await AsyncStorage.getItem('Email');
    var asyncFirstName = await AsyncStorage.getItem('firstName');
    var asyncLastName = await AsyncStorage.getItem('lastName');
    // console.log('async..........', asyncEmailValue);

    setasyncEmail(asyncEmailValue);
    setasyncFirstName(asyncFirstName);
    setasyncLastName(asyncLastName);
  }, [navigation]);

  const choosePhotoFromLibrary = () => {
    console.log('choosePhotoFromLibrary........');
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
    console.log('takePhotoFromCamerajfjjjjjjjjj');
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
        //  console.log('888888888888', data);

        data.docs.forEach(doc => {
          var docdata = doc.exists;

          // console.log('fppppppppppp', doc);
          //console.log('????????????', doc.data());
          setUserData(doc.data());
          // console.log('doccccccccccccccccccc',doc.data());
          setImage(doc.data().Image);
           //console.log('doc.iddddddddddddddddddddddddd',doc.data().Image);
           let asyncset =   AsyncStorage.setItem('userImage',doc.data().Image)

            setprofileId(doc.id);
        });
      });

                
  };

  useEffect(() => {
    //createImagecolleciton()
    getUserProfileImage();
  }, []);


  const handleUpdate = async url => {
    handleProfileUpdate(url,profileId)
     };

  
  const uploadimage = async () => {

    //console.log('faizan');
    // if(image = null){
    //   return null;
    // }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    setUploading(true);

    try {
      setUploading(false);
      setImage(null);

      const storageRef = storage().ref(filename);

      await storage().ref(filename).putFile(uploadUri);

      const url = await storageRef.getDownloadURL();

      // console.log('urlllllllllllllllllllll', url);
      // await createImagecolleciton(url);
      handleUpdate(url);
      setImage(url);

      return url;
    } catch (e) {
      console.log('catchrrrrrrrrrrrreeeeee', e);
      return null;
    }
  };

  return (
    <View style={{flexDirection:'row'}}>
      <View style={{marginLeft: 20,}}>
        {image != null ? (
          <TouchableOpacity>
            <Avatar
              style={{height: 35, width: 35, marginTop: 4}}
              rounded
              source={{
                uri: image,
              }}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={{flexDirection: 'column', marginLeft:40,}}>
        <Text style={{fontWeight: 'bold'}}>
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
          <Text style={{fontSize: 17}} onPress={removeAsyncStorage}>
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
          }}
          >
          <Text style={{fontSize: 17}}>
            Upload
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
