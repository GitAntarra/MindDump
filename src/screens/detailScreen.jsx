import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import RenderHtml from "react-native-render-html";
import api from "../utils/axios";

const DetailScreeen = ({ route, navigation }) => {
  const { public_id, title, url } = route.params;
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/resources/image/upload/${public_id}`);
      if (data.tags) {
        setTags(data.tags[0]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error.response);
      setLoading(false);
      console.error("Error fetching images:", error);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
  // const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <Image source={{ uri: url }} style={styles.image} />
      <Text>{tags}</Text>
      {tags && (
        <RenderHtml
          contentWidth={100}
          source={{
            html: tags,
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    margin: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default DetailScreeen;
