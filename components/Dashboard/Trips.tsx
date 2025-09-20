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
import { TripDocument } from "../../types/documents/collections/trip";
import { TripsProps } from "./types";
import Trip from "./Trip";

export default function Trips({
  navigateToTripDetails,
  id,
}: Readonly<TripsProps>) {
  console.log({ hello: id });
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
    requestFetchTrips({
      filterBy: "members",
      keyword: `{"$in": "${id}"}`,
    })
      .then((response) => {
        setTrips(response.data as TripDocument[]);
        console.log({ trips: response });
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
                  key={trip._id as string}
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
