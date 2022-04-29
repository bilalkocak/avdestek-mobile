import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";

function ProfileScreen(props) {
    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <Text>selam</Text>
        </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2A2A2A",
        color: "#E7E7E7"
    }
});
export default ProfileScreen;
