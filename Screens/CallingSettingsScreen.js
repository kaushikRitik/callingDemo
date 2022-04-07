import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CCheckBox from '../Components/Shared/CCheckBox';
import CTextInput from '../Components/Shared/CTextInput';
import {useForm} from 'react-hook-form';
import CRadioButton from '../Components/Shared/CRadioButton';

const CallingSettingsScreen = ({navigation, route}) => {
  console.log('route', route.params.data);
  const [isSingleMode, setIsSingleMode] = useState(false);
  const [isAudioOnlyCall, setIsAudioOnlyCall] = useState(false);
  const [showMuteAudioButton, setShowMuteAudioButton] = useState(true);
  const [showSwitchToVideoCallButton, setShowSwitchToVideoCallButton] =
    useState(true);
  const [showEndCallButton, setShowEndCallButton] = useState(true);
  const [showCallRecordingButton, setShowCallRecordingButton] = useState(true);
  const [showPauseVideoButton, setShowPauseVideoButton] = useState(true);
  const [showSwitchCameraButton, setShowSwitchCameraButton] = useState(true);
  const [hideVideoSwitchButton, setHideVideoSwitchButton] = useState(false);
  const [showAudioModeButton, setShowAudioModeButton] = useState(true);
  const [startWithVideoMuted, setStartWithVideoMuted] = useState(true);
  const [startWithAudioMuted, setStartWithAudioMuted] = useState(true);
  const [enableDefaultLayout, setEnableDefaultLayout] = useState(true);
  const [startRecordingOnCallStart, setStartRecordingOnCallStart] =
    useState(false);
  const [sessionID, setSessionID] = useState('');

  const [mode, setMode] = useState('default');

  const onSubmit = () => {
    navigation.navigate('CallingScreen', {
      data: {
        ...route.params.data,
        enableDefaultLayout,
        startRecordingOnCallStart,
        startWithAudioMuted,
        startWithVideoMuted,
        showAudioModeButton,
        hideVideoSwitchButton,
        showPauseVideoButton,
        showSwitchCameraButton,
        showCallRecordingButton,
        showEndCallButton,
        showSwitchToVideoCallButton,
        showMuteAudioButton,
        isAudioOnlyCall,
        isSingleMode,
        mode,
        sessionID,
      },
    });
  };

  return (
    <View>
      <ScrollView>
        <Text style={styles.text}>Session ID</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setSessionID(text)}
          value={sessionID}
        />
        <Text style={styles.title}>Call Settings</Text>
        <CCheckBox
          ischecked={enableDefaultLayout}
          onStatusChanges={e => {
            setEnableDefaultLayout(e);
          }}
          label={'EnableDefaultLayout'}
        />
        <CCheckBox
          ischecked={isSingleMode}
          onStatusChanges={e => {
            setIsSingleMode(e);
          }}
          label={'IsSingleMode'}
        />
        <CCheckBox
          ischecked={isAudioOnlyCall}
          onStatusChanges={e => {
            setIsAudioOnlyCall(e);
          }}
          label={'IsAudioOnly'}
        />
        <CCheckBox
          ischecked={showMuteAudioButton}
          onStatusChanges={e => {
            setShowMuteAudioButton(e);
          }}
          label={'ShowMuteAudioButton'}
        />
        <CCheckBox
          ischecked={showSwitchToVideoCallButton}
          onStatusChanges={e => {
            setShowSwitchToVideoCallButton(e);
          }}
          label={'ShowSwitchToVideoCallButton'}
        />

        <CCheckBox
          ischecked={showEndCallButton}
          onStatusChanges={e => {
            setShowEndCallButton(e);
          }}
          label={'ShowEndCallButton'}
        />
        <CCheckBox
          ischecked={showPauseVideoButton}
          onStatusChanges={e => {
            setShowPauseVideoButton(e);
          }}
          label={'ShowPauseVideoButton'}
        />
        <CCheckBox
          ischecked={showSwitchCameraButton}
          onStatusChanges={e => {
            setShowSwitchCameraButton(e);
          }}
          label={'showSwitchCameraButton'}
        />
        <CCheckBox
          ischecked={hideVideoSwitchButton}
          onStatusChanges={e => {
            setHideVideoSwitchButton(e);
          }}
          label={'HideVideoSwitchButton'}
        />
        <CCheckBox
          ischecked={showAudioModeButton}
          onStatusChanges={e => {
            setShowAudioModeButton(e);
          }}
          label={'ShowAudioModeButton'}
        />
        <CCheckBox
          ischecked={showCallRecordingButton}
          onStatusChanges={e => {
            setShowCallRecordingButton(e);
          }}
          label={'ShowCallRecordingButton'}
        />

        <CCheckBox
          ischecked={startRecordingOnCallStart}
          onStatusChanges={e => {
            setStartRecordingOnCallStart(e);
          }}
          label={'StartRecordingOnCallStart'}
        />

        <CCheckBox
          ischecked={startWithAudioMuted}
          onStatusChanges={e => {
            setStartWithAudioMuted(e);
          }}
          label={'StartWithAudioMuted'}
        />

        <CCheckBox
          ischecked={startWithVideoMuted}
          onStatusChanges={e => {
            setStartWithVideoMuted(e);
          }}
          label={'StartWithVideoMuted'}
        />
        <Text style={styles.label}>Mode</Text>
        <View>
          <CRadioButton
            isChecked={mode === 'default'}
            label={'Default'}
            onStatusChanges={e => {
              setMode(e ? 'default' : 'SPOTLIGHT');
            }}
          />
          <CRadioButton
            isChecked={mode === 'SPOTLIGHT'}
            label={'Spotlight'}
            onStatusChanges={e => {
              setMode(e ? 'SPOTLIGHT' : 'default');
            }}
          />
        </View>
        <Button title="Submit" onPress={onSubmit} />
      </ScrollView>
    </View>
  );
};

export default CallingSettingsScreen;

const styles = StyleSheet.create({
  title: {fontSize: 14, fontWeight: '500', margin: 10},
  label: {fontSize: 18, marginLeft: 10},
  input: {
    height: 40,
    marginTop: 5,
    borderWidth: 0.2,
    padding: 10,
    borderRadius: 5,
  },
});
