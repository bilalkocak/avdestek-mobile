import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from "react-native";
import {Dropdown} from "./Dropdown";

const CustomSelect = ({onSelect, items, placeholder}) => {
    return (
        <View style={styles.inputView}>
            <View style={styles.TextInput}>
                <Dropdown
                    placeholder={placeholder}
                    onChange={onSelect}
                    items={items}
                />
            </View>
        </View>
    );
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

CustomSelect.propTypes = {
    onSelect: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    placeholder: PropTypes.string.isRequired,
};

export default CustomSelect;
