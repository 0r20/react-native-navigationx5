import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export const DrawerContent = ({ navigation }) => {
  return (
    <View style={{ paddingTop: 100 }}>
      <View style={{ margin: 10 }}>
        <Text>I am Drower!</Text>
      </View>
      <TouchableOpacity
        style={{ margin: 10 }}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={{ fontSize: 24 }}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ margin: 10 }}
        onPress={() => navigation.navigate("Profile")}
      >
        <Text style={{ fontSize: 24 }}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};
