import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import CTextInput from '../Components/Shared/CTextInput';
import {useForm} from 'react-hook-form';
import {CometChat} from '@cometchat-pro/react-native-chat';
import BottomButton from '../Components/Shared/BottomButton';

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

  const requestMicPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Mic Permission',
          message: 'Needs access to your Microphone ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Mic');
      } else {
        console.log('Mic permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Camera Permission',
          message: 'Needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    if (Platform.OS === 'android') {
      requestCameraPermission();
      requestMicPermission();
    }
  }, []);
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
    <View style={styles.container}>
      <Text style={styles.title}>App Settings</Text>

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
      <BottomButton onPress={handleSubmit(onSubmit)} label={'Submit'} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
  },
});
