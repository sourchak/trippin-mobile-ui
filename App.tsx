import 'setimmediate';
import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, View, Platform } from "react-native";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";

import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
} from "@expo-google-fonts/poppins";
import LandingPage from "./components/LandingPage/LandingPage";
import { useState } from "react";
import SignInForm from "./components/SignInForm/SignInForm";
import Dashboard from "./components/Dashboard/Dashboard";
import TripDetails from "./components/TripDetails/TripDetails";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { height, width } = Dimensions.get("screen");
  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
  });
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const navigateToDashboard = () => {
    setShowRegistrationForm(false);
    setShowSignInForm(false);
    setShowLandingPage(false);
    setShowDashboard(true);
  };
  const navigateToSignIn = () => {
    setShowRegistrationForm(false);
    setShowSignInForm(true);
    setShowLandingPage(false);
    setShowDashboard(false);
    console.log("Navigate To Sign-in");
  };
  const navigateToRegistrationForm = () => {
    setShowLandingPage(false);
    setShowRegistrationForm(true);
    setShowSignInForm(false);
    setShowDashboard(false);
    console.log("Navigate To Registration Form");
  };
  const Stack = createNativeStackNavigator();
  if (!fontsLoaded) {
    SplashScreen.hideAsync();
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LandingPage" options={{ headerShown: false }}>
            {(props) => (
              <LandingPage
                {...props}
                navigateToRegistrationForm={navigateToRegistrationForm}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="SignInForm" options={{ headerShown: false }}>
            {(props) => (
              <SignInForm
                {...props}
                navigateToRegistrationForm={navigateToRegistrationForm}
                navigateToDashboard={navigateToDashboard}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="RegistrationForm"
            options={{ headerShown: false }}
          >
            {(props) => (
              <RegistrationForm
                {...props}
                navigateToSignIn={navigateToSignIn}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Dashboard" options={{ headerShown: false }}>
            {(props) => <Dashboard {...props} />}
          </Stack.Screen>
          <Stack.Screen name="TripDetails" options={{ headerShown: false }}>
            {(props) => <TripDetails {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    );
  }
}
