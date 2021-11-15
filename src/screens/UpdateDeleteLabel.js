//udate label touchable txt firestore true false touch ontext then textinputt

import React, {useEffect, useState} from 'react';
import {Image, Text, TextInput, View, TouchableOpacity} from 'react-native';
import LabelCss from '../css/UpdateDeleteLabelCss';
import CheckBox, {CheckBoxBase} from '@react-native-community/checkbox';
import {
  addLabel,
  EditLabelForEditeLabelScreen1,
  getLabel,
  handleDeleteService,
  updateCheck,
} from '../services/NotesServices';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import IconFeather from 'react-native-vector-icons/Feather';
import IconeMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconeEntypo from 'react-native-vector-icons/Entypo';
import IconeMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconeAntDesign from 'react-native-vector-icons/AntDesign';

export default function UpdateDeleteLabel({props, route, navigation}) {
  const [labelText, setlabelText] = useState('');
  const [labelArray, setlabelArray] = useState([]);
  const [checked, setChecked] = useState(false);
  const [LabbelArr, setLabbelArr] = useState([]);
  const [labelArrDataState, setlabelArrDataState] = useState([]);
  const [crossPlus, setcrossPlus] = useState(true);
  const [editDelete, setEditDelete] = useState(true);
  const [labelTextEdit, setlabelTextEdit] = useState('');
  const [arr1, setarr1] = useState([]);

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
    //const unsubscribe = navigation.addListener('focus', () => {
    getLabel().then(res => {
      setlabelArray(res);
    });

    // return unsubscribe;
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

  const handleDelete = id => {
    console.log('=========+++++++++>', id);
    setEditDelete(true);
    handleDeleteService(id);

    getLabel().then(res => {
      setlabelArray(res);
    });
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
        <View
          style={{
            flex: 1,
            flexWrap: 'wrap',

            //flexDirection: 'row',
            // alignSelf: 'center',
          }}>
          {/* {console.log('labelArrayyyyyyyyyyyyy',labelArray)} */}
          {labelArray.map(label => {
            //  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@2',label);

            let arr = [];
            return (
              <View key={label.id} style={LabelCss.parentLabel}>
                <View style={LabelCss.labeltxtcheckView}>
                  {editDelete ? (
                    <IconeMaterialCommunityIcons
                      name="label-outline"
                      size={25}
                      color={'gray'}
                    />
                  ) : null}
                  <TouchableOpacity onPress={() => handleDelete(label.id)}>
                    {!editDelete ? (
                      <IconeAntDesign name="delete" size={25} />
                    ) : null}
                  </TouchableOpacity>

                  {/* <TouchableOpacity
                    onPress={() => handleInputData(label._data.Label)}>
                    <Text style={LabelCss.labelpriority}>
                      {label._data.Label}
                    </Text>
                  </TouchableOpacity> */}

                  <TextInput
                    // onChangeText={text => setlabelTextEdit(text)}
                    onChangeText={text => handleInputLabel(text, label.id)}
                    style={LabelCss.TextInput1}
                    //  {...arr=label._data.Label}
                    value={label._data.Label}
                  />

                  {/* <Text >{label.id}</Text> */}
                  <TouchableOpacity onPress={() => setEditDelete(false)}>
                    {editDelete ? (
                      <IconeMaterialIcons
                        style={LabelCss.editIcone}
                        name="edit"
                        size={25}
                      />
                    ) : null}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setEditDelete(true)}>
                    {!editDelete ? (
                      <IconFeather
                        style={LabelCss.check1}
                        name="check"
                        size={25}
                      />
                    ) : null}
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}
