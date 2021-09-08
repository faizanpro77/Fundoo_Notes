import React, {Component, useEffect, useState} from 'react';
import {Card} from 'react-native-elements';
import {ScrollView, Text, View} from 'react-native';
//import DashBoardCardCss from '../css/DashBoardCardCss';
import {getNotes} from '../services/NotesServices';

export default function DashboardCard(props) {
  const [notes, setNotes] = useState([]);
//console.log('pporpssssssssssss',props.gridListdata)
 
  useEffect(() => {
    getNotes().then(res => {
      setNotes(res);
    });
   // console.log('arrayuseeffectkkkkkkkkkkk', notes);
  }, []);

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
    
        return (
          <View>
            <Card containerStyle={props.gridListdata? gridView:listView}>
              <Card.Title>{note._data.Title}</Card.Title>
              <Text>{note._data.Description} </Text>
            </Card>
          </View>
        );
      })}
    </View>
    
  );
}
