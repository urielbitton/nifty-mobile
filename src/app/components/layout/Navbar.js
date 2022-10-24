import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import { Image } from "react-native"
import logoOnly from '../../../../assets/logo-only.png'
import { MaterialCommunityIcons } from '@expo/vector-icons'

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
          <MaterialCommunityIcons 
            name="bell" 
            size={24} 
            color="black" 
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6}>
          <MaterialCommunityIcons 
            name="menu" 
            size={24} 
            color="black" 
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
    backgroundColor: '#fff',
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