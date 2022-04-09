import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../scrreens/Movies";
import Tv from "../scrreens/Tv";
import Search from "../scrreens/Search";
import { View, Text } from "react-native";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { BLACK_COLOR, YELLOW_COLOR } from "../colors";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Stack from "./Stack";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: isDark ? BLACK_COLOR : "white",
      }}
      screenOptions={{
        unmountOnBlur: true,
        // tabBarStyle: { backgroundColor: isDark ? BLACK_COLOR : "white" },
        // tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
        // tabBarInactiveTintColor: isDark ? "#d2dae2" : "#808e9b",
        // headerStyle: {
        //   backgroundColor: isDark ? BLACK_COLOR : "white",
        // },
        // headerTitleStyle: {
        //   color: isDark ? "white" : BLACK_COLOR,
        // },
        // tabBarLabelPosition: "beside-icon",
        // tabBarStyle: { backgroundColor: "tomato" },
        // tabBarActiveTintColor: "red",
      }}
      initialRouteName="Moviess"
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            // console.log(focused, color, size);
            return <Ionicons name="film" color={color} size={size} />;
          },
        }}
        // options={{
        //   headerTitleStyle: { color: "pink" },
        //   headerRight: () => (
        //     <View>
        //       <Text>야이씨발아</Text>
        //     </View>
        //   ),
        // }}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="tv" color={color} size={size} />;
          },
        }}
        name="Tv"
        component={Tv}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            // console.log(focused, color, size);
            return <Ionicons name="search" color={color} size={size} />;
          },
        }}
        name="Search"
        component={Search}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
