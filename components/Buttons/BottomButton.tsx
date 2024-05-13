import { Pressable, Text, Vibration } from "react-native";

export default function BottomButton({ label, action }: BottomButtonProps) {
  return (
    <Pressable
      style={{
        position: "absolute",
        bottom: 66,
        height: 60,
        width: 325,
        backgroundColor: "#8C50C9",
        marginLeft: 25,
        marginRight: 25,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => {
        Vibration.vibrate(50);
        action?.();
      }}
    >
      <Text
        style={{
          color: "#FFFFFF",
          fontSize: 18,
          fontFamily: "Poppins_600SemiBold",
        }}
      >
        {" "}
        {label || "Submit Button"}{" "}
      </Text>
    </Pressable>
  );
}
