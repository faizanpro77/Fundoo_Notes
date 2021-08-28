import React,{Component} from 'react'
import { View,Text } from 'react-native'
import StackNavigation from './src/Navigation/StackNavigation';
import DashBoardScreen from './src/Sceens/DashBoardScreen';
import ResetPassword from './src/Sceens/ResetPasswordScreen';


class App extends Component{
    constructor(){
        super();
            }

    render(){
        return(
           <StackNavigation/>
        // <View>
        //     <ResetPassword/>
        // </View>
                );
    }
}


export default App