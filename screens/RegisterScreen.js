import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";

function RegisterScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>

            <View>
                <Text styles={styles.header}>Üye Ol</Text>
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="İsim Soyisim"
                    placeholderTextColor="#E7E7E7"
                    onChangeText={(email) => setEmail(email)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email."
                    placeholderTextColor="#E7E7E7"
                    onChangeText={(email) => setEmail(email)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Baro"
                    placeholderTextColor="#E7E7E7"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Baro Sicil No"
                    placeholderTextColor="#E7E7E7"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Tc No"
                    placeholderTextColor="#E7E7E7"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>
            <TouchableOpacity>
                <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Timeline')}>
                <Text>Üye Girişi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('register')}>
                <Text>Üye Ol</Text>
            </TouchableOpacity>
        </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2A2A2A",
        color: "#E7E7E7"
    },
    header: {
        height: 50,
        fontSize: 30,
        color: "#E7E7E7",
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#E7E7E7",
    },
    forgot_button: {
        height: 30,
        marginBottom: 30,
        color: "#E7E7E7"
    },
    inputView: {
        borderRadius: 30,
        width: "80%",
        height: 45,
        marginBottom: 20,
        borderColor: "#E7E7E7",
        borderWidth: 1,
        color: "#E7E7E7"
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
        color: "#E7E7E7"
    },
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#E7E7E7",
        color: "#2A2A2A"
    }
});
export default RegisterScreen;
