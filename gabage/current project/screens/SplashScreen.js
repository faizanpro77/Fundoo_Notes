import { Component } from "react";

class SplashScren extends Component {
    constructor(props){
        super(props)

        setTimeout(()=>{
            // this.props.navigation.navigate('loginScreen')
        },5000)
        
    }
    
    render() {
        return (
            <View style={styles.container1}>
                <View style={Global.ImageLabelView}>
                    <Image source={require('G:/@react native bridgelabz/Fundoo_Notes_RN/src/Assets/images/noteslogo.png')}
                        style={Global.ImageLogo}>
                    </Image>
                    <Text style={Global.FundooNotestxt}>Fundoo Notes</Text>
                </View>
                </View>
        )}
}