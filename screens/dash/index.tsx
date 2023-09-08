import React, { useState } from "react"
import { StyleSheet, Dimensions, Text, View, Image } from "react-native"
import useData from "../../lib/data/useData"
import { ButtonComponent } from "../../components/button"
import { tokens } from "../../lib/tokens"

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export function DashScreen({navigation, route}) {
  const { user, getTokens, addToken, dashes } = useData()
  const [finish, setFinish] = useState(false)
  const dashId = route.params?.id
  const dash = dashes[dashId]
  const tokensList = getTokens(dashId)
  const spaces = dash.quantity
  const tokensOverflow = spaces > 12
  const imageHeight = (windowHeight - 200) / (tokensOverflow ? 6 : 4) - 20
  const imageWidth = windowWidth / (tokensOverflow ? 4 : 3) - 20

  const emptyTokens = Array.from({length: spaces - (tokensList?.length || 0)}, (v, index) => (index))
  const finalTokens = tokensList?.concat(emptyTokens) || emptyTokens

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <Text style={styles.reinceforment}>Vamos a trabajar por {dash.reinforcement}</Text>

        {finalTokens.map(token => {
          if (!token.date) {
            return (
              <Image source={tokens[dash.theme].empty} style={{
                alignSelf: 'center',
                height: imageHeight,
                width: imageWidth
              }} resizeMode='contain'/>
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
      {tokensList?.length < dash.quantity && <ButtonComponent text="¡Lo lograste!" onPress={() => {
        const token = Math.floor(Math.random() * 6) + 1
        const isTheLast = (tokensList?.length + 1) === dash.quantity
        addToken(dashId, token)
        setFinish(true)
      }}/>}
      {!(tokensList?.length < dash.quantity) && finish && <ButtonComponent background="#5eba7d" border="#2d5c3d" text="¡Festejemos!" onPress={() => {
        navigation.navigate("Feedback", { dashReinforcement: dash.reinforcement })
      }}/>}
      {!(tokensList?.length < dash.quantity) && !finish && <Text style={styles.reinceforment}>Completado</Text>}
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
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  emptyContainer: {
    borderWidth: 2,
    borderColor: '#999',
    borderRadius: 20,
    marginVertical: 10,
  }
})