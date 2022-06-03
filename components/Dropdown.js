import RNPickerSelect from "react-native-picker-select";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";

export const Dropdown = ({ items, onChange, placeholder }) => {
  return (
    <RNPickerSelect
      style={pickerSelectStyles}
      placeholder={{
        label: placeholder,
        value: null,
      }}
      onValueChange={(value) => onChange(value)}
      items={items}
    />
  );
};

Dropdown.prototypes = {
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 0,
    borderWidth: 0,
    borderRadius: 4,
    color: "#E7E7E7",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 0,
    paddingVertical: 8,
    borderWidth: 0,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
