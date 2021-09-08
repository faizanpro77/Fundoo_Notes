import React, {Component, useEffect, useState} from 'react';
import {Card} from 'react-native-elements';
import {Text, View} from 'react-native';
import DashBoardCardCss from '../css/DashBoardCardCss';
import {getNotes} from '../services/NotesServices';

export default function DashboardCard()  {
  const[notes ,setNotes] = useState([]);


  useEffect(()=> {
    getNotes(noteList => {
      if (noteList) {
       setNotes(noteList)
      } 
    })
  },[]);

   
    
  

  return(
 <View>
    {Object.keys(notes).map((note) => { 
      var key = note
      var NoteData = notes[key]

    return (
      <View style={DashBoardCardCss.cardview}>
        <Card containerStyle={DashBoardCardCss.card}>
          <Card.Title>{NoteData.Title}</Card.Title>
          <Text>{NoteData.Description} </Text>
        </Card>
      </View>
      
    );
  })}
 </View>
) 
}
