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
import {usePipModeListener} from '../usePipModuleListener';
import PipHandler from '../PipHandler';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {CometChatRTC} from '@cometchat-pro/react-native-calls';

const CallingScreen = ({navigation, route}) => {
  let params = route.params.data;
  let callSettings = new CometChat.CallSettingsBuilder()
    .enableDefaultLayout(params?.enableDefaultLayout)
    .setSessionID(params.sessionID)
    .setIsAudioOnlyCall(params.isAudioOnlyCall)
    .setMode(params.mode)
    .showAudioModeButton(params.showAudioModeButton)
    .showEndCallButton(params.showEndCallButton)
    .showMuteAudioButton(params.showMuteAudioButton)
    .showPauseVideoButton(params.showPauseVideoButton)
    .showSwitchCameraButton(params.showSwitchCameraButton)
    .startWithAudioMuted(params.startWithAudioMuted)
    .startWithVideoMuted(params.startWithVideoMuted)
    .setCallEventListener(callListener)
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

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const inPipMode = usePipModeListener();

  useEffect(() => {
    AppState.addEventListener('change', status => {
      if (status === 'background') {
        if (!navigation.isFocused()) return;
        PipHandler.enterPipMode();
        CometChatRTC.enterPIPMode();
      }
      if (status === 'active') {
        CometChatRTC.exitPIPMode();
      }
    });
  }, []);

  useEffect(() => {
    PipHandler.onPipModeChanged(mode => {
      console.log('in mode', mode);
    });
  }, [inPipMode]);

  return (
    <SafeAreaView style={backgroundStyle}>
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
export default CallingScreen;
