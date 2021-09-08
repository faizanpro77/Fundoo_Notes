import React, {Component} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {View,Text} from 'react-native';

const colorCode = [
  {rgbCode: 'rgb(255,255,255)', colorName: 'White'},

  {rgbCode: 'rgb(242,139,130)', colorName: 'Red'},
  {rgbCode: 'rgb(215,174,251)', colorName: 'Purple'},
  {rgbCode: 'rgb(238,130,238)', colorName: 'Violet'},
  {rgbCode: 'rgb(255,20,147)', colorName: 'Pink'},
  {rgbCode: 'rgb(210,105,30)', colorName: 'Chocholate'},
  {rgbCode: 'rgb(119,136,153)', colorName: 'Gray'},
  {rgbCode: 'rgb(128,0,0)', colorName: 'Maroon'},
  {rgbCode: 'rgb(255,140,0)', colorName: 'Red'},
  {rgbCode: 'rgb(255,215,0)', colorName: 'Gold'},
  {rgbCode: 'rgb(0,128,0)', colorName: 'Green'},
  {rgbCode: 'rgb(0,255,255)', colorName: 'Aqua'},
  {rgbCode: 'rgb(0,0,128)', colorName: 'Navy'},
];

export default class ColorChager extends Component {
  constructor() {
    super();
    this.state = {
      color: '',
    };
  }

  handleColor (color) {
    this.setState({ color:color},);
   this.props.colorDataProps(color)
  }

  render() {
    return (
      <View>
        <Text style={{marginTop: 13, marginLeft: 15}}>COLOUR</Text>
        <FlatList
          horizontal={true}
          data={colorCode}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => this.handleColor (item.rgbCode)}>
              <View
                style={{
                  backgroundColor: item.rgbCode,
                  height: 30,
                  width: 30,
                  marginTop: 24,
                  borderRadius: 30,
                  borderWidth:0.5,
                  borderColor:'gray',
               margin:7
                }}></View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.rgbCode}
          ></FlatList>
      </View>
    );
  }
}
