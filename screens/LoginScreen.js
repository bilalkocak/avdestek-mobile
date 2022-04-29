import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";


function LoginScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <View style={styles.titleView}>
                <Text style={styles.titleText}>
                    AvDestek
                </Text>
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Eposta"
                    placeholderTextColor="#E7E7E7"
                    onChangeText={(email) => setEmail(email)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Parola"
                    placeholderTextColor="#E7E7E7"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>

            <View style={styles.buttonView}>

                <TouchableOpacity>
                    <Text style={styles.forgot_button}>Şifremi unuttum</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('second')}>
                    <Text>Üye Girişi</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('register')}>
                    <Text>Üye Ol</Text>
                </TouchableOpacity>
            </View>
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
    forgot_button: {
        height: 30,
        marginBottom: 30,
        color: "#E7E7E7"
    },
    inputView: {
        height: 45,
        marginBottom: 20,
        color: "#E7E7E7",
        flex: 1,
        width: "100%",
        alignItems: "center"
    },
    buttonView: {
        flex: 2,
        width: "100%",
        alignItems: "center"
    },
    titleView: {
        flex: 1,
        justifyContent: 'flex-end',
        width: "100%",
    },
    textInput: {
        flex: 1,
        padding: 10,
        paddingHorizontal: 20,
        marginLeft: 20,
        color: "#E7E7E7",
        borderRadius: 30,
        borderColor: "#E7E7E7",
        borderWidth: 1,
        marginTop: 20,
        maxHeight: 50,
        width: "80%",
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
    },
    titleText: {
        color: 'white',
        fontSize: 40,
        textAlign: 'center',
        paddingBottom: 40
    }
});
export default LoginScreen;
