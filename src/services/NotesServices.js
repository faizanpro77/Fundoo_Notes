import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

//add title , notes ,clour,email,trash to firebase
export const noteData = async (
  title,
  description,
  color,
  trash,
  pin,
  archive,
  addLabelDataArr,
  date,
  time,
  dateTimeChipBoolean,
  randomId
) => {
  let response;

  //console.log('title......' + title);
  //console.log('description.......' + description);

  var value = await AsyncStorage.getItem('Email');
  // console.log('async..........', value);

  let userNoteData = {
    Emial: value,
    Title: title,
    Description: description,
    Colour: color,
    Trash: trash,
    Pin: pin,
    Archive: archive,
    LabelArr: addLabelDataArr,
    Date: date,
    Time: time,
    DateTimeChipBoolean: dateTimeChipBoolean,
    RandomId:randomId
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

//getNotes after user authentication
export const getNotes = async () => {
  try {
    var emialdatavalue = await AsyncStorage.getItem('Email');
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
};

//update note data
export const editNoteDataUpdate = (
  key,
  title,
  description,
  color,
  trash,
  pin,
  archive,
  labelArrayfromLabelArr,
) => {
  let userNoteDataUpdate = {
    Title: title,
    Description: description,
    Colour: color,
    Trash: trash,
    Pin: pin,
    Archive: archive,
    LabelArr: labelArrayfromLabelArr,
   
  };

  firestore().collection('notes').doc(key).update(userNoteDataUpdate);
  // .then(data => {
  //   //console.log('data--------------------', data)
  //   return (response = 'success');
  // })
  // .catch(error => {
  //   console.log('firebase error update time' + error);
  //   return error;
  // });
 // console.log('77777777777', title);
};

export const deleteBooleanChipUpdate=(key,chipBoolean)=>{

  let editChipBoolean={
    DateTimeChipBoolean:chipBoolean
  }

  firestore().collection('notes').doc(key).update(editChipBoolean)
}

export const editNoteDataUpdateTimeDate = (key,date, time,timeDateBoolean) => {
let timeDateUpdate={
  Date: date,
  Time: time,
  DateTimeChipBoolean:timeDateBoolean
}

firestore().collection('notes').doc(key).update(timeDateUpdate)

};




//add label,checkBox data into firestore with email
export const addLabel = async (labelText, isSelected) => {
  console.log('99999999999999999999999', isSelected);
  var asyncEmail = await AsyncStorage.getItem('Email');

  let labelData = {
    Email: asyncEmail,
    Label: labelText,
    CheckBox: isSelected,
  };

  await firestore()
    .collection('Label')
    .add(labelData)
    .then(
      console.log('label success'),
      getLabel(),
      console.warn('label add success'),
    )
    .catch(error => {
      console.log('catchhhhhhhhhhhhhh', error);
      return error;
    });
};

//get user data from firestore by email
export const getLabel = async () => {
  var getasyncEmail = await AsyncStorage.getItem('Email');

  var LabelList = [];

  await firestore()
    .collection('Label')
    .where('Email', '==', getasyncEmail)
    .get()
    .then(value => {
      value.forEach(labelData => {
        LabelList.push(labelData);
        // console.log('7777777777777777 label get successful')
      });
    })
    .catch(error => {
      console.log('getLabel error', error);
      return error;
    });
  //console.log('LabelListarr',LabelList);
  return LabelList;
};

export const updateCheck = async (key, checkValue) => {
  let label = {
    CheckBox: checkValue,
  };

  await firestore().collection('Label').doc(key).update(label);
  // .then(data=>{console.log('dataupdateeeeeeeeeeeeee',data)})
};

export const createImagecolleciton = async () => {
  var asyncemail = await AsyncStorage.getItem('Email');

  await firestore()
    .collection('profile')
    .add({
      Email: asyncemail,
      Image: 'https://www.w3schools.com/howto/img_avatar.png' || '',
    })
    .then(() => {
      console.warn('user img added');
    })
    .catch(console.warn('user img not added'));
};

export const handleProfileUpdate = (url, profileId) => {
  var asyncemail = AsyncStorage.getItem('Email');

  // console.log('updatteeeeeeeee', url);

  let ImageData = {Image: url};
  //console.log('profileIddddddddddddd', profileId);
  firestore()
    .collection('profile')
    .doc(profileId)
    .update(ImageData)
    .then(() => {
      console.log('User Updated!');
      Alert.alert('Your profile has been updated successfully.');
    })
    .catch(error => console.log(error));
};

export const getNotesDataWithId = async () => {
  try {
    var emialdatavalue = await AsyncStorage.getItem('Email');
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
      value.forEach(doc => {
        const data = doc.data();
        data.id = doc.id;
        noteList.push(data);
      });
    })
    .catch(error => {
      console.log('...........', error);
      return error;
    });

  return noteList;
};

export const setAllCheckBoxValueFalse = () => {
  const ORDER_ITEMS = firestore().collection('Label');

  ORDER_ITEMS.where('CheckBox', '==', true)
    .get()
    .then(snapshots => {
      if (snapshots.size > 0) {
        snapshots.forEach(orderItem => {
          ORDER_ITEMS.doc(orderItem.id).update({CheckBox: false});
          // .then(console.log('77777777777777777success checkboc'))
        });
      }
    });
};

export const EditLabelForEditeLabelScreen1 = labelArrData2 => {
  // setlabelArrDataState(labelArrData2)
  // console.log('yyyyyyyyyyyyyyyy',labelArrData2)
  labelArrData2.map(labeldata => {
    // console.log('????????????',labeldata);
    const ORDER_ITEMS = firestore().collection('Label');

    ORDER_ITEMS.where('Label', '==', labeldata)
      .get()
      .then(snapshots => {
        if (snapshots.size > 0) {
          snapshots.forEach(orderItem => {
            ORDER_ITEMS.doc(orderItem.id).update({CheckBox: true});
          });
        }
      });
  });
};


export const generateRandomIdData = () => {
  let RandomNoteId = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
  
  //  let RandomNoteId = 1708
 // console.log('17088888888888888888', RandomNoteId);

  //this.setState({RandomId: RandomNoteId});
 firestore()
    .collection('notes')
    .where('RandomId', '==', RandomNoteId)
    .get()
    .then(data =>
      data.forEach(data => {
        this.generateRandomId();
      }),
    )
    .catch(error => console.log('cuserror', error));
    return RandomNoteId
};


export const updateNotificationId=(key,notificationPushId)=>{
  let notificationId = {
    RandomId:notificationPushId
  }
  firestore().collection('notes').doc(key).update(notificationId)
}