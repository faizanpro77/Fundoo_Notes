import React, {Component} from 'react';
//import { DrawerActions} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Card} from 'react-native-elements';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
// import {gridlistvalue} from '../Component/DashboardCard';
import DashBoardCss from '../css/DashBoardCss';
import DashboardCard from '../Component/DashboardCard';
import Profile from '../Component/Profile';
import { TextInput } from 'react-native-gesture-handler';
import { getNotes, getUserProfileImage1 } from '../services/NotesServices';
import { NodePath } from '@babel/traverse';
import {Avatar} from 'react-native-elements';

class DashBoardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    searchText:'',
    filterSearch:false,
    notesdata:[],
    filterArray:[],
    note:[],
    isSearching:false,
    searchText: '',
    note: [],
    filterArr: [],
    userprofile:'https://www.w3schools.com/howto/img_avatar.png'
    };
  }
 
  // componentDidMount(){
  
  //  // this.focusListener = this.props.navigation.addListener('focus', () => {
    
  //    ()=>{  getNotes().then(res => {
  //         this.setState({notes:res},console.log('notesssssssssssssssssss',this.state.notes));
  //        });
  //        console.log('ssssssssss',this.state.notes);
  //   //  });
  //       }
  // }

//   componentDidMount() {
//     getNotes().then((res) => {
//         this.setState({
//             note: res
//         })
//     })
// }


  gridView = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  navigateCreateNOteScreen = () => {
    this.props.navigation.navigate('CreateNote');
  };

async componentDidMount(){
  let userprofile1 = await getUserProfileImage1()
  this.setState({userprofile:userprofile1})
 // console.log(' this.state.profielbbbbbbbbbbb', this.state.userprofile);
}




  /****************************************** */
  // finalArray = isSearching? note: filterArray

  //    filterSearch =(text) =>{
  //   console.log('texttttttt',text);
  //      let NoteData = [];
  //     if (text.toString().length >=1) {
          
  //       //  var noteData =this.state.notes1.map((note) => {
  //         var noteData = Object.keys(notes1).map((note) => {

  //            var key = note;
  //            NoteData.push(notes1[key]);
  //            const newData = NoteData.reduce(function(item,option) {
  //            if (option.Title.includes(text)) {
  //                console.log('....',option.Title)
  //                setIsSearching(true);
  //                this.setState({isSearching:true})
  //                NoteData.push(option)
  //                this.state({filterArray:NoteData})
  //            }
  //                // return item.Title.includes(text.toLowerCase()) || item.Note.toLowerCase().contains(text.toLowerCase());
          
  //            },[]);
             
  //         })
  //     }else{
  //         setIsSearching(false)
  //     }
 
 
  // }
  /****************************************** */
  



  /******************************************/

handlesearch=()=>{
  this.props.navigation.navigate('SearchNote')
}

// profileProps=(imageData)=>{
// console.log('imageDataaaaaaa',imageData);
// }

  render() {
    return (
      <View style={DashBoardCss.container1}>
        <View style={DashBoardCss.header}>
          <Card containerStyle={DashBoardCss.card}>
            <View style={DashBoardCss.navBar}>
              <View style={{flexDirection: 'row'}}>
                <View style={DashBoardCss.menueImgview}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.openDrawer()}>
                    <Image
                      style={DashBoardCss.menueImg}
                      source={require('../Assets/icons/menu.png')}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity onPress={this.handlesearch}>
                    <Text>Search your notes</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={DashBoardCss.listprofileview}>
                {this.state.open ? (
                  <View style={DashBoardCss.listImgview}>
                    <TouchableOpacity onPress={() => this.gridView()}>
                      <Image
                        style={DashBoardCss.listImg}
                        source={require('../Assets/icons/grid.png')}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={DashBoardCss.listImgview}>
                    <TouchableOpacity onPress={() => this.gridView()}>
                      <Image
                        style={DashBoardCss.listImg}
                        source={require('../Assets/icons/list.png')}
                      />
                    </TouchableOpacity>
                  </View>
                )}

                <View>
                  <TouchableOpacity onPress={() => this.RBSheet.open()}>
                    <Image
                      style={DashBoardCss.profileImg}
                      source={{uri:this.state.userprofile}}
                    />
                  </TouchableOpacity>
                  <RBSheet
                    ref={ref => {
                      this.RBSheet = ref;
                    }}
                    height={235}>
                      <Profile  />
                      {/* profileUserData={this.profileProps} */}
                  </RBSheet>
                </View>
              </View>
            </View>
          </Card>
        </View>

        <ScrollView style={{marginBottom: 60}}>
          <DashboardCard gridListdata={this.state.open} seachNoteData={this.state.searchText} />
        </ScrollView>

        <View style={DashBoardCss.footerContainer}>
          <View style={DashBoardCss.footer}>
            <View>
              <TouchableOpacity>
                <Image
                  style={DashBoardCss.checkboxImg}
                  source={require('../Assets/icons/checkbox.png')}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity>
                <Image
                  style={DashBoardCss.brushImg}
                  source={require('../Assets/icons/brush.png')}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity>
                <Image
                  style={DashBoardCss.micImg}
                  source={require('../Assets/icons/mic.png')}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity>
                <Image
                  style={DashBoardCss.Img}
                  source={require('../Assets/icons/photo.png')}
                />
              </TouchableOpacity>
            </View>

            <View style={DashBoardCss.plusView}>
              <TouchableOpacity
                style={DashBoardCss.Touchablestyle}
                onPress={this.navigateCreateNOteScreen}
                //hitSlop={{ top: 200, bottom: 200, left: 200, right: 200 }}
              >
                <Image
                  style={DashBoardCss.plusImg}
                  source={require('../Assets/icons/add.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default DashBoardScreen;

