import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";

const ReceiverMessage = ({ data: { displayName, message, photoURL } }) => {
  return (
    <View style={styles.container}>
      <Avatar
        rounded
        size={30}
        containerStyle={styles.avatarContainer}
        source={{
          uri: photoURL
        }}
      />
      <Text>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginVertical: 15,
    maxWidth: "80%",
    position: "relative"
  },
  avatarContainer: {
    position: "absolute",
    bottom: -15,
    right: -5
  }
});

export default ReceiverMessage;
