import React from 'react';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';

import PropTypes from 'prop-types';

const LeftContent = props => <Avatar.Icon {...props} icon="account-clock"/>

const LawyerCard = ({
                        name,
                        specialty,
                        location,
                        phone,
                        email,
                        website,
                        bio
                    }) => {
    return (

        <Card>
            <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent}/>
            <Card.Content>
                <Title>Card title</Title>
                <Paragraph>Card content</Paragraph>
            </Card.Content>
            <Card.Cover source={{uri: 'https://picsum.photos/700'}}/>
            <Card.Actions>
                <Button>Cancel</Button>
                <Button>Ok</Button>
            </Card.Actions>
        </Card>

    );
};


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
