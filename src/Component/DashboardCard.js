import React, {Component, useEffect, useState} from 'react';
import {Card} from 'react-native-elements';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
//import DashBoardCardCss from '../css/DashBoardCardCss';
import {getNotes} from '../services/NotesServices';
import {NavigationContainer, useNavigation} from '@react-navigation/native';

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
  return (
    <View
      style={{
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignSelf: 'center',
      }}>
      {/* {Object.keys(notes).map((note) => {  */}
      {notes.map(note => {
        labelarr = note._data.LabelArr;
       // console.log('noteeeeeeeeeeeeeeeeeeeeeeeeeeee', note);
        //   let not2=note.data();
        //   console.log('data()not2',not2.Title)
        //  // console.log('res in map2222222222222', note._data.Description);
        // console.log('note._data.Title,,,,,1111111',note._data.Title)
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
        )
          return (
            <View key={note.id}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('EditNOte', {
                    displayNoteData: note,
                    key: note.id,
                  });
                }}>
                <Card containerStyle={props.gridListdata ? gridView : listView}>
                  <Card.Title>{note._data.Title}</Card.Title>
                  <Text>{note._data.Description} </Text>

                  {
                  labelarr.map(labelData => { 

                    console.log('labelDataaaaaaaaaaaaaaaa',labelarr); 
                  <View>
                    <TouchableOpacity
                      style={{
                        backgroundColor: 'lightgrey',
                        borderRadius: 20,
                        justifyContent: 'center',
                        padding: 5,
                        marginRight: 5,
                      }}>
                      <Text>{labelarr}</Text>
                    </TouchableOpacity>
                  </View>
                   })} 
                </Card>
              </TouchableOpacity>
            </View>
          );
      })}
    </View>
  );
}
