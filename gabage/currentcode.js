{
  labelArray.map(label => {
    return (
      <View key={label.id} style={LabelCss.labeltxtcheckView}>
        <Image
          style={LabelCss.labelpic}
          source={require('../Assets/icons/label1.png')}
        />
        <Text style={LabelCss.labelpriority}>{label._data.Label}</Text>
      </View>
    );
  });
}
