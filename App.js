/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  AppState,
  BackHandler,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {usePipModeListener} from './usePipModuleListener';
import PipHandler from './PipHandler';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {CometChatRTC} from '@cometchat-pro/react-native-calls';

let sessionID = 'test121';
let audioOnly = false;
let defaultLayout = true;

let appID = '20640832b9d8393b';
let region = 'us';
var UID = 'SUPERHERO1';
var authKey = '6d6864b63a5445cbe75ab5bf98cc905269c84e24';

const App = () => {
  const [callSettings, setCallSettings] = useState();
  let appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(region)
    .autoEstablishSocketConnection(true)
    .build();

  const callListener = new CometChat.OngoingCallListener({
    onUserJoined: user => {
      console.log('user joined:', user);
    },
    onUserLeft: user => {
      console.log('user left:', user);
    },
    onUserListUpdated: userList => {
      console.log('user list:', userList);
    },
    onCallEnded: call => {
      console.log('Call ended:', call);
    },
    onError: error => {
      console.log('Call Error: ', error);
    },
    onAudioModesUpdated: audioModes => {
      console.log('audio modes:', audioModes);
    },
  });
  const setCallSetting = () => {
    let callSetting = new CometChat.CallSettingsBuilder()
      .enableDefaultLayout(defaultLayout)
      .setSessionID(sessionID)
      .setIsAudioOnlyCall(audioOnly)
      .setCallEventListener(callListener)
      .build();
    setCallSettings(callSetting);
  };
  useEffect(() => {
    CometChat.init(appID, appSetting).then(
      () => {
        console.log('Initialization completed successfully');
        CometChat.getLoggedinUser().then(
          user => {
            if (!user) {
              CometChat.login(UID, authKey).then(
                user => {
                  console.log('Login Successful:', user);
                  setCallSetting();
                },
                error => {
                  console.log('Login failed with exception:', error);
                },
              );
            } else {
              setCallSetting();
            }
          },
          error => {
            console.log('Something went wrong', error);
          },
        );
      },
      error => {
        console.log('Initialization failed with error:', error);
      },
    );
  }, []);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const inPipMode = usePipModeListener();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', status => {
      PipHandler.enterPipMode();
      CometChatRTC.enterPIPMode();
    });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress');
    };
  }, []);

  useEffect(() => {
    AppState.addEventListener('change', status => {
      if (status === 'background') {
        PipHandler.enterPipMode();
        CometChatRTC.enterPIPMode();
      }
      if (status === 'active') {
        CometChatRTC.exitPIPMode();
      }
    });
    return AppState.addEventListener('change').remove();
  }, []);

  useEffect(() => {
    PipHandler.onPipModeChanged(mode => {
      console.log('in mode', mode);
    });
  }, [inPipMode]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        <View style={{height: '100%', width: '100%', position: 'relative'}}>
          {callSettings && (
            <CometChat.CallingComponent callsettings={callSettings} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
