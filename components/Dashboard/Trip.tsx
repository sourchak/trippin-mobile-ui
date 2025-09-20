import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import TripDateIcon from "../../assets/TripDateIcon.svg";
import LocationIcon from "../../assets/LocationIcon.svg";
import { TripProps } from "./types";
import { AUTOMATIC_FONT_OPTIMIZATION_MANIFEST } from "next/dist/shared/lib/constants";

export default function Trip({
  trip,
  navigateToTripDetails,
}: Readonly<TripProps>) {
  const { height } = Dimensions.get("screen");
  const styles = StyleSheet.create({
    container: {
      minHeight: height * 0.082,
      justifyContent: "center",
      marginBottom: 1,
    },
    tripDetailLine: {
      flexDirection: "row",
      columnGap: 10,
      backgroundColor: "#FFFDFD",
      paddingLeft: 10,
    },
    tripDetailElement: {
      width: "auto",
    },
    tripTopLine: {
      paddingTop: 10,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
    },
    tripBottomLine: {
      paddingTop: 10,
      paddingBottom: 10,
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
    },
  });
  return (
    <Pressable
      style={{ ...styles.container }}
      onPress={() => navigateToTripDetails(trip._id)}
    >
      <View style={{ ...styles.tripDetailLine, ...styles.tripTopLine }}>
        <TripDateIcon height={11.67} width={11.67} />
        <Text>{trip.createdAt.toString()}</Text>
      </View>
      <View style={{ ...styles.tripDetailLine, ...styles.tripBottomLine }}>
        <LocationIcon
          height={11.67}
          width={11.67}
          style={{ ...styles.tripDetailElement }}
        />
        <Text style={{ ...styles.tripDetailElement }}>{trip.title}</Text>
      </View>
    </Pressable>
  );
}
