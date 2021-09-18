import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Avatar, Text } from "react-native-elements";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { auth, db } from "../firebase";
import ChatListItem from "../components/ChatListItem";

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    let unsubscribe;
    if (isFocused) {
      unsubscribe = db.collection("chats").onSnapshot((snapshots) => {
        setChats(
          snapshots.docs.map((doc) => ({
            id: doc.id,
            data: doc.data()
          }))
        );
      });
    } else {
      unsubscribe = null;
    }

    return () => {
      unsubscribe ? unsubscribe() : null;
    };
  }, [isFocused]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "#000" },
      headerTitleAlign: "center",
      headerTitle: () => (
        <Text h4 style={styles.title}>
          Signal
        </Text>
      ),
      headerLeft: () => (
        <View>
          <TouchableOpacity activeOpacity={0.5} onPress={signOut}>
            <Avatar
              rounded
              source={{
                uri: auth?.currentUser?.photoURL
              }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("AddChat")}
          >
            <SimpleLineIcons name="pencil" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      )
    });
  }, [navigation]);

  const signOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", { id, chatName });
  };

  return (
    <SafeAreaView>
      <FlatList
        style={styles.listContainer}
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { data, id } }) => (
          <ChatListItem
            chatName={data.chatName}
            lastMessage={data.lastMessage}
            enterChat={enterChat.bind(null, id, data.chatName)}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  title: {
    fontWeight: "700"
  },
  headerRight: {
    width: 70,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  listContainer: {
    height: "100%"
  }
});
