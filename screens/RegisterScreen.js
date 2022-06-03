import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getAllCities, userRegister } from "../service/user";
import Toast from "react-native-toast-message";
import { Dropdown } from "../components/Dropdown";

function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    telephone: "",
    city: 1,
    citizenId: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    getAllCities().then((res) => {
      setCities(res.data.cities);
    });
  }, []);

  const onSelectCity = (value) => {
    setFormData({ ...formData, city: value });
  };

  const sendForm = () => {
    if (formData.password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Form gönderilemedi",
        text2: "Parolalar eşleşmiyor",
      });
    } else {
      userRegister(formData)
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
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <KeyboardAwareScrollView extraHeight={120}>
        <View style={styles.content}>
          <View>
            <Text style={styles.header}>Üyelik Formu</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="İsim"
              placeholderTextColor="#E7E7E7"
              value={formData.name}
              onChangeText={(name) => setFormData({ ...formData, name })}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Soyisim"
              value={formData.surname}
              placeholderTextColor="#E7E7E7"
              onChangeText={(surname) => setFormData({ ...formData, surname })}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Email."
              value={formData.email}
              placeholderTextColor="#E7E7E7"
              onChangeText={(email) => setFormData({ ...formData, email })}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Baro Sicil No"
              value={formData.baroNumber}
              placeholderTextColor="#E7E7E7"
              onChangeText={(baroNumber) =>
                setFormData({ ...formData, baroNumber })
              }
            />
          </View>
          <View style={styles.inputView}>
            <View style={styles.TextInput}>
              <Dropdown
                onChange={onSelectCity}
                placeholder={'Şehir'}
                items={cities.map((_city) => {
                  return { ..._city, value: _city._id };
                })}
              />
            </View>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Tc No"
              value={formData.citizenId}
              placeholderTextColor="#E7E7E7"
              onChangeText={(citizenId) =>
                setFormData({ ...formData, citizenId })
              }
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Telefon Numarası"
              placeholderTextColor="#E7E7E7"
              value={formData.telephone}
              onChangeText={(telephone) =>
                setFormData({ ...formData, telephone })
              }
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Parola"
              value={formData.password}
              placeholderTextColor="#E7E7E7"
              secureTextEntry={true}
              onChangeText={(password) =>
                setFormData({ ...formData, password })
              }
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Parola Tekrar"
              placeholderTextColor="#E7E7E7"
              value={confirmPassword}
              secureTextEntry={true}
              onChangeText={(_confirmPassword) =>
                setConfirmPassword(_confirmPassword)
              }
            />
          </View>
          <View>
            <Text style={styles.desc}>
              Başvurunuzu aldıktan sonra 3 iş günü içerisinde size dönüş
              yapılacaktır.
            </Text>
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={sendForm}>
            <Text>Başvur</Text>
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
export default RegisterScreen;
