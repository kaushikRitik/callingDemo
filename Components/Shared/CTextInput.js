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
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name={name}
      />
      {errors[name] && <Text style={styles.error}>This is required.</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    marginTop: 5,
    borderWidth: 0.2,
    padding: 10,
    borderRadius: 5,
  },
  container: {
    paddingHorizontal: 10,
    marginBottom: 10,
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
