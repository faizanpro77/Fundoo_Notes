import React, {useEffect, useState} from 'react';
import {Image, Text, TextInput, View, TouchableOpacity} from 'react-native';
import LabelCss from '../css/LabelScreenCss';
import CheckBox, {CheckBoxBase} from '@react-native-community/checkbox';
import {addLabel, getLabel, updateCheck} from '../services/NotesServices';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
//import { CheckBox } from 'react-native-elements'

export default function LabelScreen() {
  const [labelText, setlabelText] = useState('');
  const [labelArray, setlabelArray] = useState([]);
  const [checked, setChecked] = useState(false);
  const[LabbelArr,setLabbelArr] = useState([])
  //console.log('checked1',checked);

  var addLabelIntoFirbase = async () => {
    let LabelResponse = await addLabel(labelText, checked);
    getLabel().then(res => {
      setlabelArray(res);
    });
  };

  const updadateidvalue = (id,newValue) => {
      updateCheck(id,newValue)
   }

  useEffect(() => {
    getLabel().then(res => {
      setlabelArray(res);
    });
  }, []);

  // const handleNavigateCreatScreen=()=>{
  //   console.log('-=================');
  // }
const navigation = useNavigation()

  return (
    <View style={LabelCss.container1}>
      <View style={LabelCss.container2}>
        <View style={LabelCss.arrowinputlabel}>
          
          <TouchableOpacity onPress={()=>{navigation.navigate('CreateNote',{LabbelArr:'LabbelArr'})}}>
          <Image
            style={LabelCss.arrowpic}
            source={require('../Assets/icons/backArrow.png')}
          />
          </TouchableOpacity >
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
            
            // console.log('labelllllllllll',label);
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
                  value={checked[label.id]}

                  onValueChange={newValue => {
                    // console.log('------------------------',checked['kIsrGMBNr0JKIew29nO7']);
                    // console.log('labelarraooooooooooooo',labelArray);
                    // console.log('labelArray.indexOf(label)',labelArray.indexOf(label) );
                    //console.log('labelbbbbbbbbbbbbbbbb',label._data);
                   // label._data.CheckBox=newValue
                   // console.log('newValueeeeeeeeeeeeeeeee',newValue);
                    //console.log('labelouterrrrrrrrrr',label._data);
                       updadateidvalue(label.id,newValue)

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
