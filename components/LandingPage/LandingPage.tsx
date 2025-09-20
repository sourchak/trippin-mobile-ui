import { View, Platform, StyleSheet, Text, Dimensions } from "react-native";
import BottomButton from "../Buttons/BottomButton";
import LandingPageLyadkhor from "../../assets/LandingPageLyadkhor.svg";

export default function LandingPage({
  navigation,
  navigateToRegistrationForm,
}: Readonly<LandingPageProps>) {
  const isAndroid = Platform.OS === "android";
  const { height, width } = Dimensions.get("screen");
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
    header: {
      fontFamily: "Poppins_600SemiBold",
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 34,
    },
    pageText: {
      fontFamily: "Poppins_600SemiBold",
      fontSize: 13,
      fontWeight: "600",
      width: 281,
      textAlign: "center",
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Poppins_600SemiBold",
      zIndex: 8,
      elevation: isAndroid ? 8 : 0,
      paddingLeft: 47,
      paddingRight: 47,
    },
    landingPageLyadkhor: {
      marginBottom: 60,
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
        <LandingPageLyadkhor
          height={172}
          width={172}
          style={styles.landingPageLyadkhor}
        />
        <Text style={styles.header}>Trippin&apos; Expense Tracker</Text>
        <Text style={styles.pageText}>
          This app will help manage the expenditure smartly, so that Shaon Da
          does not get over-charged.
        </Text>
        <BottomButton
          label="Let's Get Started"
          action={() => navigation.navigate("SignInForm")}
        />
      </View>
    </View>
  );
}
