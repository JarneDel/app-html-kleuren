import { StatusBar } from "expo-status-bar";
import StackNavigation from "./screens";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style={"auto"} />
      <StackNavigation></StackNavigation>
    </NavigationContainer>
  );
}
