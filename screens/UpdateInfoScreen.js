import React, {useEffect, useState} from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Switch
} from "react-native";
import {StatusBar} from "expo-status-bar";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {getAllCities, updateUser} from "../service/user";
import Toast from "react-native-toast-message";
import {Dropdown} from "../components/Dropdown";

function UpdateInfoScreen({navigation, route}) {
    const {user} = route.params;
    const [formData, setFormData] = useState({
        city: 1
    });
    const [cities, setCities] = useState([]);

    useEffect(() => {
        getAllCities().then((res) => {
            setCities(res.data.cities);
        });
        setFormData({
            city: user.city._id
        });
    }, []);

    const onSelectCity = (value) => {
        setFormData({...formData, city: value});
    };

    const sendForm = () => {
        if (!formData.city){
            Toast.show({
                type: "error",
                text1: "Form gönderilemedi",
                text2: "Lütfen bir şehir seçiniz",
            });
            return;
        }
        updateUser({
            city: formData.city,
            isPassive: isEnabled,
            id: user._id
        })
            .then((response) => {
                Toast.show({
                    type: "success",
                    text1: "Form gönderildi",
                    text2: "Başarılı",
                });
            }).then(() => {
            navigation.navigate("Home");
        })
            .catch((error) => {
                console.log("error", error);
            });

    };

    const [isEnabled, setIsEnabled] = useState(user.isPassive);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>

            <KeyboardAwareScrollView extraHeight={120}>
                <View style={styles.content}>
                    <View>
                        <Text style={styles.header}></Text>
                    </View>
                    <View style={styles.inputView}>
                        <View style={styles.TextInput}>
                            <Dropdown
                                onChange={onSelectCity}
                                placeholder={'Şehir'}
                                items={cities.map((_city) => {
                                    return {..._city, value: _city._id};
                                })}
                            />
                        </View>
                    </View>
                    <View style={{
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: 'row',
                        marginBottom: 30
                    }}>
                        <Text style={{...styles.desc, fontSize: 16, paddingHorizontal: 0, height: 18, marginRight: 16}}>
                            Hesabı pasif yap
                        </Text>
                        <Switch
                            trackColor={{false: "#767577", true: "tomato"}}
                            thumbColor={isEnabled ? "white" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>

                    <View>
                        <Text style={styles.desc}>
                            Sadece yukarıdaki bilgileriniz değiştirebilirsiniz. Diğer bilgileriniz için biizmle
                            iletişime geçin.
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.loginBtn} onPress={sendForm}>
                        <Text>Güncelle</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
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
        height: "100%",
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#E7E7E7",
        marginBottom: 20,
    },
    content: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
    },
    desc: {
        height: 50,
        color: "#E7E7E7",
        paddingHorizontal: 50,
        textAlign: "center",
    },
    inputView: {
        borderRadius: 30,
        width: "80%",
        height: 45,
        marginBottom: 20,
        borderColor: "#E7E7E7",
        borderWidth: 1,
        color: "#E7E7E7",
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
        color: "#E7E7E7",
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
});
export default UpdateInfoScreen;
