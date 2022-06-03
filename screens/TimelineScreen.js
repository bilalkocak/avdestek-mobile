import React, {useEffect} from "react";
import {SafeAreaView, ScrollView, Text, View, StyleSheet, RefreshControl} from "react-native";
import LawyerCard from "../components/LawyerCard";
import {getAdvertsOnMyCity, getMyAdverts} from "../service/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TimelineScreen = ({navigation}) => {
    const [adverts, setAdverts] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [loggedUser, setLoggedUser] = React.useState(null);
    const [myJobs, setMyJobs] = React.useState([]);

    const getData = async () => {
        const user = JSON.parse(await AsyncStorage.getItem("user"))
        setLoggedUser(user);
        getAdvertsOnMyCity(user._id).then(res => {
            setAdverts(res.data.adverts);
        });
        getMyAdverts(user._id).then(res => {
            setMyJobs(res.data.list)
        });
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getData().then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        getData();
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.container} refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
                <Text style={styles.title}>Şehrimdeki ilanlar</Text>
                {
                    adverts.length > 0 ?
                        adverts.map((item, index) => {
                            return (
                                <LawyerCard
                                    loggedUser={loggedUser}
                                    key={index}
                                    navigation={navigation}
                                    data={item}
                                />
                            )
                        })
                        :
                        <Text style={styles.noAdverts}>İlan bulunamadı</Text>

                }

                <View style={styles.divider}/>
                <Text style={styles.title}>Oluşturduğum ilanlar</Text>
                {
                    myJobs.length > 0 ?
                        myJobs.map((item, index) => {
                            return (
                                <LawyerCard
                                    loggedUser={loggedUser}
                                    key={index}
                                    navigation={navigation}
                                    data={item}
                                    isMyJob={true}
                                />
                            )
                        })
                        :
                        <Text style={styles.noAdverts}>İlan bulunamadı</Text>
                }

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    noAdverts: {
        textAlign: "center",
        fontSize: 20,
        color: 'gray'
    },
    scrollView: {
        flex: 1,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    divider: {
        borderBottomColor: 'tomato',
        borderBottomWidth: 1,
        marginBottom: 20,
        marginTop: 20,
    }
});

export default TimelineScreen;
