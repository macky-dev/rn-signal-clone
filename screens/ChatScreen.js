import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput
} from "react-native";
import { Avatar } from "react-native-elements";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { db, auth } from "../firebase";
import firebase from "firebase";
import SenderMessage from "../components/SenderMessage";
import ReceiverMessage from "../components/ReceiverMessage";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    Keyboard.dismiss();
    const messageData = {
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL
    };
    await db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .add(messageData);

    await db.collection("chats").doc(route.params.id).update({
      lastMessage: messageData
    });

    setInput("");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackTitleVisible: false,
      headerBackVisible: false,
      headerTitleAlign: "center",
      headerTitle: () => (
        <View style={styles.headerTitle}>
          <Avatar
            rounded
            source={{
              uri: messages[messages.length - 1]?.data.photoURL
            }}
          />
          <Text style={styles.headerText}>{route.params.chatName}</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      )
    });
  }, [navigation, messages, route]);

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data()
          }))
        );
      });

    return unsubscribe;
  }, [route]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 180}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <FlatList
              inverted
              style={styles.list}
              data={messages}
              keyExtractor={(item) => item.id}
              renderItem={({ item: { data } }) =>
                data.email === auth.currentUser.email ? (
                  <ReceiverMessage data={data} />
                ) : (
                  <SenderMessage data={data} />
                )
              }
            />
            <View style={styles.footer}>
              <TextInput
                placeholder="Signal Message"
                value={input}
                onChangeText={setInput}
                style={styles.textInput}
                onSubmitEditing={sendMessage}
              />
              <TouchableOpacity onPress={sendMessage}>
                <Ionicons name="send" size={24} color="#2B68E6" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    flexDirection: "row",
    alignItems: "center"
  },
  headerText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 5
  },
  headerRight: {
    width: 70,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#fff"
  },
  container: {
    flex: 1
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15
  },
  textInput: {
    flex: 1,
    bottom: 0,
    height: 40,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    padding: 10,
    color: "#000",
    borderRadius: 30
  },
  list: {
    paddingTop: 15
  }
});

export default ChatScreen;
