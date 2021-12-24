//udate label touchable txt firestore true false touch ontext then textinputt

import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import LabelCss from '../css/UpdateDeleteLabelCss';
//import CheckBox, {CheckBoxBase} from '@react-native-community/checkbox';
import {
  addLabel,
  // EditLabelForEditeLabelScreen1,
  getLabel,
  handleDeleteService,
  updateCheck,
} from '../services/NotesServices';
//import {NavigationContainer, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import IconFeather from 'react-native-vector-icons/Feather';
import IconeMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconeEntypo from 'react-native-vector-icons/Entypo';
import IconeMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconeAntDesign from 'react-native-vector-icons/AntDesign';
import AdditeDeleteLabelCard from '../Component/AdditeDeleteLabelCard';

export default function UpdateDeleteLabel({props, route, navigation}) {
  const [labelText, setlabelText] = useState('');
  const [labelArray, setlabelArray] = useState([]);
  const [checked, setChecked] = useState(false);
  //const [LabbelArr, setLabbelArr] = useState([]);
  //const [labelArrDataState, setlabelArrDataState] = useState([]);
  const [crossPlus, setcrossPlus] = useState(true);
  ///const [editDelete, setEditDelete] = useState(true);
  const [labelTextEdit, setlabelTextEdit] = useState('');
  //const [arr1, setarr1] = useState([]);
  //const [LabelName, setLabelName] = useState('');

  // const navigation = useNavigation();

  //console.log('checked1',checked);

  var addLabelIntoFirbase = async () => {
    let LabelResponse = await addLabel(labelText, checked);
    getLabel().then(res => {
      setlabelArray(res);
    });
  };

  var labelForCreateScreen = () => {
    let filterLabelArray = [];
    labelArray.map(filterlabel => {
      if (filterlabel._data.CheckBox === true) {
        filterLabelArray.push(filterlabel._data.Label);
      }
    });
    //  console.log('filterlabelllllllllllllllllllllll',filterLabelArray);
    navigation.navigate('dashBoard', {LabbelArr: filterLabelArray});
  };

  const updadateidvalue = (id, newValue) => {
    updateCheck(id, newValue);

    getLabel().then(res => {
      setlabelArray(res);
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getLabel().then(res => {
        console.log('ressssss',res);
        setlabelArray(res);
      });

      return unsubscribe;
    });
  }, []);

  const handleCrossCheck = () => {
    // console.log('=============>');
    setcrossPlus(true);
    setlabelText('');
  };

  const setText = text => {
    setlabelText(text);
    setcrossPlus(false);
  };

  const onFocus = () => {
    setcrossPlus(false);
  };

  const handleInputLabel = (Text, id) => {
    let inputNewData = {
      Label: Text,
    };

    setlabelTextEdit(Text);
    firestore().collection('Label').doc(id).update(inputNewData);

    getLabel().then(res => {
      setlabelArray(res);
    });

    // console.log('=============---------->', Text);

    console.log('=============---------->', labelTextEdit);
  };

  const handleInputData = data => {
    console.log('|||||||||||||||', data);
  };

  return (
    <View style={LabelCss.container1}>
      <View style={LabelCss.container2}>
        <View style={LabelCss.arrowinputlabel}>
          <TouchableOpacity onPress={labelForCreateScreen}>
            <Image
              style={LabelCss.arrowpic}
              source={require('../Assets/icons/backArrow.png')}
            />
          </TouchableOpacity>

          <Text style={LabelCss.Editlabels}>Edit labels</Text>
        </View>
        <View style={LabelCss.plusview}>
          <TouchableOpacity onPress={() => setcrossPlus(false)}>
            {crossPlus ? (
              <IconFeather name="plus" size={25} color="gray" />
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCrossCheck()}>
            {!crossPlus ? (
              <IconeEntypo name="cross" size={25} color="gray" />
            ) : null}
          </TouchableOpacity>

          <TextInput
            // caretHidden={false}
            onFocus={onFocus}
            placeholder="Create new label"
            style={LabelCss.TextInput}
            onChangeText={text => setText(text)}
            value={labelText}
          />

          <TouchableOpacity
            onPress={() => {
              addLabelIntoFirbase();
            }}>
            {!crossPlus ? (
              <IconFeather style={LabelCss.check} name="check" size={25} />
            ) : null}
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, padding: 30, marginBottom: 10}}>
          <FlatList
            data={labelArray}
            renderItem={({item}) => <AdditeDeleteLabelCard {...item} />}
            keyExtractor={item => item.id}
            
          />
        </View>
      </View>
    </View>
  );
}
