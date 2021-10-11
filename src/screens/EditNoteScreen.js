import React, {Component} from 'react';
import {TouchableOpacity, View, Image, TextInput, Text} from 'react-native';
import EditeNoteScreenCss, {passcolordata} from '../css/CreateNoteScreenCss';
import {
  deleteBooleanChipUpdate,
  EditLabelForEditeLabelScreen1,
  editNoteDataUpdate,
  editNoteDataUpdateTimeDate,
  generateRandomIdData,
  getLabel,
  noteData,
  setAllCheckBoxValueFalse,
  updateNotificationId,
} from '../services/NotesServices';
import Snackbar from 'react-native-snackbar';
import RBSheet from 'react-native-raw-bottom-sheet';
import ColorChager from '../Component/Color';
import {getNotes} from '../services/NotesServices';
import Modal from 'react-native-modal';
import {Button} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AddReminder from '../Component/AddReminder';
import moment from 'moment';
import PushNotification from 'react-native-push-notification';
import firestore from '@react-native-firebase/firestore';


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
      formateDate: '',
      formateTime: '',
      timeDateBoolean: false,
      selectedDate: '',
      selectedTime: '',
      timeDateBoolean1: false,
      RandomId1: '',
      RandomId:''
    };
  }

  //handle archive true false and nevigat dashbord
  handleArchive = () => {
    this.setState({archive: !this.state.archive}, () => {
      console.warn('archiveeeeeeeee', this.state.archive)
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
      console.warn('Trashhhhhhhhhhhh', this.state.trash)
        // this.props.navigation.navigate('DashBoard');
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
    //  console.log('displayNoteDatadisplayNoteData',displayNoteData._data.RandomId);

    if (this.state.timeDateBoolean == true) {
      this.handleLocalPushNotification();
    }
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
    if (this.state.timeDateBoolean1 == true) {
      editNoteDataUpdateTimeDate(
        this.state.key,
        moment(this.state.selectedDate).format('D MMM'),
        moment(this.state.selectedTime).format('h:mm a'),
        this.state.timeDateBoolean,
      );
    }
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
    this.generateRandomId()
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
        this.setState({labelArrayfromLabelArr: this.state.labelArrData});
      }
    });
    /// }

    if (searchOpen) {
      //console.log('keyyyyyyyyyyyyyyyyyy',key);
      //console.log('searchOpennnnnnnnnnnnnnnnnnnn',searchOpen);
      this.setState({
        key: key,
        title: displayNoteData.Title,
        color: displayNoteData.Colour,
        description: displayNoteData.Description,
        pin: displayNoteData.Pin,
        archive: displayNoteData.Archive,
        trash: displayNoteData.Trash,
        labelArrData: displayNoteData.LabelArr,

      });
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
        formateDate: displayNoteData._data.Date,
        formateTime: displayNoteData._data.Time,
        timeDateBoolean: displayNoteData._data.DateTimeChipBoolean,
        RandomId1: displayNoteData._data.RandomId,
      }); //() => console.log('displayNoteDatadisplayNoteData', this.state.RandomId1)
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

  generateRandomId = () => {
    let randomId = generateRandomIdData();
    console.log('randomIdrandomId', randomId);
    this.setState({RandomId: randomId},()=>console.log('ttttttt11111ttttttttt',this.state.RandomId));
  };

  handleLocalPushNotification = () => {
    // PushNotification.cancelAllLocalNotifications();
        updateNotificationId(this.state.key,this.state.RandomId)
    if (this.state.timeDateBoolean1 == true) {
      if (this.state.selectedDate != null && this.state.selectedDate != null) {
        let date = JSON.stringify(this.state.selectedDate).slice(1, 11);
        let time = JSON.stringify(this.state.selectedTime).slice(11, 25);
        let dateShedule = new Date(date + time);
        PushNotification.localNotificationSchedule({
          id:this.state.RandomId,
          channelId: 'test-channel',
          title: this.state.title,
          message: this.state.description,
          date: dateShedule,
        });
      }
    }
  };

  deleteBooleanUpdate = deleteBoolean => {
   // console.log('displayNoteDatadisplayNoteData', this.state.RandomId1);
    PushNotification.cancelLocalNotification({id: this.state.RandomId1});
    this.setState({timeDateBoolean: deleteBoolean}, () =>
      deleteBooleanChipUpdate(this.state.key, this.state.timeDateBoolean),
    );
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

            {/* /*jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj  */}

            <AddReminder
              colorProps={this.state.color}
              sendDateTime={(date, time, chip) =>
                this.setState({
                  selectedDate: date,
                  selectedTime: time,
                  timeDateBoolean1: chip,
                  timeDateBoolean: chip,
                })
              }
              //  DeleteTimeLabelBooleanRecieve={(deleteBoolean)=>this.setState({timeDateBoolean:deleteBoolean})}
              DeleteTimeLabelBooleanRecieve={this.deleteBooleanUpdate}
            />

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
            {this.state.labelArrayfromLabelArr.map(labelData => {
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
            })}
          </View>
        ) : (
          <View
            style={{
              flexWrap: 'wrap',
              marginLeft: 12,
              flexDirection: 'row',
              marginRight: 10,
            }}>
            {/* /////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <View>
              {this.state.timeDateBoolean ? (
                <View
                  style={{
                    marginBottom: 10,
                    backgroundColor: 'lightgrey',
                    height: 30,
                    borderRadius: 10,
                    justifyContent: 'center',
                    marginTop: 5,
                    marginRight: 7,
                  }}>
                  {this.state.timeDateBoolean1 ? (
                    <Text>
                      {moment(this.state.selectedDate).format('D MMM')},
                      {moment(this.state.selectedTime).format('h:mm a')}
                    </Text>
                  ) : (
                    <Text>
                      {this.state.formateDate},{this.state.formateTime}
                    </Text>
                  )}
                </View>
              ) : null}
            </View>

            {this.state.labelArrData.map(labelData => {
              return (
                <View key={labelData.id}>
                  <TouchableOpacity
                    onPress={this.handleNavigateEditeScreen}
                    style={{
                      backgroundColor: 'lightgrey',
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
            })}
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
