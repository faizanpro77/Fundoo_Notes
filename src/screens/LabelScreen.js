import React, {useEffect, useState} from 'react';
import {Image, Text, TextInput, View, TouchableOpacity} from 'react-native';
import LabelCss from '../css/LabelScreenCss';
import CheckBox, {CheckBoxBase} from '@react-native-community/checkbox';
import {
  addLabel,
  EditLabelForEditeLabelScreen1,
  getLabel,
  updateCheck,
} from '../services/NotesServices';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

//import { CheckBox } from 'react-native-elements'

export default function LabelScreen({props, route, navigation}) {
  ///********************************************************************************** */
  /* 2. Get the param */

  //const  BooleanDarawerData  = route?.params?.BooleanDarawerData;
  //console.log('itemId: {JSON.stringify(itemId)}',BooleanDarawerData ? JSON.stringify(BooleanDarawerData):null);

  const [labelText, setlabelText] = useState('');
  const [labelArray, setlabelArray] = useState([]);
  const [checked, setChecked] = useState(false);
  const [LabbelArr, setLabbelArr] = useState([]);
  const [labelArrDataState, setlabelArrDataState] = useState([]);

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
    navigation.navigate('CreateNote', {LabbelArr: filterLabelArray});
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

    // const {BooleanDarawerData} = props.params;
    // console.log(
    //   'BooleanDarawerBooleanDarawerBooleanDarawer',
    //   props.route.params,
    // );

    // });
    // return unsubscribe;
  }, []);

 
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
          <TextInput
            placeholder="Enter label name"
            style={LabelCss.TextInput}
            onChangeText={text => setlabelText(text)}
          />
        </View>
        <View style={LabelCss.plusview}>
          <TouchableOpacity
            onPress={() => {
              addLabelIntoFirbase();
            }}>
            <Image
              style={LabelCss.plusImage}
              source={require('../Assets/icons/plus2.png')}
            />
          </TouchableOpacity>
          <Text style={LabelCss.createtxt}>Create "{labelText}"</Text>
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
            return (
              <View key={label.id} style={LabelCss.labeltxtcheckView}>
                <Image
                  style={LabelCss.labelpic}
                  source={require('../Assets/icons/label1.png')}
                />
                <Text style={LabelCss.labelpriority}>{label._data.Label}</Text>

                <CheckBox
                  style={{marginLeft: 200}}
                  disabled={false}
                  // value={checked[label.id]}
                  value={label._data.CheckBox}
                  onValueChange={newValue => {
                    // console.log('------------------------',checked['kIsrGMBNr0JKIew29nO7']);
                    // console.log('labelarraooooooooooooo',labelArray);
                    // console.log('labelArray.indexOf(label)',labelArray.indexOf(label) );
                    //console.log('labelbbbbbbbbbbbbbbbb',label._data);
                    // label._data.CheckBox=newValue
                    // console.log('newValueeeeeeeeeeeeeeeee',newValue);
                    //console.log('labelouterrrrrrrrrr',label._data);
                    updadateidvalue(label.id, newValue);

                    setChecked({...checked, [label.id]: newValue});
                  }}
                />
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}
