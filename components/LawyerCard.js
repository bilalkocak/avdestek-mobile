import React from 'react';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';

import PropTypes from 'prop-types';
import {StyleSheet} from "react-native";

const LeftContent = props => <Avatar.Icon {...props} icon="account"/>

const LawyerCard = ({
                        name,
                        specialty,
                        location,
                        phone,
                        email,
                        website,
                        bio,
                        navigation
                    }) => {
    return (
        <Card style={styles.container}>
            <Card.Title  title="Tarık Erol" subtitle="İzmir" left={LeftContent}/>
            <Card.Content>
                <Title>Card title</Title>
                <Paragraph>Card content</Paragraph>
            </Card.Content>
            <Card.Actions style={styles.actions}>
                <Button icon={'message'}>mesaj</Button>
                <Button onPress={() => navigation.navigate('Profile')}>profile</Button>
            </Card.Actions>
        </Card>

    );
};
const styles = StyleSheet.create({
    container: {
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
    actions: {
        flexDirection: "row",
        justifyContent: "space-around",
    }
});

LawyerCard.propTypes = {
    name: PropTypes.string,
    specialty: PropTypes.string,
    location: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    website: PropTypes.string,
    bio: PropTypes.string
};

export default LawyerCard;
