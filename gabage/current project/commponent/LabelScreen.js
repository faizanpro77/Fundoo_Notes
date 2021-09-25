import React, {useEffect, useState} from 'react';
import {Image, Text, TextInput, View, TouchableOpacity} from 'react-native';
import LabelCss from '../css/LabelScreenCss';
import CheckBox, {CheckBoxBase} from '@react-native-community/checkbox';
import {addLabel, getLabel} from '../services/NotesServices';
//import { CheckBox } from 'react-native-elements'

export default function LabelScreen() {
  const [labelText, setlabelText] = useState('');
  const [labelArray, setlabelArray] = useState([]);
  const [checked, setChecked] = useState(true);
  console.log(checked);

  var addLabelIntoFirbase = async () => {
    let LabelResponse = await addLabel(labelText, checked);
    getLabel().then(res => {
      setlabelArray(res);
    });
  };

  useEffect(() => {
    getLabel().then(res => {
      setlabelArray(res);
    });
  }, []);

  return (
    <View style={LabelCss.container1}>
      <View style={LabelCss.container2}>
        <View style={LabelCss.arrowinputlabel}>
          <Image
            style={LabelCss.arrowpic}
            source={require('../Assets/icons/backArrow.png')}
          />
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
          {labelArray.map(label => {
            
            // console.log('labelllllllllll',label);
            return (
              <View key={label.id} style={LabelCss.labeltxtcheckView}>
                <Image
                  style={LabelCss.labelpic}
                  source={require('../Assets/icons/label1.png')}
                />
                <Text style={LabelCss.labelpriority}>{label._data.Label}</Text>

                {/* <CheckBox
                style={{marginLeft: 200}}
                value={setSelection(label._data.Label}

               // value={label._data.CheckBox}
                onValueChange={setSelection} 
              /> */}

                <CheckBox
                  style={{marginLeft: 200}}
                  disabled={false}
                  value={checked[label.id]}
                  onValueChange={newValue => {
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
