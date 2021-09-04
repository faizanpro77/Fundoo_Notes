import React, {Component} from 'react';
import {Card} from 'react-native-elements';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableHighlight,
} from 'react-native';
import DashBoardCss from '../css/DashBoardCss';
import DashboardCard from '../Component/DashboardCard';
class DashBoardScreen extends Component {
  constructor(props) {
    super(props);
  }

  navigateCreateNOteScreen = () => {
    this.props.navigation.navigate('CreateNote');
  };

  render() {
    return (
      <View style={DashBoardCss.container1}>
        <View style={DashBoardCss.header}>
          <Card containerStyle={DashBoardCss.card}>
            <View style={DashBoardCss.navBar}>
              <View style={{flexDirection: 'row'}}>
                <View style={DashBoardCss.menueImgview}>
                  <TouchableOpacity>
                    <Image
                      style={DashBoardCss.menueImg}
                      source={require('../Assets/icons/menu.png')}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity>
                    <Text>Search your notes</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={DashBoardCss.listprofileview}>
                <View style={DashBoardCss.listImgview}>
                  <TouchableOpacity>
                    <Image
                      style={DashBoardCss.listImg}
                      source={require('../Assets/icons/list.png')}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity>
                    <Image
                      style={DashBoardCss.profileImg}
                      source={require('../Assets/icons/profile.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Card>
        </View>

        <DashboardCard />

        <View style={DashBoardCss.footerContainer}>
          <View style={DashBoardCss.footer}>
            <View>
              <TouchableOpacity>
                <Image
                  style={DashBoardCss.checkboxImg}
                  source={require('../Assets/icons/checkbox.png')}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity>
                <Image
                  style={DashBoardCss.brushImg}
                  source={require('../Assets/icons/brush.png')}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity>
                <Image
                  style={DashBoardCss.micImg}
                  source={require('../Assets/icons/mic.png')}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity>
                <Image
                  style={DashBoardCss.Img}
                  source={require('../Assets/icons/photo.png')}
                />
              </TouchableOpacity>
            </View>

            <View style={DashBoardCss.plusView}>
              <TouchableOpacity
                style={DashBoardCss.Touchablestyle}
                onPress={this.navigateCreateNOteScreen}
                //hitSlop={{ top: 200, bottom: 200, left: 200, right: 200 }}
              >
                <Image
                  style={DashBoardCss.plusImg}
                  source={require('../Assets/icons/add.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default DashBoardScreen;
