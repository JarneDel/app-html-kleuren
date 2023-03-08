import {createStackNavigator, StackNavigationOptions} from "@react-navigation/stack";
import React from "react";
import RandomColor from "../components/RandomColor";
import Settings from "../components/Settings";

const Stack = createStackNavigator()
const screenOptions: StackNavigationOptions = {
    headerShown: false
}
export default () => {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="RandomColor" component={RandomColor}/>
            <Stack.Screen name="Settings" component={Settings}/>
        </Stack.Navigator>
    )
}