import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { requestFetchTrips } from "../../requests/trip";
import { useEffect, useState } from "react";
import { TripsProps } from "./types";
import Trip from "./Trip";
import { BASE_URL } from "../../constants";
import { TripDocument } from "../../types/trip";

export default function Trips({
  navigateToTripDetails,
  id,
}: Readonly<TripsProps>) {
  const { height, width } = Dimensions.get("screen");
  const [trips, setTrips] = useState<TripDocument[]>([] as TripDocument[]);
  const styles = StyleSheet.create({
    container: {
      paddingTop: 21,
      paddingLeft: 30,
      paddingRight: 30,
      height: 0.64 * height,
      position: "absolute",
      top: 0.36 * height,
      flex: 1,
    },
    header: {
      fontFamily: "Poppins_600SemiBold",
      fontSize: 16,
      fontWeight: "600",
    },
  });

  useEffect(() => {
    fetch(`${BASE_URL}/trip?userId=${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log({ trips: data });
        setTrips(data as TripDocument[]);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  if (trips.length > 0)
    return (
      <View style={{ ...styles.container, width: width }}>
        <Text style={{ ...styles.header }}>Trips</Text>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {trips.length > 0 &&
            trips.map((trip) => {
              return (
                <Trip
                  key={trip.id as string}
                  trip={trip}
                  navigateToTripDetails={navigateToTripDetails}
                />
              );
            })}
        </ScrollView>
      </View>
    );
  else return <></>;
}
