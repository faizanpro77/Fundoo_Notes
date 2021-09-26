import React, {Component, useEffect, useState} from 'react';
import {Card} from 'react-native-elements';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
//import DashBoardCardCss from '../css/DashBoardCardCss';
import {getNotes} from '../services/NotesServices';
import { NavigationContainer, useNavigation } from '@react-navigation/native';


export default function SearchCard(props) {
  const [notes, setNotes] = useState([]);
  const[displayNoteData,setdisplayNoteData]= useState([]);

 
 useEffect(() => {
setNotes(props.searchDataArr)
//console.log('props.searchDataArr',notes.map(note=>console.log('99999999999999',note.Archive)));
}, []);

 
 
  const navigation= useNavigation();

  return (
  
    <View
      style={{
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignSelf: 'center',
        }}>
        
      {props.searchDataArr.map(note => {
               // console.log('newiffffffffffffffffffffffffffff',note.id);

          // console.log('noteeeeeeeeeeeeeeeeee',note);
          let gridView = {width: 166,borderRadius:10, backgroundColor: 'red',backgroundColor:note.Colour};
               
        let listView = {width:370, borderRadius:10,backgroundColor:'red',backgroundColor:note.Colour}  
        return (
          <View key={note.id} >
            <TouchableOpacity onPress={() => {navigation.navigate('EditNOte',{displayNoteData:note, key:note.id,searchOpen:true})}} > 
            {/* {console.log('777777777777777777777777',note.id)} */}
            <Card containerStyle={ listView} >
              <Card.Title>{note.Title}</Card.Title>
              <Text>{note.Description} </Text>
            </Card>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
    
  );
}


