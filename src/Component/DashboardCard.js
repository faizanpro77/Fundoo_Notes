import React from 'react';
import {Card} from 'react-native-elements';
import {Text,View} from 'react-native'
import DashBoardCardCss from '../css/DashBoardCardCss';

export default function DashboardCard() {
    return(
        <View style = {DashBoardCardCss.cardview}>
              <Card
    containerStyle={DashBoardCardCss.card}>
    <Card.Title>Today task</Card.Title>
    <Text>*complete keep ui design </Text>
  </Card>
  </View>
    );
}
