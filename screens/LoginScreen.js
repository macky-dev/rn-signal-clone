import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Image, Button, Input } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  const signIn = () => {
    auth.signInWithEmailAndPassword(email, password).catch((err) => alert(err));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={100}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <StatusBar style="light" />
          <Image
            source={{
              uri: "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png"
            }}
            style={styles.image}
          />
          <View style={styles.inputContainer}>
            <Input
              autoFocus
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              secureTextEntry
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              onSubmitEditing={signIn}
            />
          </View>
          <Button
            containerStyle={styles.button}
            title="Login"
            onPress={signIn}
          />
          <Button
            containerStyle={styles.button}
            title="Register"
            type="outline"
            onPress={() => navigation.navigate("Register")}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  image: {
    width: 200,
    height: 200
  },
  inputContainer: {
    width: 300
  },
  button: {
    width: 200,
    marginTop: 10
  }
});
