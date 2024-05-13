import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, View, Platform } from "react-native";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import * as SplashScreen from "expo-splash-screen";

import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
} from "@expo-google-fonts/poppins";
import LandingPage from "./components/LandingPage/LandingPage";
import { useState } from "react";
import SignInForm from "./components/SignInForm/SignInForm";

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
  const navigateToSignIn = () => {
    setShowRegistrationForm(false);
    setShowSignInForm(true);
    setShowLandingPage(false);
    console.log("Navigate To Sign-in");
  };
  const navigateToRegistrationForm = () => {
    setShowLandingPage(false);
    setShowRegistrationForm(true);
    setShowSignInForm(false);
    console.log("Navigate To Registration Form");
  };
  const styles = StyleSheet.create({
    appContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#EEEEEE",
      overflow: "visible",
    },
    backgroundCircleRenderer: {
      backgroundColor: "#AE8FE1",
      opacity: 0.7,
      height: width / 2,
      width: width / 2,
      borderRadius: width / 2,
    },
  });
  if (!fontsLoaded) {
    SplashScreen.hideAsync();
  } else {
    return (
      <View style={{ ...styles.appContainer, height: height }}>
        <View
          style={{
            ...styles.backgroundCircleRenderer,
            marginTop: (-1 * width) / 4,
            marginLeft: (-1 * width) / 2,
            zIndex: 2,
            elevation: Platform.OS === "android" ? 2 : 0,
          }}
        />
        <View
          style={{
            ...styles.backgroundCircleRenderer,
            marginTop: (-1 * width) / 3,
            marginLeft: -1 * width,
            zIndex: 4,
            elevation: Platform.OS === "android" ? 4 : 0,
          }}
        />
        {showLandingPage && (
          <LandingPage
            navigateToRegistrationForm={navigateToRegistrationForm}
          />
        )}
        {showRegistrationForm && (
          <RegistrationForm navigateToSignIn={navigateToSignIn} />
        )}
        {showSignInForm && (
          <SignInForm navigateToRegistrationForm={navigateToRegistrationForm} />
        )}
        <StatusBar style="auto" />
      </View>
    );
  }
}
