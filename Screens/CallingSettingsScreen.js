import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CCheckBox from '../Components/Shared/CCheckBox';
import CRadioButton from '../Components/Shared/CRadioButton';
import downArrow from '../assets/down-arrow.png';
import rightArrow from '../assets/right-arrow.png';
import BottomButton from '../Components/Shared/BottomButton';

const CallingSettingsScreen = ({navigation, route}) => {
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
  const [isAdditionalSetting, setIsAdditionalSetting] = useState(false);

  const [mode, setMode] = useState('default');
  const [avatarMode, setAvatarMode] = useState('default');
  const [sessionIDError, setSessionIDError] = useState(false);

  const onSubmit = () => {
    if (sessionID === '' || !sessionID) {
      setSessionIDError(true);
      return;
    }
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
        sessionID: sessionID?.toLocaleLowerCase(),
        avatarMode,
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Call Settings</Text>

      <Text style={styles.text}>Session ID</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => {
          if (sessionIDError) setSessionIDError(false);
          setSessionID(text);
        }}
        value={sessionID}
      />
      {sessionIDError && (
        <Text style={{color: 'crimson', fontSize: 12}}>This is Required</Text>
      )}
      <View style={styles.additionalSettingContainer}>
        <TouchableOpacity
          style={styles.additionalSettingHeader}
          onPress={() => {
            setIsAdditionalSetting(prev => !prev);
          }}>
          <Text style={styles.title2}>Additional Settings</Text>
          {isAdditionalSetting ? (
            <Image source={downArrow} style={styles.arrowIcon} />
          ) : (
            <Image source={rightArrow} style={styles.arrowIcon} />
          )}
        </TouchableOpacity>
        {isAdditionalSetting && (
          <View style={{marginTop: 10}}>
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
            <Text style={styles.title2}>Mode</Text>
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
            <Text style={styles.title2}>Avatar Mode</Text>
            <View>
              <CRadioButton
                isChecked={avatarMode === 'default'}
                label={'Default'}
                onStatusChanges={e => {
                  if (e) setAvatarMode('default');
                }}
              />
              <CRadioButton
                isChecked={avatarMode === 'square'}
                label={'Square'}
                onStatusChanges={e => {
                  if (e) setAvatarMode('square');
                }}
              />
              <CRadioButton
                isChecked={avatarMode === 'fullscreen'}
                label={'FullScreen'}
                onStatusChanges={e => {
                  if (e) setAvatarMode('fullscreen');
                }}
              />
            </View>
          </View>
        )}
      </View>
      <BottomButton
        customStyle={{position: 'relative', marginTop: 18, marginBottom: 25}}
        label={'Submit'}
        onPress={onSubmit}
      />
    </ScrollView>
  );
};

export default CallingSettingsScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
  },
  label: {fontSize: 18, marginLeft: 10},
  input: {
    height: 40,
    marginTop: 5,
    borderWidth: 0.2,
    padding: 10,
    borderRadius: 5,
  },
  container: {
    paddingTop: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  additionalSettingContainer: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 4,
    borderWidth: 0.2,
    paddingVertical: 10,
  },
  title2: {fontSize: 15},
  additionalSettingHeader: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  arrowIcon: {height: 25, width: 25, marginRight: 5},
});
