import React, {useEffect, useState} from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/tr'


import {StyleSheet, View, Text, ScrollView, TouchableOpacity, RefreshControl} from 'react-native'
import {advertApplication, assignUser, doneAdvert, getAdvert} from "../service/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import {resolve} from "@babel/core/lib/vendor/import-meta-resolve";


const DetailScreen = ({route, navigation}) => {
    dayjs.extend(relativeTime)
    const [refreshing, setRefreshing] = useState(false);
    const [loggedUser, setLoggedUser] = useState(null);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchAdvert()
    }, []);

    const [advert, setAdvert] = React.useState({})
    const [loading, setLoading] = useState(true)
    const {data, isMyJob} = route.params

    const fetchAdvert = () => {
        getAdvert(data._id).then(res => {
            setLoading(false)
            setAdvert(res.data.advert)
            setRefreshing(false);
        })
    }

    useEffect(() => {
        fetchAdvert()
        getLoggedUser().then(res => {
            setLoggedUser(res)
        })
        return () => {
            console.log("DetailScreen unmount")
        }
    }, [])

    const getLoggedUser = async () => {
        const user = await AsyncStorage.getItem('user')
        return JSON.parse(user)
    }

    const amICandidate = () => {
        return getLoggedUser().then(user => {
            return Boolean(advert.candidates?.findIndex(item => item._id === user._id) !== -1);
        })

    }

    const handleAssign = (user_id) => {
        assignUser(advert._id, user_id).then(() => {
            Toast.show({
                type: 'success',
                position: 'bottom',
                text1: 'Başarılı',
                text2: 'Görev ataması yapıldı',
                visibilityTime: 3000,
                autoHide: true
            })
        }).catch(err => {
            Toast.show({
                type: 'danger',
                position: 'bottom',
                text1: 'Başarısız',
                text2: err.message,
                visibilityTime: 3000,
                autoHide: true
            })
        })
    }

    const handlePressApplication = async () => {
        if (amICandidate()) {
            Toast.show({
                type: "success",
                text1: "Daha önce başvuru yaptınız"
            });
            return
        }
        const user = JSON.parse(await AsyncStorage.getItem("user"))
        advertApplication(advert._id, user._id)
            .then((res) => {
                Toast.show({
                    type: "success",
                    text1: "Başarılı bir şekilde başvuru yaptınız"
                });

            })
    }

    const handleDone = ()=>{

        doneAdvert(advert).then(res=>{
            console.log(res.data)
        })
    }
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer} refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
                <View style={styles.header}>
                    <View style={styles.title}>
                        <View style={styles.infoCard}>
                            <Text style={styles.titleText}>{advert.title} </Text>
                            <View style={styles.textWithIcon}>
                                <Text style={styles.icon}>
                                    <Ionicons name={'location'}
                                              color={'tomato'}
                                              size={17}/>
                                </Text>
                                <Text style={styles.cityText}>{advert.city?.label} </Text>
                            </View>
                            <View style={styles.textWithIcon}>
                                <Text style={styles.icon}>
                                    <Ionicons name={'calendar'}
                                              color={'tomato'}
                                              size={17}/>
                                </Text>
                                <Text style={styles.date}> {dayjs(advert.caseDate).format('DD/MM/YYYY hh:mm')}</Text>
                            </View>
                            <View style={styles.textWithIcon}>
                                <Text style={styles.icon}>
                                    <Ionicons name={'pricetag'}
                                              color={'tomato'}
                                              size={17}/>
                                </Text>
                                <Text style={styles.date}> {advert.salary}₺</Text>
                            </View>
                        </View>
                    </View>

                </View>
                <View style={styles.content}>

                    <View style={styles.infoCard}>
                        <Text style={styles.descriptionTitle}>Detaylar</Text>

                        <Text style={styles.descriptionAreaText}>{advert.description}</Text>

                    </View>

                    {
                        !isMyJob &&
                        <View style={styles.infoCard}>
                            <Text style={styles.descriptionTitle}>İlan veren bilgileri:</Text>

                            <View style={styles.textWithIcon}>
                                <Text style={styles.icon}>
                                    <Ionicons name={'person'}
                                              color={'tomato'}
                                              size={17}/>
                                </Text>
                                <Text style={styles.cityText}>{advert.user?.censoredFullName}</Text>
                            </View>
                            <View style={styles.textWithIcon}>
                                <Text style={styles.icon}>
                                    <Ionicons name={'location'}
                                              color={'tomato'}
                                              size={17}/>
                                </Text>
                                <Text style={styles.cityText}>{advert.user?.city?.label}</Text>
                            </View>
                            <View style={styles.textWithIcon}>
                                <Text style={styles.icon}>
                                    <Ionicons name={'calendar'}
                                              color={'tomato'}
                                              size={17}/>
                                </Text>
                                <Text style={styles.date}> {dayjs(advert?.createdAt).locale('tr').fromNow()}</Text>
                            </View>

                        </View>
                    }


                    {
                        isMyJob &&
                        <View style={styles.candidateContainer}>
                            <Text style={{...styles.descriptionTitle, marginTop: 20}}>Başvuranlar:</Text>

                            {
                                !loading &&
                                advert?.candidates?.map(item => {
                                    return <View style={styles.infoCard} key={item._id}>
                                        <View style={styles.textWithIcon}>
                                            <Text style={styles.icon}>
                                                <Ionicons name={'person'}
                                                          color={'tomato'}
                                                          size={17}/>
                                            </Text>
                                            <Text
                                                style={styles.cityText}>{advert.assignedUser?._id !== item._id ? item?.censoredFullName : item.fullName}</Text>
                                        </View>
                                        <View style={styles.textWithIcon}>
                                            <Text style={styles.icon}>
                                                <Ionicons name={'location'}
                                                          color={'tomato'}
                                                          size={17}/>
                                            </Text>
                                            <Text style={styles.cityText}>{item.city?.label}</Text>
                                        </View>
                                        <View style={styles.textWithIcon}>
                                            <Text style={styles.icon}>
                                                <Ionicons name={'calendar'}
                                                          color={'tomato'}
                                                          size={17}/>
                                            </Text>
                                            <Text
                                                style={styles.date}> {dayjs(item.createdAt).locale('tr').fromNow()}</Text>
                                        </View>

                                        {
                                            !Boolean(advert.assignedUser) &&
                                            (<TouchableOpacity
                                                onPress={()=>handleAssign(item._id)}
                                                style={{
                                                    ...styles.loginBtn,
                                                    height: 40,
                                                    marginTop: 10,
                                                    width: '100%'
                                                }}>
                                                <Text style={{color: 'white'}}>Seç</Text>
                                            </TouchableOpacity>)
                                        }
                                        {
                                            advert?.assignedUser?._id === item._id &&
                                            (<TouchableOpacity
                                                onPress={()=>navigation.navigate('chat',{
                                                    ownUser: loggedUser,
                                                    channel: `${advert._id}_${item._id}`,
                                                    advertId: advert._id
                                                })}
                                                style={{
                                                    ...styles.loginBtn,
                                                    height: 40,
                                                    marginTop: 10,
                                                    width: '100%'
                                                }}>
                                                <Text style={{color: 'white'}}>Mesaj</Text>
                                            </TouchableOpacity>)
                                        }
                                    </View>
                                })
                            }

                        </View>
                    }
                </View>

            </ScrollView>
            <View style={styles.footer}>
                {!isMyJob && <TouchableOpacity onPress={handlePressApplication} style={styles.loginBtn}>
                    <Text style={{color: 'white'}}>{amICandidate() ? "Başvuruldu" : "Başvur"}</Text>
                </TouchableOpacity>}
                {!isMyJob && <TouchableOpacity onPress={() => navigation.navigate('file')}
                                               style={styles.loginBtn}>
                    <Text style={{color: 'white'}}>Mesaj</Text>
                </TouchableOpacity>}
                {console.log(advert.isDone)}
                {
                    isMyJob && !advert.isDone &&
                    (<TouchableOpacity
                        onPress={handleDone}
                        style={{
                            ...styles.loginBtn,
                            height: 40,
                            marginTop: 10,
                            width: '100%'
                        }}>
                        <Text style={{color: 'white'}}>İşi başarılı şekilde sonlandır</Text>
                    </TouchableOpacity>)
                }
            </View>
        </View>


    )
};

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
    candidateContainer: {
        padding: 10,
        paddingBottom: 30
    },

})


export default DetailScreen;
