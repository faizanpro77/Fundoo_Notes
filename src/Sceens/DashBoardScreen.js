import React, { Component } from 'react';
import { Card } from 'react-native-elements';
import { View, Text, TouchableOpacity, Image, TouchableHighlight } from 'react-native'
import DashBoardCss from '../css/DashBoardCss';
class DashBoardScreen extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <View style={DashBoardCss.container1}>
                    <View style={DashBoardCss.header}>
                        <Card containerStyle={{ borderRadius: 10, height: 50, justifyContent: 'center' }}>
                            <View style={DashBoardCss.navBar}>
                                <View style={{ flexDirection: 'row', }} >
                                    <View style={{ marginRight: 25 }}>
                                        <TouchableOpacity>
                                            <Image style={DashBoardCss.menueImg}
                                                source={require('../Assets/icons/menu.png')} />
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <TouchableOpacity>
                                            <Text>Search your notes</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ marginRight: 25 }}>
                                        <TouchableOpacity>
                                            <Image style={DashBoardCss.listImg}
                                                source={require('../Assets/icons/list.png')} />
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <TouchableOpacity>
                                            <Image style={DashBoardCss.profileImg}
                                                source={require('../Assets/icons/profile.png')} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Card>
                    </View>
                    <Card containerStyle={{borderRadius:10,height:'25%',width:'40%',backgroundColor:'yellow',top:30}}>
                    <Card.Title>Today task</Card.Title>
                    <Text >*complete keep ui design    </Text>
                    </Card>
                    <View style={DashBoardCss.footerContainer}>
                        <View style={DashBoardCss.footer}>
                            <View >
                                <TouchableOpacity>
                                    <Image style={DashBoardCss.checkboxImg}
                                        source={require('../Assets/icons/checkbox.png')} />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity>
                                    <Image style={DashBoardCss.brushImg}
                                        source={require('../Assets/icons/brush.png')} />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity>
                                    <Image style={DashBoardCss.micImg}
                                        source={require('../Assets/icons/mic.png')} />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity>
                                    <Image style={DashBoardCss.Img}
                                        source={require('../Assets/icons/photo.png')} />
                                </TouchableOpacity>
                            </View>
                            
                            <View style={DashBoardCss.plusView} >
                                <TouchableOpacity
                                style={DashBoardCss.Touchablestyle}
                                //hitSlop={{ top: 200, bottom: 200, left: 200, right: 200 }}
                                >
                                    <Image style={DashBoardCss.plusImg}
                                        source={require('../Assets/icons/add.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
        );
    }
}

export default DashBoardScreen
