import React from "react";
import { Text, TouchableOpacity } from "react-native";

const FloatButton = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "92%",
        right: 20,
        backgroundColor: "#e3ff2e",
        borderRadius: 100,
        padding: 10,
        shadowColor: "red",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      }}
      onPress={() => {
        navigation.navigate("Upload");
      }}
    >
      <Text style={{ color: "red", fontWeight: "bold" }}>+ MindDump</Text>
    </TouchableOpacity>
  );
};

export default FloatButton;
