import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import { TripDetailsProps } from "./types";
import TopBanner from "../Dashboard/TopBanner";
import { useEffect, useState } from "react";
import { handleGetTransactions } from "../../app/api/transaction/handler";
import { requestFetchUsers } from "../../requests/user";
import { BASE_URL } from "../../constants";

export default function TripDetails({
  navigation,
  route,
}: Readonly<TripDetailsProps>) {
  const { height, width } = Dimensions.get("screen");
  const { tripId, name } = route.params;
  console.log({ tripId });

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
      padding: 0,
    },
  });
  // const [tripDetails, setTripDetails] = useState(null);
  // useEffect(() => {
  //   handleGetTransactions({
  //     filterBy: "trip",
  //     keyword: tripId,
  //   })
  //     .then((response) => {
  //       setTripDetails(response.data);
  //       console.log({ trips: response });
  //     })
  //     .catch((response) => {
  //       console.log(response);
  //     });
  // }, []);

  if (tripId === undefined || tripId === null) {
    return <Text>Trip ID is invalid</Text>;
  }

  useEffect(() => {
    // requestFetchUsers()
    //   .then((response) =>
    //     console.log({"response": JSON.stringify(response)})
    // ).catch((error) => {
    //     console.error("Error fetching users:", error);
    // });
    getTripDTransactions();
  }, [tripId]);
  const getTripDTransactions = async () => {
    try {
      const response = await fetch(`${BASE_URL}/trip/${tripId}`);
      console.log({ response });
      const status = response.status;
      if (status === 200) {
        const data = await response.json();
        console.log(JSON.stringify({ data }));
        return data;
      } else {
        throw Error("Not found");
      }
    } catch (error) {
      console.error("Error fetching trip transactions:", error);
      return null;
    }
  };

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
        <Text>{tripId}</Text>
      </View>
    </View>
  );
}
