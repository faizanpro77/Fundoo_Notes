import React, {Component} from 'react';
import {TouchableOpacity, View, Image, TextInput, Text} from 'react-native';
import EditeNoteScreenCss, {passcolordata} from '../css/CreateNoteScreenCss';
import {getLabel, noteData} from '../services/NotesServices';
import Snackbar from 'react-native-snackbar';
import RBSheet from 'react-native-raw-bottom-sheet';
import ColorChager from '../Component/Color';
import {getNotes} from '../services/NotesServices';

export default class CreateNoteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      color: '',
      trash: false,
      pin: false,
      archive: false,
      labelDataArr:[],
      
    };
    
  }

   
  handleLabel = () => {
    this.props.navigation.navigate('createLabel');
  };

  //handle archive true false and nevigat dashbord
  handleArchive = () => {
    this.setState({archive: !this.state.archive}, () => {
      console.log('archiveeeeeeeee', this.state.archive);
      // console.warn('archiveeeeeeeee', this.state.archive)

      // this.props.navigation.navigate('DashBoard');
    });
  };

  handlePin = () => {
    this.setState({pin: !this.state.pin}, () => {
      console.log('pinnnnnnnnnnnn', this.state.pin);
    });
  };

  handleTrash = () => {
    this.setState({trash: !this.state.trash}, () => {
      console.log('Trashhhhhhhhhhhh', this.state.trash);
      //this.props.navigation.navigate('DashBoard')
    });
  };

  colorHandler = color => {
    this.setState({color: color});
    console.log('colrrrrrrrrrr', color);
    // passcolordata(this.state.color)
  };

  handleTitle = title => {
    this.setState({
      title: title,
    });
  };

  handleNoteDescription = Description => {
    this.setState({
      description: Description,
    });
  };

  
  //send data to add into firebase
  backArrow = async (addLabelDataArr) => {
    console.log('addLabelDataArrrrrrrrrrrrrrr',addLabelDataArr);

    // console.log('...................'+title)
    // console.log('................'+noteDescription)
    // console.log('pinnnnnnnnnnnnnnnnnnbackarrow', this.state.pin);
    // console.log('Trashsdhhhhhhhhhhbackarrow', this.state.trash);
    // console.log('archiveeeeeeeee', this.state.archive);

    if (
      this.state.title != '' &&
      this.state.description != '' &&
      this.state.color != ''
    ){

      var response = await noteData(
        this.state.title,
        this.state.description,
        this.state.color,
        this.state.trash,
        this.state.pin,
        this.state.archive,
        addLabelDataArr1
      )}
    console.log('responsenotedata***************' + response);
    if (response == 'success') {
      Snackbar.show({
        text: 'note added!',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'UNDO',
          textColor: 'green',
        },
      });
      this.props.navigation.navigate('DashBoard');
    } else {
      Snackbar.show({
        text: 'note is not added!',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'UNDO',
          textColor: 'green',
        },
      });
    }
  };

  componentDidMount(){

    this.focusListener = this.props.navigation.addListener('focus', () => {
      
      getLabel().then(res=>{
      this.setState({labelDataArr:res})
    })
  })

  }

 


  render() {
    // const {LabbelArr} = this.props.route.params;
    // console.log('44444444444',LabbelArr);
  

    var addLabelDataArr=[]

    return (
      // <View style={EditeNoteScreenCss.container1}>
      <View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: this.state.color,
        }}>
        <View style={EditeNoteScreenCss.container2}>
          <View>
            <TouchableOpacity onPress={(event)=>this.backArrow(addLabelDataArr)}>
              <Image
                style={EditeNoteScreenCss.backArrowpic}
                source={require('../Assets/icons/backArrow.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={{marginLeft: 219}}>
            {this.state.pin ? (
              <TouchableOpacity onPress={this.handlePin}>
                <Image
                  style={EditeNoteScreenCss.pinpic}
                  source={require('../Assets/icons/unpin.png')}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={this.handlePin}>
                <Image
                  style={EditeNoteScreenCss.pinpic}
                  source={require('../Assets/icons/pin.png')}
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={{marginLeft: 22}}>
            <TouchableOpacity>
              <Image
                style={EditeNoteScreenCss.reminderpluspic}
                source={require('../Assets/icons/reminderplus.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={{marginLeft: 22}}>
            <TouchableOpacity onPress={this.handleArchive}>
              <Image
                style={EditeNoteScreenCss.archivepic}
                source={require('../Assets/icons/archive.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{top: 11}}>
          <TextInput
            placeholder="Title"
            style={EditeNoteScreenCss.titleinputtxt}
            multiline={true}
            numberOfLines={1}
            maxLength={100}
            onChangeText={this.handleTitle}
          />

          <TextInput
            multiline={true}
            numberOfLines={1}
            placeholder="Note"
            style={EditeNoteScreenCss.noteinputtext}
            onChangeText={this.handleNoteDescription}
          />
         
        


        </View>
{/***************************************************************** */}
<View  style={{ flexWrap: 'wrap', marginLeft:12,flexDirection:'row', marginRight: 10,}}>
{     

      
 this.state.labelDataArr.map(labelData=>{
  if(labelData._data.CheckBox===true){
    addLabelDataArr.push(labelData._data.Label)
   
   

  console.log('============================>>',addLabelDataArr);
          return(
       <View key={labelData.id}>
            <TouchableOpacity
              style={{
                backgroundColor: 'gray',
                borderRadius: 20,
                justifyContent: 'center',
                padding:5,
                marginRight:5
                
               
              }}>
              <Text>
              {labelData._data.Label}
              </Text>
            </TouchableOpacity>
          </View>
          )}
  })}

</View>
       
        <View style={EditeNoteScreenCss.footerContainer}>
          <View style={EditeNoteScreenCss.footer}>
            <TouchableOpacity>
              <Image
                style={EditeNoteScreenCss.addfeaturemenue}
                source={require('../Assets/icons/plusmenue.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.RBSheet.open()}>
              <Image
                style={EditeNoteScreenCss.addcolour}
                source={require('../Assets/icons/color.png')}
              />
            </TouchableOpacity>

            <RBSheet
              ref={ref => {
                this.RBSheet = ref;
              }}
              height={235}
              openDuration={1}>
              <ColorChager colorDataProps={this.colorHandler} />
            </RBSheet>

            <TouchableOpacity onPress={() => this.RBSheetMore.open()}>
              <Image
                style={EditeNoteScreenCss.threedotmenue}
                source={require('../Assets/icons/threedotmenue.png')}
              />
            </TouchableOpacity>
            <RBSheet
              ref={ref => {
                this.RBSheetMore = ref;
              }}
              height={235}
              duration={1}>
              <TouchableOpacity onPress={this.handleTrash}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../Assets/icons/delete.png')}
                    style={EditeNoteScreenCss.deletepic}
                  />
                  <Text style={{top: 15, marginLeft: 20}}>Delete</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.handleLabel}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../Assets/icons/label1.png')}
                    style={EditeNoteScreenCss.lebelpic}
                  />
                  <Text style={{marginLeft: 30}}>Label</Text>
                </View>
              </TouchableOpacity>
            </RBSheet>
          </View>
        </View>
      </View>
    );
  }
}
