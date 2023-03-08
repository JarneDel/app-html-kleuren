import { useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import IColor from "../models/IColor";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { getRandomColor } from "../calculations/color";
import { SettingsIcon } from "lucide-react-native";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import useContrastColor from "../hooks/useContrastColor";

export default () => {
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>();
  const [circleColor, setCircleColor] = useState<IColor>(getRandomColor());
  const [backgroundColor, setBackgroundColor] = useState<IColor>(circleColor);
  const [scale] = useState<Animated.Value>(new Animated.Value(0));
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [zIndex, setZIndex] = useState<number>(0);
  const [textOpacity] = useState<Animated.Value>(new Animated.Value(1));
  const { checkContrast } = useContrastColor();
  const [textColor2, setTextColor2] = useState<string>();

  const animateCircle = (newColor: IColor) => {
    Animated.timing(scale, {
      toValue: 2,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.quad,
    }).start(() => {
      // reset scale to 0 and set background color to new color
      scale.setValue(0);
      setBackgroundColor(newColor);
      setZIndex(0);
      textOpacity.setValue(0);
      // start animation to fade in text
      setTextColor2(checkContrast(newColor.rgb));
      // setIsDark(newColor.isDark || false)
      animateText();
    });
  };
  const animateText = () => {
    Animated.timing(textOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.quad,
    }).start();
  };

  const handleNewColor = (e: GestureResponderEvent) => {
    // set circle position to touch position
    const newColor = getRandomColor(circleColor);
    setPosition({ x: e.nativeEvent.pageX, y: e.nativeEvent.pageY });
    // use animation to scale up the circle (0 -> 1)
    animateCircle(newColor);
    // circle over text
    setZIndex(1);

    // vibrates phone
    impactAsync(ImpactFeedbackStyle.Light).then();

    // set circle color to new color
    setCircleColor(newColor);

    // set background color to old color
  };
  return (
    <View
      style={[{ flex: 1, backgroundColor: backgroundColor.hex }]}
      onTouchEnd={handleNewColor}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            left: position.x,
            top: position.y,
            backgroundColor: circleColor.hex,
            transform: [
              { translateX: -circleSize / 2 },
              { translateY: -circleSize / 2 },
              { scale: scale },
            ],
            zIndex: zIndex,
          },
        ]}
      />
      <View style={styles.container}>
        <Animated.View
          style={[styles.settingsContainer, { opacity: textOpacity }]}
        >
          <Pressable
            style={null}
            onPress={() => {
              navigate("Settings");
            }}
          >
            <SettingsIcon size={32} color={textColor2} />
          </Pressable>
        </Animated.View>
        <Animated.View style={[styles.containersm, { opacity: textOpacity }]}>
          <Text style={[{ color: textColor2 }, styles.name]}>
            {backgroundColor.name}
          </Text>
          <Text style={[{ color: textColor2 }, styles.colorValue]}>
            {backgroundColor.rgb}
          </Text>
          <Text style={[{ color: textColor2 }, styles.colorValue]}>
            {backgroundColor.hex}
          </Text>
          <Text style={[{ color: textColor2 }, styles.hint]}>
            Tap anywhere to get a new color
          </Text>
        </Animated.View>
      </View>
    </View>
  );
};
const getWindowDiagonal = () => {
  return Math.sqrt(
    Math.pow(Dimensions.get("window").width, 2) +
      Math.pow(Dimensions.get("window").height, 2)
  );
};
const circleSize = getWindowDiagonal();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  circle: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    position: "absolute",
  },
  containersm: {
    padding: 32,
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 16,
    fontFamily: "sans-serif-medium",
  },
  colorValue: {
    fontSize: 24,
    fontWeight: "500",
  },
  hint: {
    fontSize: 12,
    fontWeight: "300",
    marginVertical: 8,
  },
  linkToSettings: {
    fontSize: 16,
    fontWeight: "500",
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    textAlign: "center",
  },
  settingsContainer: {
    paddingVertical: 40,
    paddingHorizontal: 16,
    flexDirection: "row-reverse",
  },
});
