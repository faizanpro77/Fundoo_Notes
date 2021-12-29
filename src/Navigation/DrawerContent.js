import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import {Text} from 'react-native-paper';
import CustomDrawerCss from '../css/CustomDrawerCss';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
import IconeIonicons from 'react-native-vector-icons/Ionicons';
import IconeFeather from 'react-native-vector-icons/Feather';
import IconeMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {fetchLabelsData, getLabel} from '../services/NotesServices';
import {useSelector, useDispatch} from 'react-redux';
import {setLabelData} from '../redux/actions';

export function DrawerContent({props, navigation}) {
  const [labelArray, setlabelArray] = useState([]);
  const labelData = useSelector(state => state.labelData);
  const dispatch = useDispatch();

  // fetch data using redux labelData state
  const fetchData = useCallback(async () => {
    let data = await fetchLabelsData();
    // setLabelData(data);
    dispatch(setLabelData(data));
  }, [dispatch]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation, fetchData]);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={CustomDrawerCss.googlekeeptxtView}>
          <Text style={CustomDrawerCss.keeptxt}>Fundoo Notes</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('dashBoard')}>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 20,
              alignItems: 'center',
              height: 40,
            }}>
            <IconAntDesign name="bulb1" size={20} color={'black'} />
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
              color={'black'}
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
          <TouchableOpacity>
            <Text>Labels</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('UpdateDeleteLabel')}>
            <Text style={CustomDrawerCss.Edit}>Edit</Text>
          </TouchableOpacity>
        </View>

        {
          /********************************************************************************************* */
          labelData.map((label, Index) => {
            //console.log('iddddddddddddddddd',label.Label+ ' ' + Index);
            return (
              <TouchableOpacity
                key={label.labelId}
                onPress={() => navigation.navigate('dashBoard')}>
                <View style={CustomDrawerCss.ImagelabeltxtView}>
                  <IconeMaterialCommunityIcons
                    name="label-outline"
                    size={25}
                    color={'black'}
                  />
                  <Text style={CustomDrawerCss.labelpriority}>
                    {label.Label}
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
            <IconeFeather name="plus" size={25} color={'black'} />
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
            <IconeIonicons name="archive-outline" size={20} color={'black'} />
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
            <IconeMaterialCommunityIcons
              name="trash-can-outline"
              size={20}
              color={'black'}
            />
            <Text style={{fontSize: 15, marginLeft: 20}}>Deleted</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 20,
            alignItems: 'center',
            height: 40,
            marginTop: 10,
          }}>
          <IconeIonicons name="settings-outline" size={20} color={'black'} />
          <Text style={{fontSize: 15, marginLeft: 20}}>Settings</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 20,
            alignItems: 'center',
            height: 40,
            marginTop: 10,
          }}>
          <IconeIonicons name="help-circle-outline" size={20} color={'black'} />
          <Text style={{fontSize: 15, marginLeft: 20}}>Helps & feedback</Text>
        </View>

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
