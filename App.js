import {StyleSheet} from 'react-native';
import LoginScreen from "./screens/LoginScreen";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from "./screens/ProfileScreen";
import TimelineScreen from "./screens/TimelineScreen";
import RegisterScreen from "./screens/RegisterScreen";
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import SecondScreen from "./screens/SecondScreen";


const Stack = createNativeStackNavigator();


const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'tomato',
        accent: 'yellow',
    },
};
export default function App() {
    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={LoginScreen}/>
                    <Stack.Screen name="Profile" component={ProfileScreen}/>
                    <Stack.Screen name="second" options={{
                        title: "Ne arıyorsun ?"
                    }}  component={SecondScreen}/>
                    <Stack.Screen name="Timeline" component={TimelineScreen}/>
                    <Stack.Screen name="register" component={RegisterScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
