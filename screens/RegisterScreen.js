import React, { useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Text, Input, Button } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase";

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login"
    });
  }, [navigation]);

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: fullName,
          photoURL: imageUrl
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar style="light" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <Text h3>Create a Signal account</Text>
          <View style={styles.inputContainer}>
            <Input
              placeholder="Full Name"
              autoFocus
              value={fullName}
              onChangeText={setFullname}
            />
            <Input placeholder="Email" value={email} onChangeText={setEmail} />
            <Input
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <Input
              placeholder="Profile Picture URL (optional)"
              value={imageUrl}
              onChangeText={setImageUrl}
              onSubmitEditing={register}
            />
          </View>
          <Button
            title="Register"
            onPress={register}
            containerStyle={styles.button}
          />
          <View style={styles.spacerContainer} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  inputContainer: {
    width: 300,
    marginTop: 20
  },
  button: {
    width: 200,
    marginTop: 10
  },
  spacerContainer: {
    height: 120,
    backgroundColor: "#fff"
  }
});
