import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { COLORS } from "../../constants/colors";

const FormInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  error = null,
  multiline = false,
  numberOfLines = 1,
  required = false,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        {required && <Text style={styles.required}>*</Text>}
      </View>
      <TextInput
        style={[
          styles.input,
          multiline && styles.textArea,
          error && styles.inputError,
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={multiline ? "top" : "center"}
        placeholderTextColor={COLORS.gray300}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.gray700,
    marginBottom: 8,
  },
  required: {
    color: COLORS.error,
    fontSize: 16,
    marginLeft: 4,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.gray300,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.gray900,
  },
  textArea: {
    height: 100,
    paddingVertical: 12,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
  },
});

export default FormInput;
