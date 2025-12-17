import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

// OTP Input Container
function InputOTP({
  value,
  onChangeText,
  length = 6,
  containerStyle,
  inputStyle,
}: {
  value: string;
  onChangeText: (val: string) => void;
  length?: number;
  containerStyle?: object;
  inputStyle?: object;
}) {
  const inputs = useRef<TextInput[]>([]);
  const [otp, setOtp] = useState(value.split(""));

  useEffect(() => {
    setOtp(value.split(""));
  }, [value]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    onChangeText(newOtp.join(""));
    // Move focus
    if (text && index < length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {Array.from({ length }).map((_, i) => (
        <TextInput
          key={i}
          ref={(ref) => (inputs.current[i] = ref!)}
          style={[styles.input, inputStyle]}
          keyboardType="number-pad"
          maxLength={1}
          value={otp[i] || ""}
          onChangeText={(text) => handleChange(text, i)}
        />
      ))}
    </View>
  );
}

// OTP Separator (like a dash)
function InputOTPSeparator({ style }: { style?: object }) {
  return <Text style={[styles.separator, style]}>-</Text>;
}

// Individual Slot (optional, for styling per input)
function InputOTPSlot({
  isActive,
  value,
  style,
}: {
  isActive?: boolean;
  value: string;
  style?: object;
}) {
  return (
    <View
      style={[
        styles.slot,
        isActive && styles.activeSlot,
        style,
      ]}
    >
      <Text style={styles.slotText}>{value}</Text>
      {isActive && <View style={styles.caret} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
  },
  input: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    textAlign: "center",
    fontSize: 20,
    backgroundColor: "#fff",
  },
  separator: {
    fontSize: 20,
    marginHorizontal: 4,
  },
  slot: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  activeSlot: {
    borderColor: "#007bff",
  },
  slotText: {
    fontSize: 20,
  },
  caret: {
    position: "absolute",
    width: 2,
    height: 24,
    backgroundColor: "#007bff",
  },
});

export { InputOTP, InputOTPSeparator, InputOTPSlot };
