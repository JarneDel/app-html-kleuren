import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import IColor from "../models/IColor";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { getRandomColor } from "../calculations/color";
import { SettingsIcon } from "lucide-react-native";

export default () => {
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>();
  const [color, setColor] = React.useState<IColor>(getRandomColor());
  const textColor = color.isDark ? { color: "#fff" } : { color: "#000" };
  return (
    <View
      style={[styles.container, { backgroundColor: color.hex }]}
      onTouchEnd={(e) => {
        console.log("touched");
        console.log(e.nativeEvent.locationX);
        console.log(e.nativeEvent.locationY);
        setColor(getRandomColor(color));
      }}
    >
      <View style={styles.settingsContainer}>
        <Pressable
          style={null}
          onPress={() => {
            navigate("Settings");
          }}
        >
          <SettingsIcon size={32} color={color.isDark ? "#fff" : "#000"} />
        </Pressable>
      </View>
      <View style={styles.containersm}>
        <Text style={[textColor, styles.name]}>{color.name}</Text>
        <Text style={[textColor, styles.colorValue]}>{color.rgb}</Text>
        <Text style={[textColor, styles.colorValue]}>{color.hex}</Text>
        <Text style={[textColor, styles.hint]}>
          Tap anywhere to get a new color
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  containersm: {
    padding: 32,
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 30,
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
