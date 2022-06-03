import React, {useEffect, useState} from 'react';
import {
    Button,
    ScrollView,
    StatusBar,
    View,
    SafeAreaView, StyleSheet, ActivityIndicator
} from 'react-native';
import {getStorage, ref, getDownloadURL, listAll, uploadBytes} from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import {List} from 'react-native-paper';
import Toast from "react-native-toast-message";


async function uploadImageAsync(uri, channel) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
    });
    const fileRef = ref(getStorage(), `${channel}/${Date.now()}`);
    const result = await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    blob.close();

    return await getDownloadURL(fileRef);

}

const FilesScreen = ({route, navigation}) => {
    const {channel} = route.params
    const [loading, setLoading] = useState(true)

    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const [images, setImages] = useState([]);

    const permission = async () => {
        const {
            status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
        }
    }

    const _pickImage = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
        });

        await _handleImagePicked(pickerResult);
    };

    const _handleImagePicked = async (pickerResult) => {
        try {
            setUploading(true);

            if (!pickerResult.cancelled) {
                const uploadUrl = await uploadImageAsync(pickerResult.uri, channel);
                setImage(uploadUrl)
                Toast.show({
                    type: "success",
                    text1: "Belge yüklendi",
                });
            }
        } catch (e) {
            alert("Upload failed, sorry :(");
        } finally {
            fetchImages()
            setUploading(false);
        }
    };


    const fetchImages = async () => {

        listAll(ref(getStorage(), `${channel}/`))
            .then((res) => {
                setLoading(true)
                setImages([])
                res.items.forEach((itemRef) => {
                    // All the items under listRef.
                    getDownloadURL(itemRef)
                        .then((url) => {
                            // `url` is the download URL for 'images/stars.jpg'

                            // This can be downloaded directly:
                            const xhr = new XMLHttpRequest();
                            xhr.responseType = 'blob';
                            xhr.onload = (event) => {
                                const blob = xhr.response;
                            };
                            xhr.open('GET', url);
                            setImages(images => [...images, {
                                name: itemRef.name,
                                uri: url
                            }])
                            xhr.send();

                        })
                        .catch((error) => {
                            // Handle any errors
                        }).finally(() => {
                        setLoading(false)
                        // Always runs, regardless of whether or not the request is successful.
                    });
                });

            }).catch((error) => {
            // Uh-oh, an error occurred!
        })
    }
    useEffect(() => {
        permission()
        fetchImages()
        navigation.setOptions({title: "Belgeler"})


        return () => {
            setImages([]);
        };

    }, []);
    return (
        <SafeAreaView style={styles.container}>
            {
                loading || uploading && <ActivityIndicator color={'tomato'} size={'large'} style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                    , zIndex: 999
                }}/>
            }

            <Button
                onPress={_pickImage}
                title="Yeni belge ekle"
            />

            <ScrollView style={styles.list}>
                <List.Section>
                    <List.Subheader>Eklenmiş belgeler</List.Subheader>
                    {
                        images.map((image, index) => (
                            <List.Item
                                key={index}
                                title={image.name}
                                left={() => <List.Icon color="#000" icon="folder"/>} s
                                onPress={() => {
                                    navigation.navigate('file', {
                                        image: image,
                                        images,
                                        index
                                    })
                                }}
                            />
                        ))
                    }
                </List.Section>
            </ScrollView>


            <StatusBar barStyle="default"/>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20
    },
    list: {
        flex: 1,
        width: '100%',
    },

})

FilesScreen.propTypes = {};

export default FilesScreen;
