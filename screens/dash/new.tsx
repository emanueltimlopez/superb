import React, { useState } from "react"
import { StyleSheet, Text, View, Image, Pressable, TextInput } from "react-native"
import { v1 as uuidv1 } from 'uuid';
import { useLingui } from "@lingui/react";
import { t } from "@lingui/macro";

import useData from "../../lib/data/useData";
import { ButtonComponent } from "../../components/button";

const themes = [
  {
    id: 'dinosaurs',
    image: require(`../../assets/tokens/dinosaurs/1.png`)
  },
  {
    id: 'transports',
    image: require(`../../assets/tokens/transports/1.png`)
  },
  {
    id: 'farm',
    image: require(`../../assets/tokens/farm/5.png`)
  }
]

export function NewDashScreen({navigation, route}) {
  const { i18n } = useLingui()
  const { user, addDash } = useData()
  const [objetive, setObjetive] = useState('')
  const [reinforcement, setReinforcement] = useState('')
  const [quantity, setQuantity] = useState('')
  const [selectedTheme, setSelectedTheme] = useState('')

  const disabled = !objetive || !selectedTheme || !quantity || !reinforcement

  return (
    <View style={styles.container}>
      <View style={styles.optionsContainer}>
        <Text style={styles.label}>{t(i18n)`What do you want to achieve?`}</Text>
        <TextInput multiline placeholder={t(i18n)`Goal`} style={styles.input} value={objetive} onChangeText={(value) => setObjetive(value)}/>
        <Text style={styles.label}>{t(i18n)`Which is the prize?`}</Text>
        <TextInput placeholder={t(i18n)`Reinforcement`} style={styles.input} value={reinforcement} onChangeText={(value) => setReinforcement(value)}/>
        <Text style={styles.label}>{t(i18n)`Select a theme`}</Text>
        <View style={styles.listThemes}>
          {themes.map(theme => (
            <Pressable key={theme.id} onPress={() => {setSelectedTheme(theme.id)}} style={selectedTheme === theme.id ? styles.selectedTheme : {}}>
              <Image source={theme.image} style={{ alignSelf: 'center', height: 100, width: 100 }} resizeMode='contain'/>
            </Pressable>
          ))}
        </View>
        <Text style={styles.label}>{t(i18n)`Quantity of tokens`}</Text>
        <TextInput keyboardType="numeric" placeholder={t(i18n)`Quantity`} style={styles.input} value={quantity} onChangeText={(value) => setQuantity(value)}/>
      </View>
      <View style={styles.buttonContainer}>
        <ButtonComponent stylesProp={styles.button} disabled={disabled} text={t(i18n)`Create`} onPress={() => 
          { 
            if (!disabled) {
              const id = uuidv1()
              const dash = { id, objetive, theme: selectedTheme, tokens: [], quantity: parseInt(quantity), reinforcement }
              addDash(dash)
              navigation.replace("Dash", {id})
            }
          }}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 40,
    alignItems: 'center'
  },
  listThemes: {
    flexDirection: 'row'
  },
  input: {
    padding: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 10,
  },
  label: {
    fontSize: 18,
    paddingVertical: 5,
    marginTop: 10,
    fontWeight: 'bold'
  },
  selectedTheme: {
    borderWidth: 5,
    borderColor: '#000',
    borderRadius: 10
  },
  optionsContainer: {
    maxWidth: 600,
    width: "100%",
  },
  buttonContainer: {
    marginTop: 20,
    maxWidth: 600,
    width: "100%",
  },
})