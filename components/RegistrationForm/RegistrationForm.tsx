import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import BottomButton from "../Buttons/BottomButton";
import Footer from "../Footer/Footer";
import ActionLink from "../ActionLink/ActionLink";

export default function RegistrationForm({
  navigation,
  navigateToSignIn,
}: RegistrationFormProps) {
  const { height, width } = Dimensions.get("screen");
  const isAndroid = Platform.OS === "android";
  const [name, setName] = useState<string | undefined>();
  const [mobileNo, setMobileNo] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>();
  const [isPasswordMatching, setIsPasswordMatching] = useState<boolean>(true);
  useEffect(() => {
    console.log(name);
  }, [name]);
  const registerUser = async () => {
    console.log({ name, mobileNo, password, confirmPassword });
    setIsPasswordMatching(password === confirmPassword);
    if (isPasswordMatching) {
      try {
        const response = await fetch(
          "https://tripping-api.vercel.app/api/auth/register",
          {
            method: "POST",
            body: JSON.stringify({
              name,
              mobileNo,
              password,
            }),
          }
        );
        const status = await response.status;
        if (status === 200) {
          console.log(`${name} successfully registered`);
          const { data: responseBody } = await response.json();
          console.log(responseBody.name);
          navigation.navigate("Dashboard", {
            id: responseBody._id,
            name: responseBody.name,
          });
        } else {
          throw Error("Unable to register");
        }
      } catch (error) {
        console.error(error);
      } finally {
        console.log("Registration finally complete");
      }
    } else {
      throw Error("Passwords do not match");
    }
    return null;
  };
  const footerContent = (
    <Text>
      Already have an account?{" "}
      <ActionLink
        linkText="Sign in"
        linkAction={() => navigation.navigate("SignInForm")}
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
      zIndex: 8,
      elevation: isAndroid ? 8 : 0,
    },
    welcomeText: {
      backgroundColor: "#EEEEEE",
      fontFamily: "Poppins_600SemiBold",
      fontSize: 18,
      fontWeight: "600",
      lineHeight: 27,
      textAlign: "left",
      marginBottom: 105,
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
        <Text style={styles.welcomeText}>Welcome Onboard!</Text>
        <View style={styles.container}>
          <ScrollView keyboardShouldPersistTaps="never">
            <TextInput
              onChangeText={setName}
              value={name}
              placeholder="Enter your name"
              style={styles.inputBox}
            />
          </ScrollView>
          <ScrollView keyboardShouldPersistTaps="never">
            <TextInput
              onChangeText={setMobileNo}
              value={mobileNo}
              placeholder="Enter your phone No."
              keyboardType="phone-pad"
              inputMode="tel"
              style={styles.inputBox}
            />
          </ScrollView>
          <ScrollView keyboardShouldPersistTaps="never">
            <TextInput
              onChangeText={setPassword}
              value={password}
              placeholder="Enter Password"
              style={styles.inputBox}
              autoComplete="password"
              secureTextEntry={true}
              onEndEditing={() =>
                setIsPasswordMatching(confirmPassword === password)
              }
            />
          </ScrollView>
          <ScrollView keyboardShouldPersistTaps="never">
            <TextInput
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              placeholder="Confirm password"
              style={styles.inputBox}
              secureTextEntry={true}
              onEndEditing={() =>
                setIsPasswordMatching(confirmPassword === password)
              }
            />
          </ScrollView>
          {!isPasswordMatching && <Text>Passwords do not match</Text>}
        </View>
        <View style={styles.container}>
          <BottomButton
            label="Register"
            action={registerUser}
            disabled={!(mobileNo && name && isPasswordMatching)}
          />
          <Footer content={footerContent} />
        </View>
      </View>
    </View>
  );
}
