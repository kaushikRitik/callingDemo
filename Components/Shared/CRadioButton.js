import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Checked from '../../assets/checked_radio.png';
import UnChecked from '../../assets/unchecked_radio.png';
const CRadioButton = ({
  isChecked = false,
  onStatusChanges = () => null,
  label,
}) => {
  //   const [isChecked, setIsChecked] = useState(ischecked);
  const onPressed = () => {
    // setIsChecked(prev => {
    onStatusChanges(!isChecked);
    //   return !prev;
    // });
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
  icon: {height: 20, width: 20},
  label: {fontSize: 18, marginLeft: 10},
});
