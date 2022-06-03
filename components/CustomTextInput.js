import React from 'react';
import PropTypes from 'prop-types';
import {View} from "react-native";
import {StyleSheet, TextInput} from "react-native";

const CustomTextInput = ({onChange, value, placeholder,multiline, ...props}) => {
    const [isFocused, setIsFocused] = React.useState(false);
    return (
        <View
            style={isFocused ? [styles.inputView, {borderColor: 'tomato'},multiline && {height:100}] : styles.inputView}
        >
            <TextInput
                style={isFocused ? [styles.TextInput, { color: 'tomato'},multiline && {height:100,paddingTop:20}] : styles.TextInput}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                value={value}
                multiline={multiline}
                placeholderTextColor={isFocused ? 'tomato' : "#5b5454"}
                onChangeText={onChange}
                {...props}
            />
        </View>
    );
};


CustomTextInput.defaultProps = {
    multiline: false,
};

CustomTextInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    multiline: PropTypes.bool,
};
const styles = StyleSheet.create({
    inputView: {
        borderRadius: 30,
        height: 55,
        marginBottom: 20,
        borderColor: "#5b5454",
        borderWidth: 1,
        color: "#5b5454"
    },
    TextInput: {
        height: 60,
        flex: 1,
        padding: 10,
        marginLeft: 20,
        color: "#5b5454",
    },
});

export default CustomTextInput;
