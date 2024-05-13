import { useState } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import BottomButton from "../Buttons/BottomButton";
import Footer from "../Footer/Footer";
import ActionLink from "../ActionLink/ActionLink";
import SignInPageLyadkhor from "../../assets/SignInPageLyadkhor.svg";

export default function SignInForm({
  navigateToRegistrationForm,
}: Readonly<SignInFormProps>) {
  const [name, setName] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const callLogin = () => {
    console.log("Navigate to Login");
  };
  const footerContent = (
    <Text>
      Don't have an account?{" "}
      <ActionLink linkText="Sign up" linkAction={navigateToRegistrationForm} />
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
    <View style={styles.container}>
      <Text style={styles.signInHeader}>Welcome Back!</Text>
      <SignInPageLyadkhor
        height={172}
        width={172}
        style={styles.signInPageLyadkhor}
      />
      <TextInput
        onChangeText={setName}
        value={name}
        placeholder="Enter your name"
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
  );
}
