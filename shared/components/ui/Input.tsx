import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../utils/constants/colors';

interface InputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  error?: string;
  secureTextEntry?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  onIconPress?: () => void;
  multiline?: boolean;
  numberOfLines?: number;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  label,
  error,
  secureTextEntry = false,
  icon,
  iconPosition = 'left',
  onIconPress,
  multiline = false,
  numberOfLines = 1,
  style,
  inputStyle,
  disabled = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleIconPress = () => {
    if (secureTextEntry) {
      setShowPassword(!showPassword);
    } else if (onIconPress) {
      onIconPress();
    }
  };

  const renderIcon = () => {
    if (!icon) return null;

    const iconName = secureTextEntry 
      ? (showPassword ? 'eye-off' : 'eye') 
      : icon;

    return (
      <TouchableOpacity
        onPress={handleIconPress}
        style={[
          styles.icon,
          iconPosition === 'right' && styles.iconRight
        ]}
        disabled={!secureTextEntry && !onIconPress}
      >
        <Ionicons
          name={iconName as any}
          size={20}
          color={Colors.textLight}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={styles.label}>{label}</Text>
      )}
      
      <View style={[
        styles.inputContainer,
        isFocused && styles.inputFocused,
        error && styles.inputError,
        disabled && styles.inputDisabled
      ]}>
        {iconPosition === 'left' && renderIcon()}
        
        <TextInput
          style={[
            styles.input,
            inputStyle,
            multiline && styles.inputMultiline
          ]}
          placeholder={placeholder}
          placeholderTextColor={Colors.textLight}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={!disabled}
        />
        
        {iconPosition === 'right' && renderIcon()}
      </View>
      
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    minHeight: 48,
  },
  inputFocused: {
    borderColor: Colors.primary,
  },
  inputError: {
    borderColor: Colors.error,
  },
  inputDisabled: {
    backgroundColor: Colors.borderLight,
    opacity: 0.6,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    paddingVertical: 12,
  },
  inputMultiline: {
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  icon: {
    padding: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  errorText: {
    fontSize: 14,
    color: Colors.error,
    marginTop: 4,
    marginLeft: 4,
  },
}); 