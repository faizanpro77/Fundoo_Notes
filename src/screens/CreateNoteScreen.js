import React, {useState} from 'react';
import {TouchableOpacity, View,Image, TextInput, ImageStore} from 'react-native';
import EditeNoteScreenCss from '../css/CreateNoteScreenCss';
import {noteData} from '../services/NotesServices'
import Snackbar from 'react-native-snackbar';


export default function CreateNoteScreen()  {

        const[title,setTitle] = useState('');
        const[noteDescription,setNoteDescription] = useState('');
    

   const handleTitle = (title)=>{
        setTitle(title)
    }

   const handleNoteDescription = (noteDescription) => {
            setNoteDescription(noteDescription)
    }

   const backArrow = async() =>{
// console.log('...................'+title)
// console.log('................'+noteDescription)
      let response = await noteData(title,noteDescription);
      //console.log('responsenotedata***************'+response)
      if(response == 'success'){

        Snackbar.show({
            text: 'note added!',
            duration: Snackbar.LENGTH_INDEFINITE,
            action: {
                text: 'UNDO',
                textColor: 'green',
            },
        });
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


    return(
        <View style={EditeNoteScreenCss.container1}>
            <View  style={EditeNoteScreenCss.container2} >
                <View>
                    <TouchableOpacity onPress = {backArrow}>
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
                 onChangeText = {handleTitle}
                 />
               
                <TextInput
                multiline={true}
                numberOfLines={1}
                placeholder='Note'               
                style={EditeNoteScreenCss.noteinputtext}
                onChangeText = {handleNoteDescription}
                />    
            </View>

           
            <View style={EditeNoteScreenCss.footerContainer} >
                <View style={EditeNoteScreenCss.footer}>
                    <TouchableOpacity>
                        <Image style={EditeNoteScreenCss.addfeaturemenue} source = {require('../Assets/icons/plusmenue.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image style={EditeNoteScreenCss.addcolour} source = {require('../Assets/icons/color.png')} /> 
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image style={EditeNoteScreenCss.threedotmenue} source={require('../Assets/icons/threedotmenue.png')}/>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}        



