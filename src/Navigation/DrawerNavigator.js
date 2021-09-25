import React from 'react';
//import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashBoardScreen from '../screens/DashBoardScreen';
import CreateNoteScreen from '../screens/CreateNoteScreen';
import ArchiveScreen from '../screens/ArchiveScreen';
import DeleteScreen from '../screens/DeleteScreen';



const Drawer = createDrawerNavigator();

 const DrawerNavigator = () =>{

    return(
            <Drawer.Navigator initialRouteName='DashBoard' screenOptions={{headerShown:false}}>
                <Drawer.Screen name='DashBoard' component={DashBoardScreen} />
                <Drawer.Screen name='archive' component={ArchiveScreen}/>
                <Drawer.Screen name='Delete' component={DeleteScreen}/>
                


            </Drawer.Navigator>
    )
}

export  default  DrawerNavigator;