import React, {useEffect, useRef, useState} from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert, ScrollView
} from "react-native";
import {StatusBar} from "expo-status-bar";
import {confirm, login} from "../service/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomTextInput from "../components/CustomTextInput";
import RBSheet from "react-native-raw-bottom-sheet";
import Toast from "react-native-toast-message";

function LoginScreen({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const isLogged = () => {
        AsyncStorage.getItem("isLogged").then(res => {
            if (res === "true") {
                navigation.navigate("tabs");
            }
        });
    };

    useEffect(() => {

        isLogged();
    }, []);


    const onPressLogin = () => {
        login({email, password}).then(r => {
                AsyncStorage.setItem("user", JSON.stringify(r.data.user));
                if (r.data.user.isActive) {
                    AsyncStorage.setItem("isLogged", "true");
                    navigation.navigate("tabs")
                } else {
                    if (r.data.user.waitingConfirm) {
                        Alert.alert(
                            "Onay Bekleniyor",
                            "Bilgileriniz onaylandıktan sonra onay maili alacaksınız.",
                            [
                                {
                                    text: "Tamam",
                                    onPress: () => {
                                        navigation.navigate("Home")
                                    }
                                }
                            ],
                            {cancelable: false}
                        );
                    } else {

                        refRBSheet.current.open();

                    }
                }
            }
        ).catch(err =>
            Toast.show({
                type: "error",
                position: "top",
                text1: "Giriş başarısız",
                text2: err.response.data.message,
                visibilityTime: 3000
            })
        )
    }

    const handlePressConfirmCode = async () => {
        const user = JSON.parse(await AsyncStorage.getItem("user"))
        confirm(code, user._id).then(r => {
            console.log(r);
            if (r.data.confirm.confirmed) {
                refRBSheet.current.close();
                Toast.show({
                    type: "success",
                    text1: "Onaylama başarılı",
                    text2: "Şimdi kullanıcı adı ve şifreniz ile giriş yapabilirsiniz.",
                });
            }
        })
    }

    const refRBSheet = useRef();
    const [code, setCode] = useState("");
    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <View style={styles.titleView}>
                <Text style={styles.titleText}>AvDestek</Text>
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
                <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={() => onPressLogin(email, password)}
                >
                    <Text>Giriş</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={() => navigation.navigate("register")}
                >
                    <Text>Üye Ol</Text>
                </TouchableOpacity>
            </View>

            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent"
                    },
                    draggableIcon: {
                        backgroundColor: "tomato"
                    },
                    container: {
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        paddingTop: 24,
                        paddingHorizontal: 24,
                        borderTopWidth: 1,
                        borderTopColor: "#E5E5E5",
                    }
                }}
                height={400}
            >
                <View style={styles.sheet}>
                    <ScrollView showsVerticalScrollIndicator={true} style={styles.scrollContainer}>
                        <View>
                            <CustomTextInput placeholder={'Onay kodun'}
                                             value={code}
                                             onChange={(_code) =>
                                                 setCode(_code)}/>
                            <Text style={{marginBottom: 50, color: 'gray', textAlign: 'center'}}>
                                Mail adresinize gelen onay kodunu girin.
                            </Text>


                            <TouchableOpacity
                                style={styles.confirmCodeButton}
                                onPress={handlePressConfirmCode}
                            >
                                <Text style={styles.buttonText}>Onayla</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </View>
            </RBSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2A2A2A",
        color: "#E7E7E7",
    },
    forgot_button: {
        height: 30,
        marginBottom: 30,
        color: "#E7E7E7",
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
        flex: 3,
        width: "100%",
        alignItems: "center",
    },
    titleView: {
        flex: 2,
        justifyContent: "flex-end",
        width: "100%"
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
        color: "#2A2A2A",
    },
    titleText: {
        color: "white",
        fontSize: 40,
        textAlign: "center",
        paddingBottom: 40,
    },
    scrollContainer: {
        width: "100%",
        flexDirection: "column",
        flex: 1
    },
    confirmCodeButton: {
        height: 50,
        marginBottom: 30,
        color: "white",
        backgroundColor: 'tomato',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100
    },
    buttonText: {
        color: "white",
        fontSize: 20,
    },
    sheet: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        paddingVertical: 50
    },
});
export default LoginScreen;
