import React from 'react';
import {Text, View, TextInput, Button, Alert, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';

export default function CTextInput({
  control,
  label,
  name,
  rules = {},
  errors = {},
}) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.text}>{label}</Text>}
      <Controller
        control={control}
        rules={rules}
        render={({field: {onChange, onBlur, value}}) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </View>
        )}
        name={name}
      />
      {errors[name] && <Text style={styles.error}>This is required.</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    marginTop: 2,
    borderWidth: 0.1,
    padding: 10,
    borderRadius: 2,
  },
  container: {
    padding: 5,
    marginBottom: 5,
  },

  text: {
    fontSize: 12,
    fontWeight: '600',
    paddingLeft: 3,
  },
  error: {
    color: 'crimson',
    fontSize: 12,
    fontWeight: '400',
  },
});
