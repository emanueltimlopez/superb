import React, { useState } from "react"
import { StyleSheet, Text, View, Image, Pressable, TextInput } from "react-native"
import Button from 'react-native-flat-button'
import { v1 as uuidv1 } from 'uuid';
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
  }
]

export function NewDashScreen({navigation, route}) {
  const { user, addDash } = useData()
  const [objetive, setObjetive] = useState('')
  const [selectedTheme, setSelectedTheme] = useState('')

  return (
    <View style={styles.container}>
      <View style={styles.optionsContainer}>
        <Text style={styles.label}>¿Que se quiere lograr?</Text>
        <TextInput placeholder="Objetivo" style={styles.input} value={objetive} onChangeText={(value) => setObjetive(value)}/>
        <Text style={styles.label}>Selecciona un tema</Text>
        <View style={styles.listThemes}>
          {themes.map(theme => (
            <Pressable key={theme.id} onPress={() => {setSelectedTheme(theme.id)}} style={selectedTheme === theme.id ? styles.selectedTheme : {}}>
              <Image source={theme.image} style={{ alignSelf: 'center', height: 150, width: 150 }} resizeMode='contain'/>
            </Pressable>
          ))}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <ButtonComponent stylesProp={styles.button} text="Crear" onPress={() => 
          { 
            if (objetive && selectedTheme) {
              const id = uuidv1()
              const dash = { id, objetive, theme: selectedTheme, tokens: [] }
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
    padding: 20,
  },
  listThemes: {
    flexDirection: 'row'
  },
  input: {
    padding: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 10
  },
  label: {
    fontSize: 18,
    paddingVertical: 5,
    marginTop: 20,
    fontWeight: 'bold'
  },
  selectedTheme: {
    borderWidth: 5,
    borderColor: '#000',
    borderRadius: 10
  },
  optionsContainer: {
  },
  buttonContainer: {
    marginTop: 50
  },
})