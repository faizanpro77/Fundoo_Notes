import React, {Component} from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Text,
  StatusBar,
} from 'react-native';
import EditeNoteScreenCss, {passcolordata} from '../css/CreateNoteScreenCss';
import {
  generateRandomIdData,
  getLabel,
  noteData,
} from '../services/NotesServices';
import Snackbar from 'react-native-snackbar';
import RBSheet from 'react-native-raw-bottom-sheet';
import ColorChager from '../Component/Color';
import moment from 'moment';
import AddReminder from '../Component/AddReminder';
import PushNotification from 'react-native-push-notification';
import IconeMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconeMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconeIonicons from 'react-native-vector-icons/Ionicons';
import IconeAntDesign from 'react-native-vector-icons/AntDesign';



export default class CreateNoteScreen extends Component {
  constructor(props) {
    super(props);
    //***const {params} = this.props?.route;
    //    const params = this.props?.route?.params

    // console.log(
    //   'llllllllllllllllll',
    //   params?.displayNoteData?._data?.Title || '',
    // );
  
    
    this.state = {
      //** */ title: params?.displayNoteData?._data?.Title || '',
     
      title: '',
      description: '',
      color: 'white',

      trash: false,
      pin: false,
      archive: false,
      labelDataArr: [],
      doll: [],
      onLoad: false,
      onLoad11: false,
      isModalVisible: false,
      isDatePickerVisible: false,
      isTime: false,
      currrentDate: '',
      selectedDate: '',
      selectedTime: '',
      dateTimeChipBoolean: false,
      momentFormateDate: '',
      momentFormateTime: '',
      RandomId: '',
      // key:''
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
  backArrow = async addLabelDataArr => {
    if (this.state.dateTimeChipBoolean == true) {
      this.handleLocalPushNotification();
    }

    // if (params?.edite) {
    //   if (
    //     this.state.title != '' &&
    //     this.state.description != '' &&
    //     this.state.color != ''
    //   )
    //     var response = editNoteDataUpdate(
    //       this.state.key,
    //       this.state.title,
    //       this.state.description,
    //       this.state.color,
    //       this.state.trash,
    //       this.state.pin,
    //       this.state.archive,
    //       this.state.labelArrayfromLabelArr,
    //     );
    //   this.props.navigation.navigate('DashBoard'); //goBack()
    //   if (this.state.timeDateBoolean1 == true) {
    //     editNoteDataUpdateTimeDate(
    //       this.state.key,
    //       moment(this.state.selectedDate).format('D MMM'),
    //       moment(this.state.selectedTime).format('h:mm a'),
    //       this.state.timeDateBoolean,
    //     );
    //   }
    // } else {
    if (
      this.state.title != '' &&
      this.state.description != '' &&
      this.state.color != ''
    ) {
      var response = await noteData(
        this.state.title,
        this.state.description,
        this.state.color,
        this.state.trash,
        this.state.pin,
        this.state.archive,
        this.state.labelDataArr,
        moment(this.state.selectedDate).format('D MMM'),
        moment(this.state.selectedTime).format('h:mm a'),
        this.state.dateTimeChipBoolean,
        this.state.RandomId,
      );
    }
    // console.log('responsenotedata***************' + response);
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
    // }
  };

  componentDidUpdate() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      const {LabbelArr} = this.props.route.params;
      this.setState({labelDataArr: LabbelArr});
    });
  }

  componentDidMount = () => {
    this.generateRandomId();
  };

  generateRandomId = () => {
    let randomId = generateRandomIdData();
    // console.log('randomIdrandomId', randomId);
    this.setState({RandomId: randomId});
  };

  handleLocalPushNotification = () => {
    // PushNotification.cancelAllLocalNotifications();
    // console.log('RanomIdRanomId7777777777',this.state.RandomId);

    if (this.state.selectedDate != null && this.state.selectedDate != null) {
      let date = JSON.stringify(this.state.selectedDate).slice(1, 11);
      let time = JSON.stringify(this.state.selectedTime).slice(11, 25);
      let dateShedule = new Date(date + time);
      PushNotification.localNotificationSchedule({
        id: this.state.RandomId,
        channelId: 'test-channel',
        title: this.state.title,
        message: this.state.description,
        date: dateShedule,
      });
    }
  };

  render() {
    var addLabelDataArr = [];
    // const {displayNoteData} = this.props.route.params;
    // console.log('4444444444444',displayNoteData._data.Title);

    return (
      // <View style={EditeNoteScreenCss.container1}>
      <View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: this.state.color,
        }}>
        {/* <Text>
          99999999
          {displayNoteData._data.Title}
        </Text> */}
        <StatusBar
          backgroundColor={this.state.color}
          hidden={false}
          barStyle="dark-content"
        />
        <View style={EditeNoteScreenCss.container2}>
          <View>
            <TouchableOpacity
              onPress={event => this.backArrow(addLabelDataArr)}>
              <IconeIonicons
                style={EditeNoteScreenCss.backArrowpic}
                name="arrow-back"
                size={25}
                color={'black'}
              />
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row', marginRight: 20}}>
            <View>
              {this.state.pin ? (
                <TouchableOpacity onPress={this.handlePin}>
                  <IconeMaterialCommunityIcons
                    name="pin"
                    size={25}
                    color={'black'}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={this.handlePin}>
                  <IconeMaterialCommunityIcons
                    name="pin-outline"
                    size={25}
                    color={'black'}
                  />
                </TouchableOpacity>
              )}
            </View>
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <AddReminder
              colorProps={this.state.color}
              sendDateTime={(date, time, chip) =>
                this.setState({
                  selectedDate: date,
                  selectedTime: time,
                  dateTimeChipBoolean: chip,
                })
              }
            />

            {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <View style={{marginLeft: 22}}>
              <TouchableOpacity onPress={this.handleArchive}>
              <IconeIonicons name="archive-outline" size={25} color={'black'} />

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
          />
        </View>

        <View
          style={{
            flexWrap: 'wrap',
            marginLeft: 12,
            flexDirection: 'row',
          }}
          key={this.state.labelDataArr.id}>
          <View>
            {this.state.dateTimeChipBoolean ? (
              <View
                style={{
                  marginBottom: 10,
                  backgroundColor: 'lightgrey',
                  height: 30,
                  borderRadius: 10,
                  justifyContent: 'center',

                  marginRight: 7,
                }}>
                <Text>
                  {moment(this.state.selectedDate).format('D MMM') +
                    ',' +
                    moment(this.state.selectedTime).format('h:mm a')}
                </Text>
              </View>
            ) : null}
          </View>

          {this.state.labelDataArr.map(labelData => {
            //console.log('============================>>',addLabelDataArr);

            return (
              <View key={labelData.id}>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'lightgrey',
                    borderRadius: 20,
                    justifyContent: 'center',
                    padding: 5,
                    marginRight: 5,
                    marginBottom: 10,
                  }}>
                  <Text>{labelData}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

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
              height={270}
              duration={1}>
              <TouchableOpacity onPress={this.handleTrash}>
                <View style={{flexDirection: 'row', height: 45}}>
                  <IconeMaterialCommunityIcons
                    style={{marginTop: 15, marginLeft: 10}}
                    name="trash-can-outline"
                    size={25}
                    color={'black'}
                  />
                  <Text style={{top: 20, marginLeft: 20}}>Delete</Text>
                </View>
              </TouchableOpacity>
              <View style={{flexDirection: 'row'}}>
                <IconeMaterialIcons
                  style={{marginTop: 15, marginLeft: 10}}
                  name="content-copy"
                  size={23}
                  color={'black'}
                />
                <Text style={{top: 20, marginLeft: 20}}>Make a copy</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <IconeIonicons
                  style={{marginTop: 15, marginLeft: 10}}
                  name="share-social-outline"
                  size={25}
                  color={'black'}
                />
                <Text style={{top: 20, marginLeft: 20}}>Send</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <IconeMaterialCommunityIcons
                  style={{marginTop: 15, marginLeft: 10}}
                  name="account-plus-outline"
                  size={25}
                  color={'black'}
                />
                <Text style={{top: 20, marginLeft: 20}}>Collaborator</Text>
              </View>

              <TouchableOpacity onPress={this.handleLabel}>
                <View style={{flexDirection: 'row', height: 45}}>
                  <IconeMaterialIcons
                    style={{marginTop: 15, marginLeft: 10}}
                    name="label-outline"
                    size={25}
                    color={'black'}
                  />
                  <Text style={{top: 20, marginLeft: 20}}>Label</Text>
                </View>
              </TouchableOpacity>
            </RBSheet>
          </View>
        </View>
      </View>
    );
  }
}
