import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { db } from "../firebase";
import { StatusBar } from "expo-status-bar";

const AddChatScreen = ({ navigation }) => {
  const [chatName, setChatName] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a New Chat",
      headerBackTitle: "Chats"
    });
  }, [navigation]);

  const createChat = async () => {
    await db
      .collection("chats")
      .add({
        chatName
      })
      .then(() => {
        navigation.goBack();
      })
      .catch((err) => alert(err));
  };

  return (
    <SafeAreaView>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Input
          value={chatName}
          onChangeText={setChatName}
          onSubmitEditing={createChat}
          placeholder="Chat Name"
          leftIcon={<Icon name="wechat" size={24} color="black" />}
        />
        <Button title="Create New Chat" onPress={createChat} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    height: "100%",
    backgroundColor: "#fff"
  }
});

export default AddChatScreen;
