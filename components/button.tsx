import React, { Children } from "react"
import { StyleSheet, View } from "react-native"
import Button from 'react-native-flat-button'

export function ButtonComponent({ onPress, text='', stylesProp = {}, disabled = false, children, background = "#9b59b6", border = "#8e44ad" }) {
  return (
    <View style={styles.buttonContainer}>
      <Button
        type="custom"
        onPress={() => onPress()}
        backgroundColor={background}
        borderColor={border}
        borderRadius={6}
        shadowHeight={8}
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