import { colors, fonts } from "@/constants/theme";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface InputFieldProps extends TextInputProps {
  label?: string;
  inputRef?: React.RefObject<TextInput | null>;
}

const InputField: React.FC<InputFieldProps> = ({ label, inputRef, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        ref={inputRef}
        style={[
          styles.input,
          isFocused && styles.inputFocused,
        ]}
        placeholderTextColor={colors.textSecondary}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  label: {
    marginBottom: 6,
    fontSize: 16,
    color: colors.textPrimary,
    fontFamily: fonts.medium,
  },
  input: {
    height: 57,
    borderWidth: 1,
    borderColor: colors.neutral300,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    fontSize: 16,
    color: colors.textPrimary,
    fontFamily: fonts.regular,
  },
  inputFocused: {
    borderColor: colors.primary,
    shadowOpacity: 0.2,
  },
});
