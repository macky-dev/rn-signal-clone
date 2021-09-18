import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";

const SenderMessage = ({ data: { displayName, message, photoURL } }) => {
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
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.name}>{displayName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingBottom: 5,
    backgroundColor: "#2B68E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative"
  },
  avatarContainer: {
    position: "absolute",
    bottom: -15,
    right: -5
  },
  message: {
    color: "#fff",
    fontWeight: "500",
    marginBottom: 10
  },
  name: {
    paddingRight: 10,
    fontSize: 10,
    color: "#fff"
  }
});

export default SenderMessage;
