import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

const ImageBox = ({ public_id, asset_id, title, url, navigation }) => {
  return (
    <View
      style={styles.itemContainer}
      onPress={() => {
        navigation.navigate("Detail");
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("Detail", { public_id, title, url })}
      >
        <Image
          source={{ uri: url }}
          style={styles.image}
          PlaceholderContent={<ActivityIndicator />}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    alignItems: "center",
    margin: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#ddd",
    padding: 0,
  },
  image: {
    width: "100%", // Adjust the image width as needed
    aspectRatio: 1,
    resizeMode: "cover",
  },
  title: {
    marginTop: 5,
    textAlign: "center",
  },
});

export default ImageBox;
