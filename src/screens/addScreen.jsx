import { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { useRef } from "react";
import axios from "axios";

const AddScreen = ({ navigation }) => {
  const richText = useRef();
  const [image, setImage] = useState(null);
  const [descHTML, setDescHTML] = useState("");
  const [showDescError, setShowDescError] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [loading, setLoading] = useState(false);

  const showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };
  useEffect(() => {
    timeoutId = setTimeout(() => {
      setShowEditor(true);
    }, 2000);
  }, []);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      // aspect: [4, 6],
      quality: 0.5,
    });

    if (!result.canceled) {
      console.log(descHTML);
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    setLoading(true);
    try {
      const lastIndex = image.lastIndexOf("/");
      const lastIndexValue = image.slice(lastIndex + 1);
      let data = new FormData();
      data.append("file", {
        uri: image,
        type: "image/jpeg", // or image/png
        name: lastIndexValue,
      });
      data.append("upload_preset", "k2wlbnj3");
      data.append("tags", showDescError);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dicnmgd1q/image/upload`,
        data,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "multipart/form-data",
            Authorization: `Basic NDc1NDMxOTk5NzU5MjEzOkQzN0RfS1RFYXljZGRXbzF6eE01VzNMSjA1bw==`,
          },
        }
      );
      setLoading(false);
      showToast(`Upload Success`);
      navigation.navigate("Home");
    } catch (error) {
      console.log(error.response);
      setLoading(false);
      console.error("Error:", error);
    }
  };

  const richTextHandle = (descriptionText) => {
    if (descriptionText) {
      setShowDescError(false);
      setDescHTML(descriptionText);
    } else {
      setShowDescError(true);
      setDescHTML("");
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={styles.image}
            onPress={pickImage}
          />
        ) : (
          <View style={styles.image}>
            <Text style={{ paddingBottom: 5 }}>No Image Selected</Text>

            <Button title="Choose File" onPress={pickImage} color="gray" />
          </View>
        )}
      </View>

      {showEditor && (
        <View style={styles.richTextContainer}>
          <Button title="Upload" onPress={uploadImage} color="blue" />
          <RichEditor
            ref={richText}
            onChange={richTextHandle}
            placeholder="Write your description)"
            androidHardwareAccelerationDisabled={true}
            style={styles.richTextEditorStyle}
            initialHeight={250}
          />
          <RichToolbar
            editor={richText}
            selectedIconTint="#873c1e"
            iconTint="#312921"
            actions={[
              actions.insertImage,
              actions.setBold,
              actions.setItalic,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.insertLink,
              actions.setStrikethrough,
              actions.setUnderline,
            ]}
            style={styles.richTextToolbarStyle}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    margin: 10,
  },
  image: {
    width: "70%",
    aspectRatio: 1,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    borderRadius: 5,
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
  },
  richTextContainer: {
    display: "flex",
    flexDirection: "column-reverse",
    width: "100%",
    padding: 10,
  },
  richTextEditorStyle: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: "#ccaf9b",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 20,
  },

  richTextToolbarStyle: {
    backgroundColor: "#c6c3b3",
    borderColor: "#c6c3b3",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
  },
});
export default AddScreen;
