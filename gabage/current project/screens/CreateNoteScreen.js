import React, {Component} from 'react';
import {TouchableOpacity, View,Image, TextInput, ImageStore} from 'react-native';
import EditeNoteScreenCss, { passcolordata } from '../css/CreateNoteScreenCss';
import {noteData} from '../services/NotesServices'
import Snackbar from 'react-native-snackbar';
import RBSheet from 'react-native-raw-bottom-sheet';
import ColorChager from '../Component/Color';
import { getNotes } from '../services/NotesServices';



export default class CreateNoteScreen extends Component  {
    constructor(props){
        super(props)
        this.state = { 
            title:'',
            Description:'',
            color:'',
            notes1:[]

        }

        }
       
        colorHandler = (color) =>{
            this.setState({color:color})
            console.log('colrrrrrrrrrr',color)
        }
        //********************************************* */


    handleTitle = (title)=>{
        
        this.setState({
            title:title
        })
    }

    handleNoteDescription = (Description) => {
            this.setState({
                Description : Description,
               
            })
    }


    backArrow = async() =>{
// console.log('...................'+title)
// console.log('................'+noteDescription)
     //   if(this.state.title!="" && this.state.Description!='' && this.state.color!='')
      var response = await noteData(this.state.title,this.state.Description,this.state.color);
     // console.log('responsenotedata***************'+response)
      if(response == 'success'){

        Snackbar.show({
            text: 'note added!',
            duration: Snackbar.LENGTH_INDEFINITE,
            action: {
                text: 'UNDO',
                textColor: 'green',
            },
        });
        this.props.navigation.navigate('DashBoard')
    }else{
        Snackbar.show({
            text: 'note is not added!',
            duration: Snackbar.LENGTH_INDEFINITE,
            action: {
                text: 'UNDO',
                textColor: 'green',
            },
        });

        }  
         } 

    // componentDidMount(){
    //     getNotes().then((res)=>{
    //         this.setState({
    //             notes1:res
    //         })
    //     })
  
    // }


render(){
//     return(
//     this.state.notes1.map((note1)=>{
// console.log('sssssssssss',note1._data.Colour)

    return(

        // <View style={EditeNoteScreenCss.container1}>
        <View style={{height:'100%',  width:'100%',backgroundColor:this.state.color}}>
            
            
            <View  style={EditeNoteScreenCss.container2} >
                <View>
                    <TouchableOpacity onPress = {this.backArrow}>
                        <Image style={EditeNoteScreenCss.backArrowpic} source = {require('../Assets/icons/backArrow.png')}  />
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity>
                    <Image style={EditeNoteScreenCss.pinpic} source={require('../Assets/icons/pin.png')} />
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity>
                    <Image style={EditeNoteScreenCss.reminderpluspic} source = {require('../Assets/icons/reminderplus.png')}/>
                    </TouchableOpacity>
                </View>

            <View>
                <TouchableOpacity>
                <Image style={EditeNoteScreenCss.archivepic} source = {require('../Assets/icons/archive.png')} />
                </TouchableOpacity>
            </View>
            </View>
            <View style={{top:11}}>
                <TextInput placeholder='Title' 
                 style={EditeNoteScreenCss.titleinputtxt}
                 multiline={true}
                 numberOfLines={1}
                 maxLength={100}
                 onChangeText = {this.handleTitle}
                 />
               
                <TextInput
                multiline={true}
                numberOfLines={1}
                placeholder='Note'               
                style={EditeNoteScreenCss.noteinputtext}
                onChangeText = {this.handleNoteDescription}
                />    
            </View>

           
            <View style={EditeNoteScreenCss.footerContainer} >
                <View style={EditeNoteScreenCss.footer}>
                    <TouchableOpacity>
                        <Image style={EditeNoteScreenCss.addfeaturemenue} source = {require('../Assets/icons/plusmenue.png')} />
                    </TouchableOpacity>
                   
                    <TouchableOpacity onPress={()=>this.RBSheet.open()}> 
                    <RBSheet ref={ref=>{
                        this.RBSheet = ref;
                    }} 
                    height = {235}
                    openDuration={1}
                    >
                    <ColorChager colorDataProps={this.colorHandler}/>
                    {/* {console.log('sdhjdkhksjdghk')} */}

                    </RBSheet>
                        <Image style={EditeNoteScreenCss.addcolour} source = {require('../Assets/icons/color.png')} /> 
                    </TouchableOpacity>
                   
                    <TouchableOpacity>
                        <Image style={EditeNoteScreenCss.threedotmenue} source={require('../Assets/icons/threedotmenue.png')}/>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
        
    )
//})//*************** */
  //  )
}   
}     



