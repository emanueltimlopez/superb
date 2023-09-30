import React, { useState } from "react"
import { StyleSheet, Dimensions, Text, View, Image } from "react-native"
import { useLingui } from "@lingui/react"
import { t } from "@lingui/macro"

import useData from "../../lib/data/useData"
import { ButtonComponent } from "../../components/button"
import { tokens } from "../../lib/tokens"

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export function DashScreen({navigation, route}) {
  const { i18n } = useLingui()

  const { user, getTokens, addToken, dashes } = useData()
  const [finish, setFinish] = useState(false)
  const dashId = route.params?.id
  const dash = dashes[dashId]
  const tokensList = getTokens(dashId)
  const spaces = dash.quantity
  const tokensOverflow = spaces > 12
  let imageHeight = (windowHeight - 200) / (tokensOverflow ? 6 : 4) - 20
  let imageWidth = windowWidth / (tokensOverflow ? 4 : 3) - 20

  if (windowWidth > 1100) {
    imageHeight = (windowHeight - 50) / (tokensOverflow ? 8 : 6) - 10
    imageWidth =  windowWidth / (tokensOverflow ? 4 : 4) - 10
  }

  const emptyTokens = Array.from({length: spaces - (tokensList?.length || 0)}, (v, index) => (index))
  const finalTokens = tokensList?.concat(emptyTokens) || emptyTokens

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <Text style={styles.reinceforment}>{t(i18n)`Let's work for`} {dash.reinforcement}</Text>

        {finalTokens.map((token, index) => {
          if (!token.date) {
            return (
              <Image 
                key={index}
                source={tokens[dash.theme].empty} 
                style={{
                  alignSelf: 'center',
                  height: imageHeight,
                  width: imageWidth
                }}
                resizeMode='contain'/>
            )
          }
          return (<View style={{
            width: imageWidth,
            height: imageHeight
          }} key={new Date(token.date).getTime()}>
            <Image source={tokens[dash.theme][token.id]} style={{
              alignSelf: 'center',
              height: imageHeight,
              width: imageWidth
            }} resizeMode='contain'/>
          </View>)
        })}
      </View>
      {tokensList?.length < dash.quantity && 
        <View style={styles.buttonContainer}>
          <ButtonComponent text={t(i18n)`You did!`} onPress={() => {
            const token = Math.floor(Math.random() * 6) + 1
            const isTheLast = (tokensList?.length + 1) === dash.quantity
            addToken(dashId, token)
            setFinish(true)
          }}/>
      </View>}
      {!(tokensList?.length < dash.quantity) && finish && 
        <View style={styles.buttonContainer}>
          <ButtonComponent background="#5eba7d" border="#2d5c3d" text={t(i18n)`Let's celebrate!`} onPress={() => {
            navigation.navigate("Feedback", { dashReinforcement: dash.reinforcement })
          }}/>
      </View>}
      {!(tokensList?.length < dash.quantity) && !finish && <Text style={styles.reinceforment}>{t(i18n)`Completed`}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 15
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  reinceforment: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    padding: 20,
    width: '100%',
  },
  text: {
    fontSize: 18,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    flex: 1,
    alignContent: 'flex-start'
  },
  emptyContainer: {
    borderWidth: 2,
    borderColor: '#999',
    borderRadius: 20,
    marginVertical: 10,
  },
  buttonContainer: {
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center'
  }
})