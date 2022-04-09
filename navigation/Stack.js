import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import { BLACK_COLOR, YELLOW_COLOR } from "../colors";
import Detail from "../scrreens/Detail";

const ScreenOne = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Two")}>
    <Text>ScreenOne</Text>
  </TouchableOpacity>
);

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? BLACK_COLOR : "white",
        },
        headerBackTitleVisible: false,
        headerTintColor: YELLOW_COLOR,
      }}
    >
      <NativeStack.Screen name="Detail" component={Detail} />
    </NativeStack.Navigator>
  );
};

export default Stack;
