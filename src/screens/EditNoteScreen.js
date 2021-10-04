import React, {Component} from 'react';
import {TouchableOpacity, View, Image, TextInput, Text} from 'react-native';
import EditeNoteScreenCss, {passcolordata} from '../css/CreateNoteScreenCss';
import {
  EditLabelForEditeLabelScreen1,
  editNoteDataUpdate,
  getLabel,
  noteData,
  setAllCheckBoxValueFalse,
} from '../services/NotesServices';
import Snackbar from 'react-native-snackbar';
import RBSheet from 'react-native-raw-bottom-sheet';
import ColorChager from '../Component/Color';
import {getNotes} from '../services/NotesServices';
import Modal from 'react-native-modal';
import {Button} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default class EditNoteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '', //this.props.navigation.state.params.display,
      description: '',
      color: 'white',
      trash: false,
      pin: false,
      archive: false,
      key: '',
      labelArrData: [],
      updatedLabelTrueFalse: false,
      labelArrayfromLabelArr: [],
      CardBolean1: true,
      isModalVisible: false,
      isDatePickerVisible: false,
      isTime: false,
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
    this.setState({trash: !this.state.trash}, () => {
      console.log('Trashhhhhhhhhhhh', this.state.trash),
        this.props.navigation.navigate('DashBoard');
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
  backArrow = () => {
    // console.log('...................'+title)
    // console.log('................'+noteDescription)
    // console.log('pinnnnnnnnnnnnnnnnnnbackarrow', this.state.pin);
    // console.log('Trashsdhhhhhhhhhhbackarrow', this.state.trash);
    // console.log('archiveeeeeeeee', this.state.archive);

    if (
      this.state.title != '' &&
      this.state.description != '' &&
      this.state.color != ''
    )
      var response = editNoteDataUpdate(
        this.state.key,
        this.state.title,
        this.state.description,
        this.state.color,
        this.state.trash,
        this.state.pin,
        this.state.archive,
        this.state.labelArrayfromLabelArr,
      );
    this.props.navigation.navigate('DashBoard'); //goBack()
    // console.log('responsenotedata***************'+response)
    // if (response == 'success') {
    //   Snackbar.show({
    //     text: 'note is updated!',
    //     duration: Snackbar.LENGTH_INDEFINITE,
    //     action: {
    //       text: 'UNDO',
    //       textColor: 'green',
    //     },
    //   });
    //   this.props.navigation.navigate('DashBoard');
    // } else {
    //   Snackbar.show({
    //     text: 'note is not updated!',
    //     duration: Snackbar.LENGTH_INDEFINITE,
    //     action: {
    //       text: 'UNDO',
    //       textColor: 'green',
    //     },
    //   });
    // }
  };


  componentDidMount() {
    
    const {displayNoteData, key, searchOpen, CardBolean} =
      this.props.route.params;
   
    //if(CardBolean==true ){
    this.focusListener = this.props.navigation.addListener('focus', () => {
      const {labelArrDataState, labelArrayTrueFalse} = this.props.route.params;
      // console.log('2222222222222222',labelArrayTrueFalse);
      this.setState({updatedLabelTrueFalse: labelArrayTrueFalse});
      if (labelArrayTrueFalse == true) {
        this.setState({labelArrayfromLabelArr: labelArrDataState});
      } else {
        this.setState({labelArrayfromLabelArr: displayNoteData._data.LabelArr});
      }
    });
    /// }

    if (searchOpen) {
      //console.log('keyyyyyyyyyyyyyyyyyy',key);
      //console.log('searchOpennnnnnnnnnnnnnnnnnnn',searchOpen);
      this.setState(
        {
          key: key,
          title: displayNoteData.Title,
          color: displayNoteData.Colour,
          description: displayNoteData.Description,
          pin: displayNoteData.Pin,
          archive: displayNoteData.Archive,
          trash: displayNoteData.Trash,
        },
        () => console.log('notedataaaaaa', displayNoteData.Title),
      );
      //console.log('keyyyyyyyyyy',displayNoteData)
    } else {
      this.setState({
        key: key,
        title: displayNoteData._data.Title,
        color: displayNoteData._data.Colour,
        description: displayNoteData._data.Description,
        pin: displayNoteData._data.Pin,
        archive: displayNoteData._data.Archive,
        trash: displayNoteData._data.Trash,
        labelArrData: displayNoteData._data.LabelArr,
      }); //,()=>console.log('notedataaaaaa',this.state.labelArrData)
      //console.log('keyyyyyyyyyy',key)
    }
  }

  handleNavigateEditeScreen = () => {
    // getLabel().then(res => {
    //   console.log('eeeeeeeeeeeeeeee',res);
    // });
    EditLabelForEditeLabelScreen1(this.state.labelArrData);

    setTimeout(() => {
      this.props.navigation.navigate('EditeLabelScreen', {
        labelArrData1: this.state.labelArrData,
      });
    }, 60);
  };

  handleLabel = () => {
    setTimeout(() => {
      this.props.navigation.navigate('EditeLabelScreen', {
        labelArrData1: this.state.labelArrData,
      });
    }, 70);
  };

  toggleModal = () => {
   // console.log('isModelVisiblehhhhhhhhhhhhhhhhhhhh');
    this.setState({isModalVisible: !this.state.isModalVisible});

  };

  showDate = () => {

    this.setState({isDatePickerVisible: true});
  };

  hideDate = () => {
    this.setState({
      isDatePickerVisible: false,
    });
  };

  handleDate = date => {
    console.warn('A date has been picked: ', date);
  };

  showTime = () => {
    this.setState({isTime: true});
  };

  hideTime = () => {
    this.setState({isTime: false});
  };

  handleTime = time => {
    console.warn('time is picked', time);
    this.hideTime();
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

          <View style={{flexDirection: 'row', marginRight: 20}}>
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
            {/* /////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <View style={{marginLeft: 22}}>
              <TouchableOpacity onPress={() => this.RBSheetReminder.open()}>
                <Image
                  style={EditeNoteScreenCss.reminderpluspic}
                  source={require('../Assets/icons/reminderplus.png')}
                />
              </TouchableOpacity>
            </View>

            <RBSheet
              ref={ref => {
                this.RBSheetReminder = ref;
              }}
              height={235}
              customStyles={{
                container: {
                  backgroundColor: this.state.color,
                },
              }}>
              <View>
                <TouchableOpacity>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <View style={EditeNoteScreenCss.imageView}>
                      <Image
                        style={EditeNoteScreenCss.watchImg}
                        source={require('../Assets/icons/watch1.png')}
                      />
                      <Text style={{marginLeft: 30}}>Later today </Text>
                    </View>
                    <Text style={{marginRight: 20, marginTop: 10}}>
                      6.00 pm
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <View style={EditeNoteScreenCss.imageView}>
                      <Image
                        style={EditeNoteScreenCss.watchImg}
                        source={require('../Assets/icons/watch1.png')}
                      />
                      <Text style={{marginLeft: 30}}>Tomorrow morning</Text>
                    </View>
                    <Text style={{marginRight: 20, marginTop: 10}}>
                      8.00 am
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.toggleModal}>
                  <View style={EditeNoteScreenCss.imageView}>
                    <Image
                      style={EditeNoteScreenCss.watchImg}
                      source={require('../Assets/icons/watch1.png')}
                    />
                    <Text style={{marginLeft: 30}}>Choose a date & time</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </RBSheet>

            <Modal isVisible={this.state.isModalVisible}>
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 10,
                  //alignItems: 'center',
                }}>
                <View
                  style={{width: '80%', marginLeft: '10%', marginRight: '10%'}}>
                  <Text style={{fontSize: 24, marginTop: 15}}>
                    Add reminder
                  </Text>
                  <View style={{marginTop: 20}}>
                    <TouchableOpacity onPress={this.showDate}>
                      <Text>Select Date</Text>
                    </TouchableOpacity>
                  </View>
                  <DateTimePickerModal
                    isVisible={this.state.isDatePickerVisible}
                    mode="date"
                    onConfirm={this.handleDate}
                    onCancel={this.hideDate}
                  />

                  <View
                    style={{
                      backgroundColor: 'gray',
                      height: 1,
                      width: '100%',
                      // marginLeft: '5%',
                      // marginRight: '5%',
                      marginTop: 10,
                    }}></View>

                  <View style={{marginTop: 20}}>
                    <TouchableOpacity onPress={this.showTime}>
                      <Text>Select Time</Text>
                    </TouchableOpacity>
                  </View>
                  <DateTimePickerModal
                    isVisible={this.state.isTime}
                    mode="time"
                    onConfirm={this.handleTime}
                    onCancel={this.hideTime}
                  />

                  <View style={{flexDirection: 'row', marginBottom: 10}}>
                    <Button
                      uppercase={false}
                      style={{marginTop: 40, marginLeft: '40%', width: '30%'}}
                      mode="text"
                      onPress={this.toggleModal}>
                      <Text style={{color: 'blue'}}>Cancel</Text>
                    </Button>

                    <Button
                      uppercase={false}
                      style={{
                        marginTop: 40,
                        marginLeft: '1%',
                        width: '30%',
                        backgroundColor: 'blue',
                        borderRadius: 20,
                      }}
                      mode="contained"
                      onPress={this.toggleModal}>
                      <Text>Save</Text>
                    </Button>
                  </View>
                </View>
              </View>
            </Modal>

            {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <View style={{marginLeft: 22}}>
              <TouchableOpacity onPress={this.handleArchive}>
                <Image
                  style={EditeNoteScreenCss.archivepic}
                  source={require('../Assets/icons/archive.png')}
                />
              </TouchableOpacity>
            </View>
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
            value={this.state.title}
          />

          <TextInput
            multiline={true}
            numberOfLines={1}
            placeholder="Note"
            style={EditeNoteScreenCss.noteinputtext}
            onChangeText={this.handleNoteDescription}
            value={this.state.description}
          />
        </View>

        
        {this.state.updatedLabelTrueFalse ? (
          <View
            style={{
              flexWrap: 'wrap',
              marginLeft: 12,
              flexDirection: 'row',
              marginRight: 10,
            }}>
            {

              this.state.labelArrayfromLabelArr.map(labelData => {
                return (
                  <View key={labelData.id}>
                    <TouchableOpacity
                      onPress={this.handleNavigateEditeScreen}
                      style={{
                        backgroundColor: 'gray',
                        borderRadius: 20,
                        justifyContent: 'center',
                        padding: 5,
                        marginRight: 5,
                        marginTop: 5,
                      }}>
                      <Text>{labelData}</Text>
                    </TouchableOpacity>
                  </View>
                );
              })
            }
          </View>
        ) : (
          <View
            style={{
              flexWrap: 'wrap',
              marginLeft: 12,
              flexDirection: 'row',
              marginRight: 10,
            }}>
            {
              //this.state.updatedLabelTrueFalse?this.state.labelArrayfromLabelArr:this.state.labelArrData.map(labelData=>{

              this.state.labelArrData.map(labelData => {
                return (
                  <View key={labelData.id}>
                    <TouchableOpacity
                      onPress={this.handleNavigateEditeScreen}
                      style={{
                        backgroundColor: 'gray',
                        borderRadius: 20,
                        justifyContent: 'center',
                        padding: 5,
                        marginRight: 5,
                        marginTop: 5,
                      }}>
                      <Text>{labelData}</Text>
                    </TouchableOpacity>
                  </View>
                );
              })
            }
          </View>
        )}

        {/***************************************************************** */}

        <View style={EditeNoteScreenCss.footerContainer}>
          <View style={EditeNoteScreenCss.footer}>
            <View style={{flexDirection: 'row'}}>
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
            </View>
            <RBSheet
              ref={ref => {
                this.RBSheet = ref;
              }}
              height={235}
              openDuration={1}>
              <ColorChager colorDataProps={this.colorHandler} />
            </RBSheet>

            <View>
              <TouchableOpacity onPress={() => this.RBSheetMore.open()}>
                <Image
                  style={EditeNoteScreenCss.threedotmenue}
                  source={require('../Assets/icons/threedotmenue.png')}
                />
              </TouchableOpacity>
            </View>
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
