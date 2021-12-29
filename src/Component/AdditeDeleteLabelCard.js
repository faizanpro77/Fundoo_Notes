import React, {useEffect, useState} from 'react';

import IconFeather from 'react-native-vector-icons/Feather';
import IconeMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconeMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconeAntDesign from 'react-native-vector-icons/AntDesign';
import {TextInput, View, TouchableOpacity, StyleSheet} from 'react-native';
import LabelCss from '../css/UpdateDeleteLabelCss';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {deleteLabel, updateLabel} from '../services/NotesServices';

const AdditeDeleteLabelCard = props => {
  const [Label, setLabelData] = React.useState(props.Label);
  //console.log('propaasassssssss',Label);
  const [isEdit, setIsEdit] = React.useState(true);

  // function for delete note
  const onDeleteButton = () => {
    setIsEdit(true);
    //console.log(props.labelId);
    const labelId = props.labelId;
    deleteLabel(labelId).then(() => {
      props.fetchData();
    });
  };

  //function for edit label
  const labelOperation = () => {
    const LabelData = {Label};
    const labelId = props.labelId;
    updateLabel(LabelData, labelId).then(() => {
      props.fetchData();
    });
  };
  const onCheckButton = async () => {
    setIsEdit(true);
    labelOperation();
  };

  return (
    <View>
      <View>
        <View style={{flexDirection: 'row'}}>
          {isEdit ? (
            <Icons
              style={{padding: 13}}
              name="label-outline"
              size={25}
              color="#525252"
            />
          ) : null}
          <TouchableOpacity onPress={onDeleteButton}>
            {!isEdit ? (
              <IconeMaterialCommunityIcons
                name="trash-can-outline"
                size={25}
                color="#525252"
                style={{padding: 13}}
              />
            ) : null}
          </TouchableOpacity>
          <View style={{width: '35%'}}>
            <TextInput
              style={{fontSize: 20, marginLeft: '17%', width: 250}}
              value={Label}
              onChangeText={value => setLabelData(value)}
            />
          </View>
          <View style={styles.check}>
            <TouchableOpacity onPress={() => setIsEdit(false)}>
              {isEdit ? (
                <Icons name="border-color" size={25} color="#525252" />
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity onPress={onCheckButton}>
              {!isEdit ? <Icons name="check" size={25} color="blue" /> : null}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  check: {
    padding: 10,
    marginLeft: '38%',
  },
  textInput: {
    width: '100%',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
});

export default AdditeDeleteLabelCard;
