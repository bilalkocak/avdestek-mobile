import React, {useEffect, useState} from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {StatusBar} from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import dayjs from "dayjs";
import {getMyDoneAdverts} from "../service/user";

function ProfileScreen({navigation}) {
    const [user, setUser] = useState({});
    const [successJobs, setSuccessJobs] = useState([]);

    const getUser = async () => {
        const _user = JSON.parse(await AsyncStorage.getItem("user"))
        setUser(_user);
    };

    useEffect(() => {
        getUser();

    }, []);

    useEffect(() => {
        if (user?._id) {
            getMyDoneAdverts(user._id).then(res => {
                setSuccessJobs(res.data.list)
            })
        }

    }, [user]);

    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <ScrollView style={styles.scrollContainer}>
                {user && <View style={styles.header}>
                    <View style={styles.title}>
                        <View style={styles.infoCard}>
                            <Text style={styles.titleText}>{user.fullName} </Text>
                            <View style={styles.textWithIcon}>
                                <Text style={styles.icon}>
                                    <Ionicons name={'location'}
                                              color={'tomato'}
                                              size={17}/>
                                </Text>
                                <Text style={styles.cityText}>{user.city?.label} / {user.baroNumber} </Text>
                            </View>
                            <View style={styles.textWithIcon}>
                                <Text style={styles.icon}>
                                    <Ionicons name={'mail'}
                                              color={'tomato'}
                                              size={17}/>
                                </Text>
                                <Text style={styles.cityText}>{user.email} </Text>
                            </View>
                            <View style={styles.textWithIcon}>
                                <Text style={styles.icon}>
                                    <Ionicons name={'phone-portrait'}
                                              color={'tomato'}
                                              size={17}/>
                                </Text>
                                <Text style={styles.cityText}>{user.telephone} </Text>
                            </View>
                            <View style={styles.textWithIcon}>
                                <Text style={styles.icon}>
                                    <Ionicons name={'checkmark-circle'}
                                              color={'tomato'}
                                              size={17}/>
                                </Text>
                                <Text style={styles.cityText}>{user.successCount} </Text>
                            </View>
                            <View style={styles.textWithIcon}>
                                <Text style={styles.icon}>
                                    <Ionicons name={'calendar'}
                                              color={'tomato'}
                                              size={17}/>
                                </Text>
                                <Text style={styles.date}> {dayjs(user.createdAt).format('DD/MM/YYYY')}</Text>
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate('update', {user})}>
                                <Text style={{color: 'tomato', fontSize: 16, marginTop: 5, fontWeight: "bold"}}>Üyelik
                                    bilgilerini
                                    Güncelle</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>}
                <View style={styles.content}>

                    {
                        successJobs.length > 0 && <Text>Tamamlanan işlerim</Text>
                    }

                    {
                        successJobs.map(item => {
                            return <View style={styles.infoCard}>
                                <Text>{item.title}</Text>
                            </View>
                        })
                    }
                </View>

            </ScrollView>
            <View style={styles.footer}>

                <TouchableOpacity
                    onPress={async () => {
                        await AsyncStorage.setItem("isLogged", "false");
                        await AsyncStorage.setItem("user", "");
                        navigation.navigate("Home");
                    }}
                    style={styles.loginBtn}>
                    <Text style={{color: 'white'}}>Çıkış</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flex: 7
    },
    header: {
        flex: 2,
    },
    title: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    titleText: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20
    },
    infoCard: {
        flex: 1,
        fontSize: 15,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        marginTop: 10,
        shadowOpacity: 0.17,
        shadowRadius: 4.65,
        elevation: 6,
    },
    descriptionAreaText: {
        fontSize: 15,
    },
    descriptionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    content: {
        flex: 1,
        padding: 10,
    },
    date: {
        fontSize: 17,
    },
    cityText: {
        fontSize: 17,
    },
    textWithIcon: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    icon: {
        marginRight: 5,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        alignItems: 'center',
        paddingBottom: 30
    },
    loginBtn: {
        width: "45%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "tomato"
    },
});
export default ProfileScreen;
