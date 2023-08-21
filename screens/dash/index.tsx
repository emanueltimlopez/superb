import React, { useState } from "react"
import { StyleSheet, Text, View, Image } from "react-native"
import useData from "../../lib/data/useData"
import Button from 'react-native-flat-button'
import { ButtonComponent } from "../../components/button"

const tokens = {
  dinosaurs: {
    1: require(`../../assets/tokens/dinosaurs/1.png`),
    2: require(`../../assets/tokens/dinosaurs/2.png`),
    3: require(`../../assets/tokens/dinosaurs/3.png`),
    4: require(`../../assets/tokens/dinosaurs/4.png`),
    5: require(`../../assets/tokens/dinosaurs/5.png`),
    6: require(`../../assets/tokens/dinosaurs/6.png`)
  },
  transports: {
    1: require(`../../assets/tokens/transports/1.png`),
    2: require(`../../assets/tokens/transports/2.png`),
    3: require(`../../assets/tokens/transports/3.png`),
    4: require(`../../assets/tokens/transports/4.png`),
    5: require(`../../assets/tokens/transports/5.png`),
    6: require(`../../assets/tokens/transports/6.png`)
  }
}

export function DashScreen({navigation, route}) {
  const { user, getTokens, addToken, dashes } = useData()
  const dashId = route.params?.id
  const dash = dashes[dashId]
  const tokensList = getTokens(dashId)
  const emptyTokens = Array.from({length: 12 - (tokensList?.length || 0)}, (v, index) => (index))
  const finalTokens = tokensList?.concat(emptyTokens) || emptyTokens

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        {finalTokens.map(token => {
          if (!token.date) {
            return (
              <View style={styles.emptyContainer} key={token}>
              </View>
            )
          }
          return (<View style={styles.imageContainer} key={new Date(token.date).getTime()}>
            <Image source={tokens[dash.theme][token.id]} style={{ alignSelf: 'center', height: 150, width: 150 }} resizeMode='contain'/>
          </View>)
        })}
      </View>
      <ButtonComponent text="¡Lo lograste!" onPress={() => {
        const token = Math.floor(Math.random() * 6) + 1
        addToken(dashId, token)
      }}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 5
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
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: 110,
    height: 140
  },
  emptyContainer: {
    width: 110,
    height: 110,
    borderWidth: 2,
    borderColor: '#999',
    borderRadius: 20,
    marginVertical: 10,
  }
})