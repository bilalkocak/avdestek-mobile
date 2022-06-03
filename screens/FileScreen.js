import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Button,
    Image,
    Share,
    StatusBar,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import * as Clipboard from "expo-clipboard";
import ImageView from "react-native-image-viewing";


const FileScreen = ({route, navigation}) => {
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true)

    const {image, images, index} = route.params
    const [visible, setIsVisible] = useState(false);


    const _share = () => {
        Share.share({
            message: image,
            title: "Bu dosyayı paylaş",
            url: image,
        });
    };

    const _copyToClipboard = () => {
        Clipboard.setString(image);
        alert("Copied image URL to clipboard");
    };

console.log(index)
    useEffect(() => {
        navigation.setOptions({ title: image.name })
    }, []);
    return (
        <SafeAreaView style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <ImageView
                images={images}
                imageIndex={index}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
            />

            <TouchableOpacity style={{flex: 1, width: "100%"}} onPress={() => setIsVisible(true)}>
                {
                    loading && <ActivityIndicator color={'tomato'} size={'large'} style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0
                        , zIndex: 999
                    }}/>
                }
                <Image onLoadStart={() => setLoading(true)}
                       resizeMode={"contain"}
                       onLoadEnd={() => setLoading(false)}
                       style={{flex: 1, borderWidth: 1, width: "100%"}}
                       source={{uri: image.uri}}/>
            </TouchableOpacity>
            <Button title="Paylaş" onPress={_share}/>
            <Button title="Panoya kopyala" onPress={_copyToClipboard}/>
            <StatusBar barStyle="default"/>
        </SafeAreaView>
    );
};

FileScreen.propTypes = {};

export default FileScreen;
