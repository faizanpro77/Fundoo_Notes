import React, {Component, useEffect, useState} from 'react';
import {Card} from 'react-native-elements';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
//import DashBoardCardCss from '../css/DashBoardCardCss';
import {getNotes, setAllCheckBoxValueFalse} from '../services/NotesServices';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
//setAllCheckBoxValueFalse();
//props.seachNoteData

export default function PinCard(props) {
  const [notes, setNotes] = useState([]);
  const [displayNoteData, setdisplayNoteData] = useState([]);
  const [PinData, setPinData] = useState(true);
  const [PinData1, setPinData1] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getNotes().then(res => {
        setNotes(res);
      });
    });

    return unsubscribe;
  }, [navigation]);

  const navigation = useNavigation();
  var labelarr = [];

  const navigateEditScreen = note => {
    setAllCheckBoxValueFalse();
    //console.log('navigateEditScreennnnnnnnnn');
    navigation.navigate('EditNOte', {
      displayNoteData: note,
      key: note.id,
      CardBolean: false,
    });
  };
  return (
    <View
      style={{
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignSelf: 'center',
      }}>
      {notes.map(note => {
        labelarr = note._data.LabelArr;

        let gridView = {
          width: 166,
          borderRadius: 10,
          backgroundColor: 'red',
          backgroundColor: note._data.Colour,
        };

        let listView = {
          width: 360,
          borderRadius: 10,
          backgroundColor: 'red',
          backgroundColor: note._data.Colour,
        };
        // if(note._data.Trash == true && note._data.Archive == false && note._data.Pin == false )
        //props.pinBoolean(PinData1)
        if (
          note._data.Trash == false &&
          note._data.Archive == false &&
          note._data.Pin == true
        ) {
          // props.pinBoolean(PinData);
          return (
            <View key={note.id}>
              <TouchableOpacity onPress={() => navigateEditScreen(note)}>
                <Card containerStyle={props.gridListdata ? gridView : listView}>
                  <Card.Title>{note._data.Title}</Card.Title>
                  <Text>{note._data.Description} </Text>

                  {labelarr.map(labelData => {
                    console.log('labelDataaaaaaaaaaaaaaaa', labelData.id);

                    return (
                      <View
                        style={{
                          backgroundColor: 'lightgrey',
                          borderRadius: 20,
                          justifyContent: 'center',
                          padding: 5,
                          marginRight: 5,
                          marginTop: 7,
                        }}>
                        <Text>{labelData}</Text>
                      </View>
                    );
                  })}
                </Card>
              </TouchableOpacity>
            </View>
          );
        }
      })}
    </View>
  );
}
