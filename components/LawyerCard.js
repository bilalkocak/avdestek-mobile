import React from "react";
import {Avatar, Button, Card, Title, Paragraph, Badge} from "react-native-paper";

import PropTypes from "prop-types";
import {StyleSheet} from "react-native";

const LeftContent = (props) => <Avatar.Icon {...props} icon="account-search" color={'white'}/>;

const LawyerCard = ({
                        data,
                        navigation,
                        loggedUser,
                        isMyJob
                    }) => {

    return (
        <Card style={styles.container}>
            <Card.Title title={`${data.user.name} ${data.user.surname}`} subtitle={data.city.label} left={LeftContent}
                        right={() => <Badge
                            style={{
                                backgroundColor: 'tomato',
                                color: 'white',
                                paddingHorizontal: 10
                            }}>{'Yeni'}</Badge>}/>
            <Card.Content>
                <Title>{data.title}</Title>
                <Paragraph>{data.description}</Paragraph>
            </Card.Content>
            <Card.Actions style={styles.actions}>
                {
                    !isMyJob &&
                    <Button onPress={() => navigation.navigate("chat", {
                        receiver: data.user._id,
                        ownUser: loggedUser,
                        channel: `${data._id}_${loggedUser._id}`,
                        advertId: data._id
                    })} icon={'message'}>mesaj</Button>
                }
                <Button onPress={() => navigation.navigate('detail', {data, isMyJob})}
                        icon={'arrow-top-right-thick'}>Detay</Button>
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
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
});

LawyerCard.defaultProps = {
    data: {},
    loggedUser: {},
    isMyJob: false
};

LawyerCard.propTypes = {
    data: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    loggedUser: PropTypes.object.isRequired,
    isMyJob: PropTypes.bool.isRequired,
};

export default LawyerCard;
