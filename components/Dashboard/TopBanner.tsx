import {
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TopBannerProps } from "./types";
import HamburgerIcon from "../../assets/HamburgerIcon.svg";
import { useState } from "react";

export default function TopBanner({
  name,
}: Readonly<TopBannerProps>) {
  const { height, width } = Dimensions.get("screen");
  const styles = StyleSheet.create({
    banner: {
      backgroundColor: "#8C50C9",
      height: 0.36 * height,
      maxHeight: 0.36 * height,
      width: width,
      position: "absolute",
      top: 0,
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
    },
    hamburgerMenu: {
      zIndex: 4,
      elevation: Platform.OS === "android" ? 2 : 0,
      top: 60,
      right: 0,
      position: "absolute",
      flexDirection: "row",
      columnGap: 5,
      paddingRight: 20,
    },
    menuText: {
      fontSize: 18,
      fontWeight: 400,
      color: "#FFFFFF",
    },
  });
  const [showNavigation, setShowNavigation] = useState(false);
  return (
    <View style={styles.banner}>
      <Text>Welcome!</Text>
      <Text>{name}</Text>
      <Pressable
        style={styles.hamburgerMenu}
        onPress={() => setShowNavigation(!showNavigation)}
      >
        <Text style={styles.menuText}>Menu</Text>
        <HamburgerIcon height={24} width={24} />
      </Pressable>
    </View>
  );
}
