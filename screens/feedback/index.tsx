import React, { useEffect, useRef, useState } from "react"
import { StyleSheet, Dimensions, Text,Animated, View, Image } from "react-native"
import { ButtonComponent } from "../../components/button"
import { tokens } from "../../lib/tokens"
import ConfettiCannon from 'react-native-confetti-cannon';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export function FeedbackScreen({navigation, route}) {
  const [showImage, setShowImage] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const startValue = useRef(new Animated.Value(0)).current;
  const endValue = 0.8;
  const duration = 2000;

  const tokenId = route.params?.tokenId
  const dashTheme = route.params?.dashTheme

  useEffect(() => {
    Animated.timing(startValue, {
      toValue: endValue,
      duration: duration,
      useNativeDriver: true,
    }).start(() => {
      setShowConfetti(true)
      Animated.timing(startValue, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start()
    })
  }, [startValue]);

  return (
    <View style={styles.container}>
      {showImage && <Image source={tokens[dashTheme][tokenId]} style={{
          alignSelf: 'center',
          height: 200,
          width: 200,
          marginBottom: 40
        }} resizeMode='contain'/>}
      {showConfetti &&  <ConfettiCannon count={100} origin={{x: windowWidth / 2 - 20, y: windowHeight / 2}} onAnimationStart={ () => {
        setShowImage(true)
      }} onAnimationEnd={ () => {
        setShowButton(true)
      }}/>}
      {!showImage && <Animated.View
          style={{transform: [{scale: startValue}]}}>
          <Image source={require('../../assets/empty.png')} style={{
            alignSelf: 'center',
            height: 200,
            width: 200,
            marginBottom: 40
          }} resizeMode='contain'/>
        </Animated.View>}

      {showButton && <ButtonComponent text="¡Vamos por más!" onPress={() => {
        navigation.goBack()
      }}/>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5eba7d',
    paddingHorizontal: 20,
    paddingBottom: 5,
    paddingTop: windowHeight / 2 - 200
  },
})
