import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const BottomButton = ({onPress, label, customStyle = {}}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: '100%',
        backgroundColor: '#1a73e8',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        alignSelf: 'center',
        bottom: 15,
        ...customStyle,
      }}>
      <Text style={{color: '#fff', fontSize: 16, fontWeight: '600'}}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default BottomButton;

const styles = StyleSheet.create({});
