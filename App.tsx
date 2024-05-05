import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  const [name, setName] = useState<string | undefined>();
  const [phoneNo, setPhoneNo] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>();
  useEffect(() => {
    console.log(name);
  }, [name]);
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <TextInput
        onChangeText={setName}
        value={name}
        placeholder="Enter your name"
      />
      <TextInput
        onChangeText={setPhoneNo}
        value={phoneNo}
        placeholder="Enter your phone No."
        keyboardType="numeric"
      />
      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
      />
      <TextInput
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        placeholder="Confirm password"
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
