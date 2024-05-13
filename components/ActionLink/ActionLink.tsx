import { Text } from "react-native";

export default function ActionLink({
  linkText,
  linkAction,
  style,
}: Readonly<ActionLinkProp>) {
  return (
    <Text style={{ ...style, color: "#6D2FAA" }} onPress={linkAction}>
      {linkText}
    </Text>
  );
}
