import React, { useState, useEffect } from "react";
import { View, Image, FlatList } from "react-native";
// import cloudinaryConfig from "./cloudinaryConfig";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloudName: "dicnmgd1q",
  apiKey: "475431999759213",
  apiSecret: "D37D_KTEaycddWo1zxM5W3LJ05o",
});

export default function ImageList() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Function to retrieve your uploaded images
    const fetchUploadedImages = async () => {
      try {
        const response = await cloudinary.api.resources({
          type: "upload", // This filters for uploaded images
          prefix: "your-folder/", // Optional: filter by a specific folder in Cloudinary
          max_results: 20, // Optional: maximum number of results to retrieve
        });

        setImages(response.resources);
      } catch (error) {
        console.error("Error fetching uploaded images:", error);
      }
    };

    fetchUploadedImages();
  }, []);

  return (
    <View>
      <FlatList
        data={images}
        keyExtractor={(item) => item.public_id}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.url }}
            style={{ width: 200, height: 200 }}
          />
        )}
      />
    </View>
  );
}
