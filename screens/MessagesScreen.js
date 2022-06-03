import React, {useState, useEffect} from 'react'
import {RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, ActivityIndicator} from 'react-native'
import {getAllChats} from "../service/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Avatar, Badge, Button, Card} from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" color={'white'}/>


const MessagesScreen = ({navigation}) => {
    const [chats, setChats] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const init = async () => {
        const _user = JSON.parse(await AsyncStorage.getItem("user"))
        setUser(_user)
        setIsLoading(true)

        getAllChats(_user._id).then(res => {
            setIsLoading(false)
            setChats(res.data.list);
        });

    }

    useEffect(() => {
        init();
    }, [])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        init().then(() => setRefreshing(false));
    }, []);

    const decideOtherSide = (chat) => {
        if (chat.sender._id === user._id) {
            return "receiver"
        } else {
            return "sender"
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            {
                isLoading && <ActivityIndicator color={'tomato'} size={'large'} style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                    , zIndex: 999
                }}/>
            }
            <ScrollView contentContainerStyle={styles.container} refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
                {
                    chats.length > 0 ? chats.map((chat, index) => {
                        return <Card style={styles.messageRow} key={index}>
                            <Card.Title
                                title={`${chat[decideOtherSide(chat)].name} ${chat[decideOtherSide(chat)].surname}`}
                                subtitle={chat[decideOtherSide(chat)].city.label} left={LeftContent}/>
                            <Card.Actions style={styles.actions}>
                                <Button onPress={() => navigation.navigate("chat", {
                                    channel: `${chat.advert._id}_${chat.sender._id}`,
                                    ownUser: user
                                })} icon={'message'}>mesaj</Button>
                                <Button onPress={() => navigation.navigate('files', {
                                    channel: `${chat.advert._id}_${chat.sender._id}`
                                })}
                                        icon={'folder'}>Dosyalar</Button>
                                <Button onPress={() => navigation.navigate('detail', {
                                    data: chat.advert,
                                    isMyJob: chat.advert.user._id === user._id
                                })}
                                        icon={'arrow-top-right-thick'}>Detay</Button>
                            </Card.Actions>
                        </Card>
                    }) : <Text style={styles.noResult}>Henüz bir konuşma başlatmadınız</Text>
                }

            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    messageRow: {
        marginTop: 10,
        borderRadius: 15,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        width: "95%",
        marginLeft: "auto",
        marginRight: "auto",
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    noResult: {
        textAlign: "center",
        fontSize: 20,
        marginTop: 20
    }
})


export default MessagesScreen;
