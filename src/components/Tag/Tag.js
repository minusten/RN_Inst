import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import Tags from "react-native-tags";
 
const MyTag = () => (
  <Tags
    initialText="nice"
    onChangeTags={tags => console.log(tags)}
    onTagPress={(index, tagLabel, event, deleted) =>
      console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
    }
    containerStyle={{ justifyContent: "center" }}
    inputStyle={{ backgroundColor: "white" }}
    renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
      <TouchableOpacity key={`${tag}-${index}`} onPress={onPress}>
        <Text>{tag}</Text>
      </TouchableOpacity>
    )}
  />
)

export default MyTag