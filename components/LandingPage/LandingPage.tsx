import { View, Platform, StyleSheet, Text } from "react-native";
import BottomButton from "../Buttons/BottomButton";
import LandingPageLyadkhor from "../../assets/LandingPageLyadkhor.svg";

export default function LandingPage({
  navigateToRegistrationForm,
}: Readonly<LandingPageProps>) {
  const isAndroid = Platform.OS === "android";
  const styles = StyleSheet.create({
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
    <View style={styles.container}>
      <LandingPageLyadkhor
        height={172}
        width={172}
        style={styles.landingPageLyadkhor}
      />
      <Text style={styles.header}>Trippin&apos; Expense Tracker</Text>
      <Text style={styles.pageText}>
        This app will help manage the expenditure smartly, so that Shaon Da does
        not get over-charged.
      </Text>
      <BottomButton
        label="Let's Get Started"
        action={() => navigateToRegistrationForm(true)}
      />
    </View>
  );
}
