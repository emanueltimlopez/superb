import React, { useEffect, useRef, useState } from "react"
import { StyleSheet, Dimensions, Text,Animated, View, Image, Easing } from "react-native"
import { useLingui } from "@lingui/react";
import { t } from "@lingui/macro";
import ConfettiCannon from 'react-native-confetti-cannon';
import LottieView from "lottie-react-native";

import { ButtonComponent } from "../../components/button"

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export function FeedbackScreen({navigation, route}) {
  const { i18n } = useLingui()
  const [showImage, setShowImage] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const animationProgress = useRef(new Animated.Value(0));

  const dashReinforcement = route.params?.dashReinforcement

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
        {showImage && <Text style={styles.reinceforment}>{t(i18n)`You won`} {dashReinforcement}</Text>}
      </View>
      <View style={{ position: 'absolute', top: windowHeight / 2 - 200, height: windowHeight - 200 }}>
        <ConfettiCannon autoStartDelay={1500} count={100} origin={{x: windowWidth / 2 - 20, y: 0}} onAnimationStart={ () => {
          setShowImage(true)
        }} onAnimationEnd={ () => {
          setShowButton(true)
        }}/>
      </View>

      {showButton && 
        <View style={styles.buttonContainer}>
          <ButtonComponent text={t(i18n)`Let's go for more!`} onPress={() => {
            navigation.goBack()
          }}/>
        </View>}
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
  reinceforment: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    padding: 20,
    width: '100%',
    color: '#fff',
    paddingBottom: 50
  },
  buttonContainer: {
    marginTop: 80,
    maxWidth: 600,
    width: "100%",
    alignSelf: 'center'
  },
})
