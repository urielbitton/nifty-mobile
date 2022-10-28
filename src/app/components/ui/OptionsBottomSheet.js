import { AntDesign } from "@expo/vector-icons"
import { BottomSheet, Button, ListItem } from "@rneui/base"
import React from 'react'
import { Text } from "react-native"
import { View } from "react-native"
import { StyleSheet } from "react-native"
import IconContainer from "./IconContainer"

export default function OptionsBottomSheet(props) {

  const { items, showSheet, setShowSheet,
    sheetTitle = "Select an option" } = props

  const itemsRender = items?.map((item, index) => {
    return <ListItem
      key={index}
      containerStyle={[styles.itemContainerStyle, index === items.length - 1 ? styles.lastItemStyle : null]}
    >
      <Button
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        titleStyle={styles.btnText}
        title={item.title}
        onPress={() => item.onPress()}
        icon={item.icon}
      />
    </ListItem>
  })

  return (
    <BottomSheet
      modalProps={{}}
      isVisible={showSheet}
      onBackdropPress={() => setShowSheet(false)}
      backdropStyle={styles.backdrop}
    >
      <View style={styles.content}>
        <View style={styles.titleSection}>
          <Text style={styles.sheetTitle}>
            {sheetTitle}
          </Text>
          <IconContainer
            width={30}
            height={30}
            backgroundColor="#eee"
            borderRadius={30}
            IconComponent={AntDesign}
            iconName="close"
            iconSize={20}
            iconColor="#777"
            onPress={() => setShowSheet(false)}
          />
        </View>
        <View style={styles.actionSection}>
          {itemsRender}
        </View>
      </View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(110, 122, 138, 0.5)',
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 25
  },
  titleSection: {
    padding: 20,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  actionSection: {
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  itemContainerStyle: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginBottom: 5,
    padding: 0
  },
  lastItemStyle: {
    borderBottomWidth: 0,
  },
  btnContainer: {
    borderRadius: 10,
    width: '100%',
  },
  btn: {
    padding: 20,
    width: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
  },
  btnText: {
    color: '#333',
  }
})
