import { Dimensions, Platform, StyleSheet, View } from "react-native";
import TopBanner from "./TopBanner";
import Trips from "./Trips";
import { DashboardProps } from "./types";

export default function Dashboard({
  route,
  navigation,
}: Readonly<DashboardProps>) {
  const { height, width } = Dimensions.get("screen");
  const { id, name } = route.params;
  console.log({ id, name });
  const navigateToTripDetails = (tripId: any) => {
    console.log({ tripId });
    navigation.navigate("TripDetails", {
      tripId,
      name,
    });
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
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Poppins_600SemiBold",
      marginTop: (-5 * width) / 12,
      minHeight: height,
      padding: 0,
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
        <TopBanner name={name} />
        <Trips id={id} navigateToTripDetails={navigateToTripDetails} />
      </View>
    </View>
  );
}
