import {StyleSheet} from "react-native";
import LoginScreen from "./screens/LoginScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ProfileScreen from "./screens/ProfileScreen";
import TimelineScreen from "./screens/TimelineScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MessagesScreen from "./screens/MessagesScreen";
import {DefaultTheme, Provider as PaperProvider} from "react-native-paper";
import Toast, {BaseToast, ErrorToast} from "react-native-toast-message";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import CreateScreen from "./screens/CreateScreen";
import ChatScreen from "./screens/ChatScreen";
import DetailScreen from "./screens/DetailScreen";
import FileScreen from "./screens/FileScreen";
import FilesScreen from "./screens/FilesScreen";
import UpdateInfoScreen from "./screens/UpdateInfoScreen";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "tomato",
        accent: "yellow",
    },
};

const toastConfig = {
    /*
        Overwrite 'success' type,
        by modifying the existing `BaseToast` component
      */
    success: (props) => (
        <BaseToast
            {...props}
            style={{borderLeftColor: 'tomato'}}
            contentContainerStyle={{paddingHorizontal: 15}}
            text1Style={{
                fontSize: 15,
                fontWeight: "400",
            }}
        />
    ),
    /*
        Overwrite 'error' type,
        by modifying the existing `ErrorToast` component
      */
    error: (props) => (
        <ErrorToast
            {...props}
            contentContainerStyle={{paddingHorizontal: 15}}
            text1Style={{
                fontSize: 17,
            }}
            text2Style={{
                fontSize: 15,
            }}
        />
    ),
};

function TabNav() {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    if (route.name === 'profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'messages') {
                        iconName = focused ? 'chatbox' : 'chatbox-outline';
                    } else if (route.name === 'create') {
                        iconName = focused ? 'md-add-circle' : 'md-add-circle-outline';
                    } else if (route.name === 'timeline') {
                        iconName = focused ? 'md-briefcase' : 'md-briefcase-outline';
                    }
                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color}/>;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="profile" options={
                {
                    title: "Profil",
                    headerStyle: {
                        backgroundColor: 'tomato',
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTintColor: '#fff',
                }
            } component={ProfileScreen}/>
            <Tab.Screen name="messages" options={
                {
                    title: "Mesajlar",
                    headerStyle: {
                        backgroundColor: 'tomato',
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTintColor: '#fff',
                }
            } component={MessagesScreen}/>
            <Stack.Screen
                name="create"
                options={{
                    title: "İlan Oluştur",
                    headerStyle: {
                        backgroundColor: 'tomato',
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTintColor: '#fff',
                }}
                component={CreateScreen}
            />
            <Stack.Screen name="timeline"
                          options={{
                              title: "İlanlar",
                              headerStyle: {
                                  backgroundColor: 'tomato',
                              },
                              headerTintColor: '#fff',
                              headerTitleStyle: {
                                  fontWeight: 'bold',
                              },
                          }}
                          component={TimelineScreen}/>

        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={LoginScreen} options={{headerShown: false}}/>
                    <Stack.Screen name="tabs" options={{headerShown: false}} component={TabNav}/>
                    <Stack.Screen name="detail" options={{
                        title: "İlan Detay",
                        headerStyle: {
                            backgroundColor: 'tomato',
                        },
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                        headerTintColor: '#fff',
                    }
                    } component={DetailScreen}/>
                    <Stack.Screen name="register" options={{
                        title: "Üyelik Formu",
                        headerStyle: {
                            backgroundColor: '#2A2A2A',
                        },
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                        headerTintColor: '#fff',
                    }} component={RegisterScreen}/>
                    <Stack.Screen name="chat" options={{
                        headerStyle: {
                            backgroundColor: 'tomato',
                        },
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                        headerTintColor: '#fff',
                    }} component={ChatScreen}/>
                    <Stack.Screen name="file" options={{
                        headerStyle: {
                            backgroundColor: 'tomato',
                        },
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                        headerTintColor: '#fff',
                    }} component={FileScreen}/>
                    <Stack.Screen name="files"
                                  options={{
                                      headerStyle: {
                                          backgroundColor: 'tomato',
                                      },
                                      headerTitleStyle: {
                                          fontWeight: 'bold',
                                      },
                                      headerTintColor: '#fff',
                                  }} component={FilesScreen}/>
                    <Stack.Screen name="update"
                                  options={{
                                      title: "Bilgileri Güncelle",
                                      headerStyle: {
                                          backgroundColor: '#2A2A2A',
                                      },
                                      headerTitleStyle: {
                                          fontWeight: 'bold',
                                      },
                                      headerTintColor: '#fff',
                                  }} component={UpdateInfoScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
            <Toast config={toastConfig}/>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
