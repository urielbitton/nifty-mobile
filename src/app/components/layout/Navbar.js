import React from 'react'
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Image } from "react-native"
import logoOnly from '../../../../assets/logo-only-color.png'
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { colors } from "app/utils/colors";

export default function Navbar() {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.logoImg}
          source={logoOnly}
        />
      </View>
      <View style={styles.right}>
        <TouchableOpacity activeOpacity={0.6}>
          <Feather 
            name="bell" 
            size={22} 
            color={colors.primary} 
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6}>
          <Ionicons 
            name="ios-menu-outline" 
            size={26} 
            color={colors.primary} 
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.appBg,
    padding: 10,
    zIndex: 1000
  },
  logoImg: {
    width: 24,
    height: 24,
    objectFit: 'contain'
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 7
  }
})