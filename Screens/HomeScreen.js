import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CTextInput from '../Components/Shared/CTextInput';
import {useForm} from 'react-hook-form';
import {CometChat} from '@cometchat-pro/react-native-chat';

const HomeScreen = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      appID: '20640832b9d8393b',
      authKey: '6d6864b63a5445cbe75ab5bf98cc905269c84e24',
      region: 'us',
      uid: 'SUPERHERO1',
    },
  });
  const onSubmit = e => {
    console.log('submit', e);
    let appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(e.region)
      .autoEstablishSocketConnection(true)
      .build();
    CometChat.init(e.appID, appSetting).then(
      () => {
        console.log('Initialization Success');
        CometChat.login(e.uid, e.authKey).then(
          user => {
            console.log('Login Successful:', user);
            navigation.navigate('CallSettings', {data: e});
          },
          error => {
            console.log('Login failed with exception:', error);
          },
        );
      },
      error => {
        console.log('Initialization failed with error:', error);
      },
    );
  };
  return (
    <View>
      <CTextInput
        style={styles.input}
        control={control}
        rules={{
          required: true,
        }}
        label={'App ID'}
        name={'appID'}
        errors={errors}
      />

      <CTextInput
        style={styles.input}
        control={control}
        rules={{
          required: true,
        }}
        label={'Auth Key'}
        name={'authKey'}
        errors={errors}
      />

      <CTextInput
        style={styles.input}
        control={control}
        rules={{
          required: true,
        }}
        label={'Region'}
        name={'region'}
        errors={errors}
      />

      <CTextInput
        style={styles.input}
        control={control}
        rules={{
          required: true,
        }}
        label={'UID'}
        name={'uid'}
        errors={errors}
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
