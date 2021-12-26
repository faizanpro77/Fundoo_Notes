// import firestore from '@react-native-firebase/firestore';
// import IconFeather from 'react-native-vector-icons/Feather';
// import IconeMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import IconeEntypo from 'react-native-vector-icons/Entypo';
// import IconeMaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import IconeAntDesign from 'react-native-vector-icons/AntDesign';
import AdditeDeleteLabelCard from '../Component/AdditeDeleteLabelCard';

import React, {useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {addLabel, fetchLabelsData} from '../services/NotesServices';
import LabelUpdateDeleteCss from '../css/LabelUpdateDeleteCss';
//import {addLabel, fetchLabelsData} from '../services/noteServices';

// import { useDispatch, useSelector } from 'react-redux';
// import { setLabelData } from '../redux/actions';

const widthOfScreen = Dimensions.get('screen').width;
const heightOfScreen = Dimensions.get('screen').height;
const UpdateDeleteLabelProcess = ({navigation}) => {
  const [labelData, setLabelData] = React.useState([]);
  const [label, setLabel] = React.useState('');
  const [icon, SetIcon] = React.useState(false);
  const [add, setAdd] = React.useState(false);
  //const [editIcon, setEditIcon] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  // const labelData = useSelector(state => state.labelData)
  // const dispatch = useDispatch();

  // fetch data using redux labelData state
  const fetchData = async () => {
    let data = await fetchLabelsData();
    setLabelData(data);
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation, fetchData]);

  const toggle = () => {
    setAdd(!add);
    SetIcon(!icon);
    setLabel('');
  };

  //function for add label
  const labelOperation = (changeData = {}) => {
   // const noteData = {label};
  
    addLabel(label, checked).then(() => {
    //  setLabel('');
      fetchData();
    });
  };
  const onCheckButton = () => {
    if(label != '')
    labelOperation();
  };

  var labelForCreateScreen = () => {
    navigation.navigate('dashBoard');
  };
  return (
    <View style={{flex: 1, marginTop: 20}}>
      <View style={LabelUpdateDeleteCss.header}>
        <View>
          <TouchableOpacity onPress={labelForCreateScreen}>
            <Icons name="arrow-left" size={25} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={LabelUpdateDeleteCss.titleStyle}>Edit Labels</Text>
        </View>
      </View>
      <View style={LabelUpdateDeleteCss.label}>
        <View style={{padding: 10}}>
          <TouchableOpacity onPress={toggle}>
            {icon ? (
              <Icons name="plus" size={25} color="#525252" />
            ) : (
              <AntDesign name="close" size={25} color="black" />
            )}
          </TouchableOpacity>
        </View>
        <View>
          <TextInput
            style={{fontSize: 18, width: 250, marginLeft: '10%', height: 60}}
            placeholder="Create new label"
            placeholderTextColor="grey"
            value={label}
            onChangeText={text => setLabel(text)}
          />
        </View>
        <View style={LabelUpdateDeleteCss.check}>
          {!add ? (
            <TouchableOpacity onPress={onCheckButton}>
              <AntDesign name="check" size={25} color="black" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      <View style={{flex: 1, marginTop: 10}}>
        <FlatList
          data={labelData}
          renderItem={({item}) => (
            <AdditeDeleteLabelCard {...item} fetchData={fetchData} />
          )}
          keyExtractor={item => item.labelId}
        />
      </View>
    </View>
  );
};

export default UpdateDeleteLabelProcess;
