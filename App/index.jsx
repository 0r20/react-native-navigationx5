import React, { useState, useEffect, useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AuthContext } from "./context";

import {
  SignIn,
  CreateAccount,
  Profile,
  Home,
  Search,
  Details,
  Search2,
  Splash,
} from "./Screens.jsx";
import { DrawerContent } from "./DrawerContent";

const AuthStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const SearchStack = createStackNavigator();
const HomeStack = createStackNavigator();
const RootStack = createStackNavigator();

const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const RootStackScreen = ({ token }) => (
  <RootStack.Navigator headerMode="none">
    {token ? (
      <RootStack.Screen
        name="App"
        component={DrowerScreen}
        options={{
          animationEnabled: false,
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false,
        }}
      />
    )}
  </RootStack.Navigator>
);

const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="SignIn"
      component={SignIn}
      options={{ title: "Sign in" }}
    />
    <AuthStack.Screen
      name="CreateAccount"
      component={CreateAccount}
      options={{ title: "Create Account" }}
    />
  </AuthStack.Navigator>
);

const DrowerScreen = () => (
  <Drawer.Navigator
    initialRouteName="Profile"
    drawerContent={(props) => <DrawerContent {...props} />}
  >
    <Drawer.Screen name="Home" component={TabsScreen} />
    <Drawer.Screen name="Profile" component={ProfileStackScreen} />
  </Drawer.Navigator>
);

const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

const TabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Home" component={HomeStackScreen} />
    <Tabs.Screen name="Search" component={SearchStackScreen} />
  </Tabs.Navigator>
);

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen
      name="Details"
      component={Details}
      options={({ route }) => ({
        title: route.params.name,
      })}
    />
  </HomeStack.Navigator>
);

const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name="Search" component={Search} />
    <SearchStack.Screen name="Search2" component={Search2} />
  </SearchStack.Navigator>
);

export default () => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  const authContext = useMemo(() => {
    return {
      signIn: () => {
        setIsLoading(false);
        setToken("asd");
      },
      signUp: () => {
        setIsLoading(false);
        setToken("asd");
      },
      signOut: () => {
        setIsLoading(false);
        setToken(null);
      },
    };
  }, []);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen token={token} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
