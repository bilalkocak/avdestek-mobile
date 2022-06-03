import React, {useState} from 'react';
import DatePicker from 'react-native-datepicker';

import {View, StyleSheet, StatusBar} from "react-native";
import PropTypes from "prop-types";

const CustomDatePicker = ({date,setDate}) => {
    return (
        <View styles={styles.container}>
            <DatePicker
                style={styles.datePickerStyle}
                date={date} //initial date from state
                mode="datetime" //The enum of date, datetime and time
                placeholder="select date"
                format="DD/MM/YYYY HH:mm"
                useNativeDriver={false}
                minDate={new Date()}
                maxDate={new Date(2030, 12, 31)}
                confirmBtnText="Onayla"
                cancelBtnText="Vazgeç"
                customStyles={{
                    dateIcon: {
                        display: 'none'
                    },
                    dateInput: {
                        borderWidth: 0,
                    },
                }}
                onDateChange={(date) => {
                    setDate(date);
                }}
            />
        </View>
    );
};

CustomDatePicker.defaultProps = {
    date: new Date(),
    setDate: () => {
    }
};

CustomDatePicker.propTypes = {
    setDate: PropTypes.func
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    datePickerStyle: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
});


export default CustomDatePicker;
