import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const noteData = async (title, description) => {
  // let success = 'success';
  // let fail = 'fail';
  let response;

  //console.log('title......' + title);
  //console.log('description.......' + description);
  try {
    var value = await AsyncStorage.getItem('Email');
    // console.log('async..........', value);
  } catch (err) {
    console.log(err);
  }

  let userNoteData = {
    Emial: value,
    Title: title,
    Description: description,
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
  getNotes();
  return response;
};

//getNotes for user authentication

export const getNotes = async(callback) => {
  try {
    var emialdatavalue = await AsyncStorage.getItem('Email');
    console.log('async..........', emialdatavalue);
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
    console.log("res in note,,,,,,", noteList)
    return callback(noteList)
   }

