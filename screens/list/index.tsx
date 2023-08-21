import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View, Image, Pressable } from "react-native"
import useData from "../../lib/data/useData"
import Button from 'react-native-flat-button'
import { ButtonComponent } from "../../components/button"

const themes = {
  'dinosaurs': require(`../../assets/themes/dinosaurs.png`),
  'transports': require(`../../assets/themes/transports.png`)
}

export function ListScreen({navigation, route}) {
  const { user, dashes } = useData()
  const userId = route.params?.userId || '1'
  
  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        {dashes && Object.keys(dashes).map(dashId => {
          const dash = dashes[dashId]
          return (<View style={styles.imageContainer} key={dashId}>
            <Pressable onPress={() => {navigation.navigate("Dash", {id : dashId})}}>
              <Text style={styles.objetiveText}>{dash.objetive}</Text>
              <Image source={themes[dash.theme]} style={{ alignSelf: 'center', height: 130, width: 200 }} resizeMode='contain'/>
            </Pressable>
          </View>)
        })}
      </View>
      <ButtonComponent text="Nuevo tablero" onPress={() => {
        navigation.navigate("NewDash")
      }}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 70
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  dashContainer: {

  },
  imageContainer: {
    width: '50%',
    height: 140,
    marginBottom: 20
  },
  objetiveText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 5
  }
})