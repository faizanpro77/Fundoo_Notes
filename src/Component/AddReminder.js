import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Button} from 'react-native-paper';
import moment from 'moment';
import Modal from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import EditeNoteScreenCss from '../css/CreateNoteScreenCss';
//import PushNotification from 'react-native-push-notification';
import IconeMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default class AddReminder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      isDatePickerVisible: false,
      isTime: false,
      currrentDate: '',
      selectedDate: new Date(),
      selectedTime: new Date(moment().add(3, 'h')),
      chipBoolean: true,
      color: 'white',
      morningTime: '',
      eveningTime: '',
      deleteTimeLabelBoolean:false
    };
  }
  handleDeleteLabel=()=>{
  this.setState({deleteTimeLabelBoolean:false},()=>this.props.DeleteTimeLabelBooleanRecieve(this.state.deleteTimeLabelBoolean))
 
 this.setState({isModalVisible: false});

  }

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  handleSave = () => {
    this.props.sendDateTime(
      this.state.selectedDate,
      this.state.selectedTime,
      this.state.chipBoolean,
    );

    this.toggleModal();
  };

  componentDidMount(){
    //2021-10-06T16:50:37.930Z
//console.log('this.state.selectedTimeeeeeee',this.state.selectedTime);
    let tomorrow = new Date();
    tomorrow = moment(tomorrow).add(1, 'day').format('YYYY-MM-DD'); // for specific format
    var timeAndlabel1 = moment(tomorrow).add(8, 'h').format('h:mm a');
    var timeAndlebel2 = moment(tomorrow).add(18, 'h').format('h:mm a');
    this.setState({morningTime: timeAndlabel1, eveningTime: timeAndlebel2});
    //console.log('timeAndlabel1',timeAndlabel1);

   
     
     var dateLabel = tomorrow//"2021-10-07";
var timeLabel = "12:00";

var timeAndDate = moment(dateLabel).startOf(timeLabel);
  let date11 = JSON.stringify(timeAndDate).slice(1, 11);
 let time11 = JSON.stringify(timeAndDate).slice(11, 25);
 let dateShedule = new Date(date11 + time11);
 //console.log('dateShedule',date11);
      //  PushNotification.localNotificationSchedule({
      //    //id:'123',
      //    channelId: 'test-channel',
      //    title: 'jkhkhlkhjk',
      //    message: 'jjkhkjkhkhj',
      //    date: dateShedule,
      //  });
     }
   
 

  

  render() {
    return (
      <View>
        <View style={{marginLeft: 22}}>
          <TouchableOpacity onPress={() => this.RBSheetReminder.open()}>
            {/* <Image
              style={EditeNoteScreenCss.reminderpluspic}
              source={require('../Assets/icons/reminderplus.png')}
            /> */}
            <IconeMaterialCommunityIcons
            name='bell-plus-outline'
            size={25}
            color={'black'}
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
              backgroundColor: this.props.colorProps,
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
                  <Text style={{marginLeft: 30}}>Tomorrow morning</Text>
                </View>
                <Text style={{marginRight: 20, marginTop: 10}}>{this.state.morningTime}</Text>
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
                  <Text style={{marginLeft: 30}}>Tomorrow Evening</Text>
                </View>
                <Text style={{marginRight: 20, marginTop: 10}}>{this.state.eveningTime}</Text>
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
            <View style={{width: '80%', marginLeft: '10%', marginRight: '10%'}}>
              <Text style={{fontSize: 24, marginTop: 15}}>Add reminder</Text>
              <View style={{marginTop: 20}}>
                <TouchableOpacity
                  onPress={() => this.setState({isDatePickerVisible: true})}>
                  <Text>
                    {moment(this.state.selectedDate).format('D MMMM')}
                  </Text>
                </TouchableOpacity>
              </View>
              <DateTimePickerModal
                isVisible={this.state.isDatePickerVisible}
                mode="date"
                // onConfirm={this.handleDate}
                onConfirm={date =>
                  this.setState({
                    selectedDate: date,
                    isDatePickerVisible: false,
                  })
                }
                // onCancel={this.hideDate}
                onCancel={() => this.setState({isDatePickerVisible: false})}
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
                <TouchableOpacity onPress={() => this.setState({isTime: true})}>
                  <Text>
                    {moment(this.state.selectedTime).format('h:mm a')}{' '}
                  </Text>
                </TouchableOpacity>
              </View>

              <DateTimePickerModal
                isVisible={this.state.isTime}
                mode="time"
                // onConfirm={this.handleTime}
                onConfirm={time => {
                  this.setState({selectedTime: time, isTime: false});
                }}
                // onCancel={this.hideTime}
                onCancel={() => this.setState({isTime: false})}
              />

              <View style={{flexDirection: 'row', marginBottom: 10}}>
                <Button
                  uppercase={false}
                  style={{marginTop: 40, marginLeft: '15%', width: '30%'}}
                  mode="text"
                  onPress={this.handleDeleteLabel}>
                  <Text style={{color: 'blue'}}>Delete</Text>
                </Button>

                <Button
                  uppercase={false}
                  style={{marginTop: 40, marginLeft: '-5%', width: '30%'}}
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
                  onPress={this.handleSave}>
                  <Text>Save</Text>
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
