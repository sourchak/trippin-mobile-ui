import { Text } from "react-native";

export default function Footer({ content }: FooterProps) {
  return (
    <Text
      style={{
        position: "absolute",
        bottom: 26,
        fontSize: 14,
        fontFamily: "Poppins_600SemiBold",
      }}
    >
      {content}
    </Text>
  );
}
