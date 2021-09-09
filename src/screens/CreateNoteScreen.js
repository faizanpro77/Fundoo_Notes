import React, {Component} from 'react';
import {TouchableOpacity, View, Image, TextInput, Text} from 'react-native';
import EditeNoteScreenCss, {passcolordata} from '../css/CreateNoteScreenCss';
import {noteData} from '../services/NotesServices';
import Snackbar from 'react-native-snackbar';
import RBSheet from 'react-native-raw-bottom-sheet';
import ColorChager from '../Component/Color';
import {getNotes} from '../services/NotesServices';

export default class CreateNoteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      Description: '',
      color: '',
      trash: false,
      pin: false,
      archive: false,
    };
  }

  //handle archive true false and nevigat dashbord
  handleArchive = () => {
    this.setState({archive: !this.state.archive}, () => {
      console.log('archiveeeeeeeee', this.state.archive),
        this.props.navigation.navigate('DashBoard');
    });
  };

  handlePin = () => {
    this.setState({pin: !this.state.pin}, () => {
      console.log('pinnnnnnnnnnnn', this.state.pin);
    });
  };

  handleTrash = () => {
    this.setState({trash: !this.state.trash}, () =>{
      console.log('Trashhhhhhhhhhhh', this.state.trash),
      this.props.navigation.navigate('DashBoard')
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
      Description: Description,
    });
  };

  //send data to add into firebase
  backArrow = async () => {
    // console.log('...................'+title)
    // console.log('................'+noteDescription)
    // console.log('pinnnnnnnnnnnnnnnnnnbackarrow', this.state.pin);
    // console.log('Trashsdhhhhhhhhhhbackarrow', this.state.trash);
    // console.log('archiveeeeeeeee', this.state.archive);

    if (
      this.state.title != '' &&
      this.state.Description != '' &&
      this.state.color != ''
    )
      var response = await noteData(
        this.state.title,
        this.state.Description,
        this.state.color,
        this.state.trash,
        this.state.pin,
        this.state.archive,
      );
    // console.log('responsenotedata***************'+response)
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

  render() {
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
            <TouchableOpacity onPress={this.backArrow}>
              <Image
                style={EditeNoteScreenCss.backArrowpic}
                source={require('../Assets/icons/backArrow.png')}
              />
            </TouchableOpacity>
          </View>

          <View>
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

          <View>
            <TouchableOpacity>
              <Image
                style={EditeNoteScreenCss.reminderpluspic}
                source={require('../Assets/icons/reminderplus.png')}
              />
            </TouchableOpacity>
          </View>

          <View>
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
            </RBSheet>
          </View>
        </View>
      </View>
    );
  }
}
