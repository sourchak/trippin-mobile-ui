import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import BottomButton from "../Buttons/BottomButton";
import Footer from "../Footer/Footer";
import ActionLink from "../ActionLink/ActionLink";
import SignInPageLyadkhor from "../../assets/SignInPageLyadkhor.svg";
import { BASE_URL } from "../../constants";

export default function SignInForm({
  navigation,
  navigateToRegistrationForm,
  navigateToDashboard,
}: Readonly<SignInFormProps>) {
  const { height, width } = Dimensions.get("screen");
  const [mobileNumber, setMobileNumber] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const callLogin = async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobileNumber,
          password,
        }),
      });

      const status = response.status;

      if (status === 200) {
        const { data: responseBody } = await response.json();

        navigation.navigate("Dashboard", {
          id: responseBody.id,
          name: responseBody.name,
        });
      } else {
        throw Error("Not found");
      }
    } catch (error) {
      console.error(error);
    } finally {
      console.log("finally");
    }
    return null;
  };
  const footerContent = (
    <Text>
      Don't have an account?{" "}
      <ActionLink
        linkText="Sign up"
        linkAction={() => navigation.navigate("RegistrationForm")}
      />
    </Text>
  );
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
    inputBox: {
      width: 326,
      height: 50,
      fontSize: 13,
      fontWeight: "600",
      backgroundColor: "#FFFDFD",
      borderRadius: 100,
      paddingLeft: 22,
      marginBottom: 25,
      fontFamily: "Poppins_600SemiBold",
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Poppins_600SemiBold",
    },
    signInHeader: {
      fontWeight: "600",
      fontSize: 18,
      fontFamily: "Poppins_600SemiBold",
      marginBottom: 39,
    },
    signInPageLyadkhor: {
      marginBottom: 47,
    },
    forgotPasswordButton: {
      fontWeight: "600",
      fontFamily: "Poppins_600SemiBold",
      fontSize: 18,
      marginTop: 23,
      opacity: 0.73,
    },
  });
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
      <View style={styles.container}>
        <Text style={styles.signInHeader}>Welcome Back!</Text>
        <SignInPageLyadkhor
          height={172}
          width={172}
          style={styles.signInPageLyadkhor}
        />
        <TextInput
          onChangeText={setMobileNumber}
          value={mobileNumber}
          placeholder="Enter mobile number"
          style={styles.inputBox}
          inputMode="tel"
        />
        <TextInput
          onChangeText={setPassword}
          value={password}
          placeholder="Enter Password"
          style={styles.inputBox}
          autoComplete="password"
          secureTextEntry={true}
        />
        <ActionLink
          style={styles.forgotPasswordButton}
          linkText="Forgot Password?"
          linkAction={() => {}}
        />
        <View style={styles.container}>
          <BottomButton label="Login" action={callLogin} />
          <Footer content={footerContent} />
        </View>
      </View>
    </View>
  );
}
