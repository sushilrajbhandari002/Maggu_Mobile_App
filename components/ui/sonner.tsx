import React from "react";
import Toast, { BaseToast, ToastConfig, ToastProps } from "react-native-toast-message";
import { useColorScheme } from "react-native";

const toastConfig: ToastConfig = {
  normal: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "#d1d5db", // equivalent to --normal-border
        backgroundColor: "#f9fafb", // equivalent to --normal-bg
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      text1Style={{
        color: "#111827", // equivalent to --normal-text
        fontWeight: "600",
      }}
      text2Style={{
        color: "#374151",
      }}
    />
  ),
};

const Toaster = () => {
  const colorScheme = useColorScheme(); // light or dark

  // You can switch styles dynamically based on colorScheme if needed
  return <Toast config={toastConfig} />;
};

export { Toaster };

// Usage elsewhere in your app:
// import Toast from 'react-native-toast-message';
// Toast.show({ type: 'normal', text1: 'Hello', text2: 'This is a toast!' });
