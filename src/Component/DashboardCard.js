import React, {Component, useEffect, useState} from 'react';
import {Card} from 'react-native-elements';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
//import DashBoardCardCss from '../css/DashBoardCardCss';
import {getNotes} from '../services/NotesServices';
import { useNavigation } from '@react-navigation/native';
import { normalizeText } from 'react-native-elements/dist/helpers';


export default function DashboardCard(props) {
  const [notes, setNotes] = useState([]);
  const[displayNoteData,setdisplayNoteData]= useState([]);
//console.log('pporpssssssssssss',props.gridListdata)
 
  useEffect(() => {
    getNotes().then(res => {
      setNotes(res);
    });
   // console.log('arrayuseeffectkkkkkkkkkkk', notes);
  }, []);

  const navigation= useNavigation();

  return (
  
    <View
      style={{
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignSelf: 'center',
        
        
      // justifyContent:'center'
      }}>
        
      {/* {Object.keys(notes).map((note) => {  */}
      {notes.map(note => {
       // console.log('res in map2222222222222', note._data.Description);

        let gridView = {width: 166,borderRadius:10, backgroundColor: 'red',backgroundColor:note._data.Colour};
               
        let listView = {width:360, borderRadius:10,backgroundColor:'red',backgroundColor:note._data.Colour}  
        if(note._data.Trash == false && note._data.Archive == false&& note._data.Pin == false) 
        return (
          <View key={note.id} >
            <TouchableOpacity onPress={() => {navigation.navigate('EditNOte',{displayNoteData:note, key:note.id})}} > 
            <Card containerStyle={props.gridListdata? gridView:listView} >
              <Card.Title>{note._data.Title}</Card.Title>
              <Text>{note._data.Description} </Text>
            </Card>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
    
  );
}


