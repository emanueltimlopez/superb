import React, { useCallback } from "react"
import { Linking, Pressable, StyleSheet, Text, View } from "react-native"
import { useLingui } from "@lingui/react"
import { t } from "@lingui/macro"

export function ConfigScreen({navigation, route}) {
  const { i18n } = useLingui()
  
  type OpenURLButtonProps = {
    url: string;
    children: string;
  }

  const OpenURLButton = ({url, children}: OpenURLButtonProps) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url)
  
      if (supported) {
        await Linking.openURL(url)
      }
    }, [url])
  
    return <Pressable onPress={handlePress}><Text style={{ fontSize: 16 }}>{children}</Text></Pressable>
  }

  return (
    <View style={styles.container}>
      <OpenURLButton url='https://www.okwombat.com/tyc'>{t(i18n)`Terms and Conditions`}</OpenURLButton>
      <OpenURLButton url='https://www.okwombat.com/politicas-de-privacidad'>{t(i18n)`Privacy Policy`}</OpenURLButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 30,
    gap: 20
  }
})
