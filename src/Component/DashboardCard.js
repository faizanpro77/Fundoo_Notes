import React, {Component, useEffect, useState} from 'react';
import {Card} from 'react-native-elements';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
//import DashBoardCardCss from '../css/DashBoardCardCss';
import {getNotes, setAllCheckBoxValueFalse} from '../services/NotesServices';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {not} from 'react-native-reanimated';
//setAllCheckBoxValueFalse();
//props.seachNoteData

export default function DashboardCard(props) {
  const [notes, setNotes] = useState([]);
  const [displayNoteData, setdisplayNoteData] = useState([]);

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
        if (
          note._data.Trash == false &&
          note._data.Archive == false &&
          note._data.Pin == false
        ) {
          return (
            <View key={note.id}>
              <TouchableOpacity onPress={() => navigateEditScreen(note)}>
                <Card containerStyle={props.gridListdata ? gridView : listView}>
                  <Text style={{fontWeight:'bold',fontSize:15}}>{note._data.Title}</Text>
                  <Text>{note._data.Description} </Text>

                  <View
                    style={{
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                      
                    }}>
                    {note._data.DateTimeChipBoolean ? (
                      <View
                        style={{
                          marginBottom: 10,
                          backgroundColor: 'lightgrey',
                          height: 30,
                          borderRadius: 10,
                          justifyContent: 'center',
                          marginRight:5
                        }}>
                        <Text>
                          {note._data.Date},{note._data.Time}
                        </Text>
                      </View>
                    ) : null}
                    {labelarr.map(labelData => {
                      return (
                        // console.log('labelDataaaaaaaaaaaaaaaa',labelarr);
                        <View
                          style={{
                            backgroundColor: 'lightgrey',
                            borderRadius: 20,
                            justifyContent: 'center',
                            padding: 5,
                            marginBottom: 10,
                            marginRight:5
                          }}>
                          <Text>{labelData}</Text>
                        </View>
                      );
                    })}
                  </View>
                </Card>
              </TouchableOpacity>
            </View>
          );
        }
      })}
    </View>
  );
}
