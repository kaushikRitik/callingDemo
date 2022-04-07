import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Checked from '../../assets/checked_radio.png';
import UnChecked from '../../assets/unchecked_radio.png';
const CRadioButton = ({
  isChecked = false,
  onStatusChanges = () => null,
  label,
}) => {
  const onPressed = () => {
    onStatusChanges(!isChecked);
  };
  return (
    <TouchableOpacity onPress={onPressed} style={styles.container}>
      <View onPress={onPressed}>
        {isChecked ? (
          <Image source={Checked} style={styles.icon} />
        ) : (
          <Image source={UnChecked} style={styles.icon} />
        )}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CRadioButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginVertical: 5,
  },
  icon: {height: 25, width: 30},
  label: {fontSize: 18, marginLeft: 10},
});
