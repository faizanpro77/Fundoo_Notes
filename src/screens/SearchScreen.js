import React, { useEffect, useState } from 'react';
import {View,TextInput, Image, Text,ScrollView, TouchableOpacity} from 'react-native';
import SearchCss from '../css/ArchiveScreenCss';
import { getNotes, noteData } from '../services/NotesServices';
import { useNavigation } from '@react-navigation/native';
import SearchCard from '../Component/SearchCard';


export default function SearchScreen(props) { 
   
  const[note,setNOte]=useState([])
  const[searchText,setsearchText]=useState('')
  const[filterArr,setfilterArr]=useState([])
  //const[key,setkey]=useState()

 

  useEffect(() => {
 
    const unsubscribe = navigation.addListener('focus', () => {
  
     getNotes().then(res => {
      setNOte(res);
       });
    });
  
    return unsubscribe;
  }, [navigation]);
  
   
   
    const navigation= useNavigation();
  
    
  const searchFilterFunction = searchText => {
    
   if(searchText!=''){
    setsearchText(searchText)
    let newArr1=[]
 let  key=[]
    let arr = [];
    let newArr = [];
    arr = note.map((notes) => {
       console.log('arrrrrrrrrrrrrrrrrrrrrrrrrrrr',notes);
         let notes1 = notes.data()
        newArr.push(notes.data());
        newArr1.push(notes.id)
     //  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@1',newArr1);


        let filterData = newArr.filter((noteData) => {
       //   console.log("title", noteData.Title);
       
      // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@',key);

            return (noteData.Title.toLowerCase().search(searchText.toLowerCase()) !== -1 || noteData.Description.toLowerCase().search(searchText.toLowerCase()) !== -1
           
            )
          });
      //  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@',filterData);

        // console.warn("filterArray data ",filterData);
        setfilterArr(filterData)
      //  console.log("filterArray", filterArr);
      
    })
  }
}


  return (
    
    <View style={SearchCss.container1}>
        <View style={SearchCss.headerView}>
          <View style={SearchCss.ImgmenueView}>
            <TouchableOpacity onPress={()=>props.navigation.navigate('DashBoard')}>
            <Image
              style={SearchCss.Imgmenue}
              source={require('../Assets/icons/backArrow.png')}
            />
            </TouchableOpacity>
          </View>
          <View style={SearchCss.archivetxtview}>
            <TextInput 
            placeholder='Search your notes' 
            style={{width:200,height:35}}
            onChangeText={(text)=>{searchFilterFunction(text)}}

            />
          </View>
        
        </View>
        <View>
         
        <ScrollView style={{marginBottom: 60,marginTop:30,}}>
          <SearchCard  searchDataArr={filterArr} />
        </ScrollView>
        </View>
    </View>
  );
}
