import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Checked from '../../assets/checked_checkbox.png';
import UnChecked from '../../assets/unchecked_checkbox.png';
const CCheckBox = ({
  ischecked = false,
  onStatusChanges = () => null,
  label,
}) => {
  const onPressed = () => {
    onStatusChanges(!ischecked);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressed}>
        {ischecked ? (
          <Image source={Checked} style={styles.icon} />
        ) : (
          <Image source={UnChecked} style={styles.icon} />
        )}
      </TouchableOpacity>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default CCheckBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginVertical: 5,
  },
  icon: {height: 20, width: 20},
  label: {fontSize: 18, marginLeft: 10},
});
