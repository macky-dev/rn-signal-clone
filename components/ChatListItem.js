import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

const ChatListItem = ({ chatName, lastMessage, enterChat }) => {
  return (
    <TouchableOpacity onPress={enterChat}>
      <ListItem bottomDivider>
        <Avatar
          rounded
          source={{
            uri:
              lastMessage?.photoURL ||
              "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
          }}
        />
        <ListItem.Content>
          <ListItem.Title style={styles.title}>{chatName}</ListItem.Title>
          {lastMessage ? (
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
              {lastMessage?.displayName} : {lastMessage?.message}
            </ListItem.Subtitle>
          ) : null}
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "700"
  }
});

export default ChatListItem;
