import React, {useEffect, useRef, useState} from "react";
import {
    TouchableOpacity,
    Text,
    StatusBar,
    StyleSheet,
    View,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import {getAllCities, createAdvert} from "../service/user";
import DatePicker from "../components/DatePicker";
import CustomTextInput from "../components/CustomTextInput";
import CustomSelect from "../components/CustomSelect";
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";


const CreateScreen = ({navigation}) => {
    const [formData, setFormData] = useState({
        title: "",
        desc: "",
        city: 1,
        date: new Date(),
        salary: 0,
    });

    const onSelectCity = (value) => {
        setFormData({...formData, city: value});
    };

    const onChangeDate = (date) => {
        setFormData({...formData, date: date});
    };

    const onPressCreate = async () => {
        const user = JSON.parse(await AsyncStorage.getItem("user"))
        createAdvert({
            user: user._id,
            title: formData.title,
            description: formData.desc,
            city: formData.city,
            salary: formData.salary,
            caseDate: formData.date
        }).then(res => {
            Toast.show({
                type: "success",
                text1: "İlan oluşturuldu"
            });

            // reset all form data
            setFormData({
                title: "",
                desc: "",
                city: 1,
                date: new Date(),
                salary: 0,
            });
        })
    };

    const [cities, setCities] = useState([]);

    useEffect(() => {
        getAllCities().then((res) => {
            setCities(res.data.cities);
        });
    }, []);


    const refRBSheet = useRef();

    return (
        <View style={styles.container}>
            <View styles={styles.inputContainer}>
                <CustomTextInput placeholder={'İlan başlığı'}
                                 value={formData.title}
                                 onChange={(title) =>
                                     setFormData({...formData, title})}/>
                <CustomTextInput placeholder={'İlan açıklaması'}
                                 value={formData.desc}
                                 multiline={true}
                                 numberOfLines={4}
                                 onChange={(desc) =>
                                     setFormData({...formData, desc})}/>
                <CustomSelect placeholder="Şehir"
                              items={cities.map((_city) => {
                                  return {..._city, value: _city._id};
                              })} onSelect={onSelectCity}/>
                <CustomTextInput placeholder={'Ücret'}
                                 value={formData.salary}
                                 keyboardType="numeric"
                                 onChange={(salary) =>
                                     setFormData({...formData, salary})}/>


                <View style={styles.date}>
                    <DatePicker date={formData.date} setDate={(date) =>
                        onChangeDate(date)}/>
                </View>

                <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={onPressCreate}
                >
                    <Text style={styles.buttonText}>Onayla</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight + 40,
        paddingHorizontal: 20,
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
    date: {
        borderRadius: 30,
        width: "100%",
        height: 55,
        marginBottom: 20,
        borderColor: "#E7E7E7",
        borderWidth: 1,
        color: "#E7E7E7",
    },
    inputContainer: {
        width: "80%",
        flexDirection: "column",
        flex: 1,
        paddingTop: 20,
        borderWidth: 1,
        borderColor: 'red'
    },
    loginBtn: {
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
    }
});

export default CreateScreen;
