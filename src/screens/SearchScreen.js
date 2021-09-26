import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import SearchCss from '../css/ArchiveScreenCss';
import {
  getNotes,
  getNotesDataWithId,
  noteData,
} from '../services/NotesServices';
import {useNavigation} from '@react-navigation/native';
import SearchCard from '../Component/SearchCard';

export default function SearchScreen(props) {
  const [note, setNOte] = useState([]);
  const [searchText, setsearchText] = useState('');
  const [filterArr, setfilterArr] = useState([]);
  //const[key,setkey]=useState()

  useEffect(() => {
    //let respi=getNotesDataWithId()

    const unsubscribe = navigation.addListener('focus', () => {
      getNotesDataWithId().then(res => {
        setNOte(res);
      });
    });

    return unsubscribe;
  }, [navigation]);

  const navigation = useNavigation();

  const searchFilterFunction = searchText => {
    if (searchText != '') {
      setsearchText(searchText);
      let arr = [];
      let newArr = [];
      arr = note.map(notes => {
        newArr.push(notes);

        let filterData = newArr.filter(noteData => {
          return (
            noteData.Title.toLowerCase().search(searchText.toLowerCase()) !==
              -1 ||
            noteData.Description.toLowerCase().search(
              searchText.toLowerCase(),
            ) !== -1
          );
        });

        setfilterArr(filterData);
      });
    }
  };

  return (
    <View style={SearchCss.container1}>
      <View style={SearchCss.headerView}>
        <View style={SearchCss.ImgmenueView}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('DashBoard')}>
            <Image
              style={SearchCss.Imgmenue}
              source={require('../Assets/icons/backArrow.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={SearchCss.archivetxtview}>
          <TextInput
            placeholder="Search your notes"
            style={{width: 200, height: 35}}
            onChangeText={text => {
              searchFilterFunction(text);
            }}
          />
        </View>
      </View>
      <View>
        <ScrollView style={{marginBottom: 60, marginTop: 30}}>
          <SearchCard searchDataArr={filterArr} />
        </ScrollView>
      </View>
    </View>
  );
}
