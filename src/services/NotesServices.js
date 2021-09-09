import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

//add title , notes ,clour,email,trash to firebase
export const noteData = async (title, description,color,trash,pin,archive) => {
 
  let response;

  //console.log('title......' + title);
  //console.log('description.......' + description);
 
    var value = await AsyncStorage.getItem('Email');
    // console.log('async..........', value);
 

  let userNoteData = {
    Emial: value,
    Title: title,
    Description: description,
    Colour:color,
    Trash:trash,
    Pin:pin,
    Archive:archive
  };

  await firestore()
    .collection('notes')
    .add(userNoteData)
    .then(data => {
      //console.log('data]]]]]]]]]]', data)
      return (response = 'success');
    })
    .catch(error => {
      console.log('firebase error' + error);
      return error;
    });
  return response;
};


//getNotes for user authentication
export const getNotes = async() => {
  try {
    var emialdatavalue =  await AsyncStorage.getItem('Email');
   // console.log('async..........', emialdatavalue);
  } catch (err) {
    console.log(err);
  }

  var noteList = [];

  await firestore()
    .collection('notes')
    .where('Emial', '==', emialdatavalue)
    .get()
    .then(value => {
      value.forEach(noteData => {
       // console.log('notedata in controller', noteData.data());
       noteList.push(noteData);
      });

    })
    .catch(error => {
      console.log('...........', error);
      return error;
    });

    return noteList;
  }
  

