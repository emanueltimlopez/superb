import React, { useEffect, useRef, useState } from "react"
import { StyleSheet, Dimensions, Text,Animated, View, Image, Easing } from "react-native"
import { ButtonComponent } from "../../components/button"
import { tokens } from "../../lib/tokens"
import ConfettiCannon from 'react-native-confetti-cannon';
import LottieView from "lottie-react-native";
const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export function FeedbackScreen({navigation, route}) {
  const [showImage, setShowImage] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const animationProgress = useRef(new Animated.Value(0));
  const confetti = useRef();

  const tokenId = route.params?.tokenId
  const dashTheme = route.params?.dashTheme

  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 2,
      duration: 2500,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start()
  }, []);

  return (
    <View style={styles.container}>
      <View>
        {!showImage && <AnimatedLottieView loop style={{
          alignSelf: 'center',
          height: 300,
          width: 300,
        }} progress={animationProgress.current} source={require("../../assets/animation.json")} />}
        {showImage && <Image source={tokens[dashTheme][tokenId]} style={{
          alignSelf: 'center',
          height: 200,
          width: 200,
          marginBottom: 40
        }} resizeMode='contain'/>}
      </View>
      <View style={{ position: 'absolute', top: windowHeight / 2 - 200, height: windowHeight - 200 }}>
        <ConfettiCannon autoStartDelay={1500} count={100} origin={{x: windowWidth / 2 - 20, y: 0}} onAnimationStart={ () => {
          setShowImage(true)
        }} onAnimationEnd={ () => {
          setShowButton(true)
        }}/>
      </View>

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
