import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import IColor from '../models/IColor';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {getRandomColor} from '../calculations/color'

export default () => {
  const {navigate} =
    useNavigation<StackNavigationProp<ParamListBase>>();
  const [color, setColor] = React.useState<IColor>(getRandomColor());
  return (
    <View
      style={[styles.container, {backgroundColor: color.hex}]}
      onTouchEnd={(e) => {
        console.log('touched');
        console.log(e.nativeEvent.locationX);
        console.log(e.nativeEvent.locationY);
        setColor(getRandomColor(color));
      }}
    >
      <Text>{color.name}</Text>
      <Text>{color.rgb}</Text>
      <Text>{color.hex}</Text>
      <Text>Tap anywhere to get a new color</Text>
      <Pressable
        style={null}
        onPress={() => {
          navigate('Settings');
        }}
      >
        <Text>Go to settings</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 32,
    flex: 1,
    justifyContent: 'center',
  },
});
