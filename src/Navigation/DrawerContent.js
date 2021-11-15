import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';

import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import CustomDrawerCss from '../css/CustomDrawerCss';
//import { Icon } from "react-native-elements/dist/icons/Icon";
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
import IconeIonicons from 'react-native-vector-icons/Ionicons';
import IconeFeather from 'react-native-vector-icons/Feather';
import IconeAntDesign from 'react-native-vector-icons/AntDesign';
import IconeMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getLabel} from '../services/NotesServices';
//import CustomDrawerCss from '../css/LabelScreenCss';

export function DrawerContent({props, navigation}) {
  //const navigation = useNavigation();
  const [labelArray, setlabelArray] = useState([]);

  useEffect(() => {
    //const unsubscribe = navigation.addListener('focus', () => {
    getLabel().then(res => {
      setlabelArray(res);
    });
    // return unsubscribe;
  }, []);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={CustomDrawerCss.googlekeeptxtView}>
          <Text style={CustomDrawerCss.keeptxt}>Google Keep</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('dashBoard')}>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 20,
              alignItems: 'center',
              height: 40,
            }}>
            <IconAntDesign name="bulb1" size={20} color={'gray'} />
            <Text style={{fontSize: 15, marginLeft: 20}}>Notes</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 20,
              alignItems: 'center',
              height: 40,
              marginTop: 5,
            }}>
            <IconeIonicons
              name="notifications-outline"
              size={20}
              color={'gray'}
            />
            <Text style={{fontSize: 15, marginLeft: 20}}>Reminders</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: 'gray',
            marginTop: 10,
          }}></View>
        <View style={CustomDrawerCss.LabelsEdit}>
          <Text>Labels</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('UpdateDeleteLabel')}>
            <Text style={CustomDrawerCss.Edit}>Edit</Text>
          </TouchableOpacity>
        </View>

        {
          /********************************************************************************************* */
          labelArray.map(label => {
           // console.log('iddddddddddddddddd', label.id + ' ' + Index);
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('dashBoard')}>
                <View key={label.id} style={CustomDrawerCss.ImagelabeltxtView}>
                  <IconeMaterialCommunityIcons
                    name="label-outline"
                    size={25}
                    color={'gray'}
                  />
                  <Text style={CustomDrawerCss.labelpriority}>
                    {label._data.Label}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        }

        <TouchableOpacity
          onPress={() => navigation.navigate('UpdateDeleteLabel')}>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 20,
              alignItems: 'center',
              marginTop: 20,
            }}>
            <IconeFeather name="plus" size={25} color={'gray'} />
            <Text style={{marginLeft: 16, fontSize: 15}}>Create new label</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: 'gray',
            marginTop: 20,
          }}></View>

        <TouchableOpacity onPress={() => navigation.navigate('archive')}>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 20,
              alignItems: 'center',
              height: 40,
              marginTop: 10,
            }}>
            <IconeIonicons name="archive-outline" size={20} color={'gray'} />
            <Text style={{fontSize: 15, marginLeft: 20}}>Archive</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Delete')}>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 20,
              alignItems: 'center',
              height: 40,
              marginTop: 10,
            }}>
            <IconeAntDesign name="delete" size={20} color={'gray'} />
            <Text style={{fontSize: 15, marginLeft: 20}}>Deleted</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: 'gray',
            marginTop: 10,
          }}></View>
        <TouchableOpacity onPress={() => navigation.navigate('SqlLiteScreen')}>
          <Text style={{fontSize: 15, marginLeft: 59, marginTop: 10}}>
            SQLite
          </Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  );
}
