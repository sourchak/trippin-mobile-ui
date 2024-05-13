import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, Platform } from "react-native";
import BottomButton from "../Buttons/BottomButton";
import Footer from "../Footer/Footer";
import ActionLink from "../ActionLink/ActionLink";

export default function RegistrationForm({
  navigateToSignIn,
}: RegistrationFormProps) {
  const isAndroid = Platform.OS === "android";
  const [name, setName] = useState<string | undefined>();
  const [phoneNo, setPhoneNo] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>();
  useEffect(() => {
    console.log(name);
  }, [name]);
  const registerUser = () => {
    console.log({ name, phoneNo, password, confirmPassword });
    return null;
  };
  const footerContent = (
    <Text>
      Already have an account?{" "}
      <ActionLink linkText="Sign in" linkAction={navigateToSignIn} />
    </Text>
  );
  const styles = StyleSheet.create({
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
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome Onboard!</Text>
      <View style={styles.container}>
        <TextInput
          onChangeText={setName}
          value={name}
          placeholder="Enter your name"
          style={styles.inputBox}
        />
        <TextInput
          onChangeText={setPhoneNo}
          value={phoneNo}
          placeholder="Enter your phone No."
          keyboardType="phone-pad"
          inputMode="tel"
          style={styles.inputBox}
        />
        <TextInput
          onChangeText={setPassword}
          value={password}
          placeholder="Enter Password"
          style={styles.inputBox}
          autoComplete="password"
          secureTextEntry={true}
        />
        <TextInput
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          placeholder="Confirm password"
          style={styles.inputBox}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.container}>
        <BottomButton label="Register" action={registerUser} />
        <Footer content={footerContent} />
      </View>
    </View>
  );
}
