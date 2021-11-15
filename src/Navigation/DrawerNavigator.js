import React from 'react';
//import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DashBoardScreen from '../screens/DashBoardScreen';
import CreateNoteScreen from '../screens/CreateNoteScreen';
import ArchiveScreen from '../screens/ArchiveScreen';
import DeleteScreen from '../screens/DeleteScreen';
import SqlLiteScreen from '../screens/SqlLiteScreen';
import {DrawerContent} from './DrawerContent';
import StackNavigation from './StackNavigation';
import LabelScreen from '../screens/LabelScreen';
import UpdateDeleteLabel from '../screens/UpdateDeleteLabel';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="dashBoard"
      screenOptions={{headerShown: false}}
      drawerContent={props => <DrawerContent {...props} />}>
       <Drawer.Screen name="dashBoard" component={DashBoardScreen} />
      <Drawer.Screen name="archive" component={ArchiveScreen} />
      <Drawer.Screen name="Delete" component={DeleteScreen} />
      <Drawer.Screen name="SqlLiteScreen" component={SqlLiteScreen} /> 
      <Drawer.Screen name="LabelScreen" component={LabelScreen}/>
      <Drawer.Screen name='UpdateDeleteLabel' component={UpdateDeleteLabel}/>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
