import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from "react-native";
import LawyerCard from "../components/LawyerCard";


const TimelineScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView >
                <LawyerCard
                    navigation={navigation}
                    name={'bilal'}
                    bio={'Aile/Ticaret'}
                    email={'bilalkocak04@yandex.com'}
                    location={'İzmir'}
                    phone={'5558965907'}
                    specialty={'Ticaret'}
                    website={'bilalkocak.com'}/>
                <LawyerCard
                    name={'bilal'}
                    bio={'Aile/Ticaret'}
                    email={'bilalkocak04@yandex.com'}
                    location={'İzmir'}
                    phone={'5558965907'}
                    specialty={'Ticaret'}
                    website={'bilalkocak.com'}/>
                <LawyerCard
                    name={'bilal'}
                    bio={'Aile/Ticaret'}
                    email={'bilalkocak04@yandex.com'}
                    location={'İzmir'}
                    phone={'5558965907'}
                    specialty={'Ticaret'}
                    website={'bilalkocak.com'}/>
                <LawyerCard
                    name={'bilal'}
                    bio={'Aile/Ticaret'}
                    email={'bilalkocak04@yandex.com'}
                    location={'İzmir'}
                    phone={'5558965907'}
                    specialty={'Ticaret'}
                    website={'bilalkocak.com'}/>
                <LawyerCard
                    name={'bilal'}
                    bio={'Aile/Ticaret'}
                    email={'bilalkocak04@yandex.com'}
                    location={'İzmir'}
                    phone={'5558965907'}
                    specialty={'Ticaret'}
                    website={'bilalkocak.com'}/>
                <LawyerCard
                    name={'bilal'}
                    bio={'Aile/Ticaret'}
                    email={'bilalkocak04@yandex.com'}
                    location={'İzmir'}
                    phone={'5558965907'}
                    specialty={'Ticaret'}
                    website={'bilalkocak.com'}/>
                <LawyerCard
                    name={'bilal'}
                    bio={'Aile/Ticaret'}
                    email={'bilalkocak04@yandex.com'}
                    location={'İzmir'}
                    phone={'5558965907'}
                    specialty={'Ticaret'}
                    website={'bilalkocak.com'}/>
                <LawyerCard
                    name={'bilal'}
                    bio={'Aile/Ticaret'}
                    email={'bilalkocak04@yandex.com'}
                    location={'İzmir'}
                    phone={'5558965907'}
                    specialty={'Ticaret'}
                    website={'bilalkocak.com'}/>
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    text: {
        fontSize: 42,
    }
});

export default TimelineScreen;
