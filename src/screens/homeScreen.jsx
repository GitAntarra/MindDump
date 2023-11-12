import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { SearchBar } from "react-native-elements";
import ImageBox from "../components/imageBox";
import FloatButton from "../components/floatButton";
import api from "../utils/axios";

const HomeScreen = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredImages, setFilteredImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/resources/image");
      await setImages(data.resources);
      await setFilteredImages(data.resources);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = images.filter((image) =>
        image.public_id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredImages(filtered);
    } else {
      setFilteredImages(images);
    }
  }, [searchTerm, images]);

  if (error) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>An error occurred</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <SearchBar
        placeholder="Search Images"
        inputContainerStyle={styles.searhBar}
        onChangeText={(text) => setSearchTerm(text)}
        lightTheme
        showLoading={loading}
        value={searchTerm}
      />
      {!loading ? (
        <FlatList
          data={filteredImages}
          keyExtractor={(item) => item.asset_id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <ImageBox
              public_id={item.public_id}
              asset_id={item.asset_id}
              title={item.public_id}
              url={item.url}
              navigation={navigation}
            />
          )}
        />
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator />
        </View>
      )}
      <FloatButton navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    minHeight: "100%",
  },
  searhBar: {
    borderRadius: 10,
    backgroundColor: "white",
  },
});

export default HomeScreen;
