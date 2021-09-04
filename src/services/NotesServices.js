import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const noteData = async (title, description) => {
  // let success = 'success';
  // let fail = 'fail';
  let response;

  console.log('title......' + title);
  console.log('description.......' + description);
  try {
    var value = await AsyncStorage.getItem('Email');
    console.log('async..........', value);
  } catch (err) {
    console.log(err);
  }

  let userNoteData = {
    Emial: value,
    Title: title,
    Description: description,
  };

  await firestore()
    .collection('Notes')
    .add(userNoteData)
    .then(data => {
      //console.log('data]]]]]]]]]]', data)
    return response = 'success' 
  })
        .catch(error => {
      console.log('firebase error'+error);
      return error;
    });
  return response;
};
