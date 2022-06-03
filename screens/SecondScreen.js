import React from "react";
import {
  TouchableOpacity,
  Text,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import LawyerCard from "../components/LawyerCard";

const SecondScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Timeline")}
      >
        <Text style={styles.text}>Avukat ara</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Timeline")}
      >
        <Text style={styles.text}>İş bul</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  text: {
    fontSize: 30,
  },
  card: {
    marginTop: 10,
    borderRadius: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});

export default SecondScreen;
