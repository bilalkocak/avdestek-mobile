import React, {useState, useEffect, useCallback} from 'react'
import {GiftedChat, Bubble} from 'react-native-gifted-chat'
import {StyleSheet, View} from 'react-native'
import {initializeApp} from 'firebase/app';
import {getFirestore, collection, onSnapshot, addDoc} from 'firebase/firestore';
import {checkChatIsExist, createConversation} from "../service/user";

const firebaseConfig = {
    //Your firebase config here
    apiKey: "AIzaSyDogwsnywkBppwpyHXMGOqZcLLiFrDg2xA",
    authDomain: "avukat-60b21.firebaseapp.com",
    databaseURL: "https://avukat-60b21-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "avukat-60b21",
    storageBucket: "avukat-60b21.appspot.com",
    messagingSenderId: "420079206349",
    appId: "1:420079206349:web:be96ad082582f887d20e84"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const ChatScreen = ({route, navigation}) => {
    const [messages, setMessages] = useState([])
    const {channel, ownUser, receiver, advertId} = route.params
    console.log(ownUser)
    const [isNewConversation, setIsNewConversation] = useState(false)

    useEffect(() => {
        if (isNewConversation && messages.length === 1) {

        }
        if (messages.length === 0) {
            setIsNewConversation(true)
        }
        return () => {
            setIsNewConversation(false)
        }
    }, [messages])

    useEffect(() => {
        checkChatIsExist(channel).then(res => {
            if (!res.data.isExist) {
                createConversation(ownUser._id, receiver, advertId)
            }
        })
    }, [])

    useEffect(() => {

        if (ownUser._id) {
            const unsubscribe = onSnapshot(collection(db, channel), (querySnapshot) => {
                const messagesFirestore = querySnapshot
                    .docChanges()
                    .filter(({type}) => type === 'added')
                    .map(({doc}) => {
                        const message = doc.data()
                        //createdAt is firebase.firestore.Timestamp instance
                        //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
                        return {...message, createdAt: message.createdAt.toDate()}
                    })
                    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                appendMessages(messagesFirestore)
            })
            return () => unsubscribe()
        }
    }, [ownUser])


    const appendMessages = useCallback(
        (messages) => {
            setMessages((previousMessages) => {
                return GiftedChat.append(previousMessages, messages)
            })

        },
        [messages]
    )

    async function handleSend(messages) {
        const writes = messages.map((m) => addDoc(collection(db, channel), m))
        await Promise.all(writes)
    }

    if (!ownUser._id) {
        return <View/>
    }

    return (

        ownUser._id && <GiftedChat messages={messages}
                                   renderBubble={props => {
                                       return (
                                           <Bubble
                                               {...props}

                                               textStyle={{
                                                   right: {
                                                       color: 'white'
                                                   },
                                                   left: {
                                                       color: 'black'
                                                   },
                                               }}
                                               wrapperStyle={{
                                                   right: {
                                                       backgroundColor: "tomato",
                                                   },
                                                   left: {
                                                       backgroundColor: "white",
                                                   },
                                               }}
                                           />
                                       );
                                   }}
                                   user={ownUser}
                                   onSend={handleSend}/>

    )
};

const styles = StyleSheet.create({})


export default ChatScreen;
