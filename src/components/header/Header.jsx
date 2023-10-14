import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';
import {TouchableOpacity} from 'react-native';
import Icons from '../../Utils/Icons';

const Header = ({headerTitle, callBack}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.headerBackImage} onPress={callBack}>
        <Image
          source={Icons.chevLeft}
          resizeMode="contain"
          style={styles.backIconImage}
        />
      </TouchableOpacity>
      <Text style={styles.headerText} numberOfLines={1} ellipsizeMode="tail">
        {headerTitle}
      </Text>
    </View>
  );
};

export default Header;
