import React, {useEffect, useState} from 'react';

import IconFeather from 'react-native-vector-icons/Feather';
import IconeMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconeMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconeAntDesign from 'react-native-vector-icons/AntDesign';
import {TextInput, View, TouchableOpacity} from 'react-native';
import LabelCss from '../css/UpdateDeleteLabelCss';

const AdditeDeleteLabelCard = props => {
  const [labelArray, setlabelArray] = useState([]);
  const [Text,setText]=useState('')

  const [editDelete, setEditDelete] = useState(true);

  useEffect(() => {
   console.log('propsssssssss',props.labelId);
  }, [])
  return (
    <View
      style={{
        height:100,
        width:'80%',
        //flex: 1,
       // flexWrap: 'wrap',
       backgroundColor:"red"

       
      }}>
     
          <View  style={LabelCss.parentLabel}>
            <View style={LabelCss.labeltxtcheckView}>
              {editDelete ? (
                <IconeMaterialCommunityIcons
                  name="label-outline"
                  size={25}
                  color={'gray'}
                />
              ) : null}
              <TouchableOpacity >
                {!editDelete ? (
                  <IconeAntDesign name="delete" size={25} />
                ) : null}
              </TouchableOpacity>


              <TextInput
                onChangeText={text => setText(val)}
                style={LabelCss.TextInput1}
                //value={label._data.Label}
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
                  <IconFeather style={LabelCss.check1} name="check" size={25} />
                ) : null}
              </TouchableOpacity>
            </View>
          </View>
        
    </View>
  );
};
export default AdditeDeleteLabelCard;
