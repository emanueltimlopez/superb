import React, { Children } from "react"
import { StyleSheet, View } from "react-native"
import Button from 'react-native-flat-button'

export function ButtonComponent({ onPress, text='', stylesProp = {}, children }) {
  return (
    <View style={styles.buttonContainer}>
      <Button
        type="custom"
        onPress={() => onPress()}
        backgroundColor={"#9b59b6"}
        borderColor={"#8e44ad"}
        borderRadius={6}
        shadowHeight={8}
        activeOpacity={0.5}
        contentStyle={[styles.button, stylesProp]}
      >
        {text && text}
        {children && children}
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 5,
    fontSize: 22,
    fontWeight: '900'
  },
  buttonContainer: {

  }
})