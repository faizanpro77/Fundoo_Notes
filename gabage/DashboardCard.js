import React,{Component} from 'react';
import {Card} from 'react-native-elements';
import {Text,View} from 'react-native'
import DashBoardCardCss from '../css/DashBoardCardCss';
import { getNotes } from '../services/NotesServices';

export default class DashboardCard extends Component {
  constructor(){
    super();
    this.state={
      note:[]
    }
  }

  componentDidMount(){
    getNotes().then((res)=>{
        this.setState({
            note:res
        })
        console.log('||||||||||||',this.state.note)
    })       
};



  render(){ 
    let finalArray = [];
   finalArray = this.state.note.map((notes) => {
   
   let notes1 = notes.data();
   console.log("res in **map2", notes)

  
    return(
        <View style = {DashBoardCardCss.cardview}>
              <Card
    containerStyle={DashBoardCardCss.card}>
    <Card.Title>fdgff</Card.Title>
    <Text>sfsdg </Text>
  </Card>
  </View>
    )
  })
}

}
 


