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
  rightIcon?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({ label, inputRef, rightIcon, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={{position: 'relative'}}>
        <TextInput
          ref={inputRef}
          style={[
            styles.input,
            isFocused && styles.inputFocused,
            ...(rightIcon ? [{ paddingRight: 40 }] : []),
          ]}
          placeholderTextColor={colors.textSecondary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
        {rightIcon && (
          <View style={{ position: 'absolute', right: 12, top: 0, bottom: 0, justifyContent: 'center', height: '100%' }}>
            {rightIcon}
          </View>
        )}
      </View>
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
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
    shadowOpacity: 0.05,
  },
});
