import React, { createContext, useContext } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

export const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = { name: TName };

const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: ControllerProps<TFieldValues, TName>
) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

export const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) throw new Error("useFormField must be used within <FormField>");

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = { id: string };
const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue);

export const FormItem: React.FC<React.PropsWithChildren<{ style?: object }>> = ({
  style,
  children,
}) => {
  const id = String(Math.random()); // React Native doesn't have useId()
  return (
    <FormItemContext.Provider value={{ id }}>
      <View style={[styles.formItem, style]}>{children}</View>
    </FormItemContext.Provider>
  );
};

export const FormLabel: React.FC<React.PropsWithChildren<{ style?: object }>> = ({
  children,
  style,
}) => {
  const { error } = useFormField();
  return (
    <Text style={[styles.label, error && styles.labelError, style]}>{children}</Text>
  );
};

export const FormControl: React.FC<React.PropsWithChildren<any>> = ({ children, ...props }) => {
  const { formItemId } = useFormField();
  return (
    <View>
      <TextInput style={styles.input} {...props} nativeID={formItemId} />
      {children}
    </View>
  );
};

export const FormDescription: React.FC<React.PropsWithChildren<{ style?: object }>> = ({
  children,
  style,
}) => {
  return <Text style={[styles.description, style]}>{children}</Text>;
};

export const FormMessage: React.FC<React.PropsWithChildren<{ style?: object }>> = ({
  children,
  style,
}) => {
  const { error } = useFormField();
  const message = error ? String(error?.message ?? "") : children;
  if (!message) return null;
  return <Text style={[styles.message, style]}>{message}</Text>;
};

const styles = StyleSheet.create({
  formItem: { marginBottom: 12 },
  label: { fontWeight: "bold", marginBottom: 4 },
  labelError: { color: "red" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
  },
  description: { fontSize: 12, color: "#555", marginTop: 4 },
  message: { fontSize: 12, color: "red", marginTop: 4 },
});
