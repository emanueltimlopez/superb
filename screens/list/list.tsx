import React, { useCallback, useEffect, useState } from "react"
import { StyleSheet, Text, View, Image, Pressable, Linking, Alert, Modal, Dimensions } from "react-native"
import MasonryList from '@react-native-seoul/masonry-list';
import Svg, { Path } from "react-native-svg"
import * as SplashScreen from 'expo-splash-screen';
import Button from 'react-native-flat-button'
import { useLingui } from "@lingui/react";
import { t } from "@lingui/macro";

import useData from "../../lib/data/useData"
import { ButtonComponent } from "../../components/button"

const themes = {
  'dinosaurs': require(`../../assets/themes/dinosaurs.png`),
  'transports': require(`../../assets/themes/transports.png`),
  'farm': require(`../../assets/themes/farm.png`)
}

const windowWidth = Dimensions.get("window").width;

SplashScreen.preventAutoHideAsync();

export function ListScreen({navigation, route}) {
  const { i18n } = useLingui()

  const { dashes, hideDash } = useData()
  const [appIsReady, setAppIsReady] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [removeDash, setRemoveDash] = useState('');

  useEffect(() => {
    async function prepare() {
      setAppIsReady(true)
    }
    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const dashesReversed = Object.keys(dashes).reverse().filter(d => !dashes[d].hide)
  
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.listContainer}>
        <MasonryList
          data={dashesReversed}
          keyExtractor={({item}): string => item}
          numColumns={windowWidth > 1100 ? 5 : 2}
          showsVerticalScrollIndicator={true}
          renderItem={({item}) => {
            const dash = dashes[item]
            return (
              <View style={styles.imageContainer} key={item}>
                <Pressable onPress={() => {navigation.navigate("Dash", {id: item})}} onLongPress={() => {
                  setRemoveDash(dash)
                  setModalVisible(true)
                }}>
                  <Text style={styles.objetiveText}  numberOfLines={4} ellipsizeMode='tail'>{dash.objetive}</Text>
                  <Image source={themes[dash.theme]} style={{ width: "100%", height: 150 }} resizeMode='contain'/>
                </Pressable>
              </View>
            )
          }}
        />
      </View>

      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
          <View style={styles.modal}>
            <Text style={styles.textModal}>{t(i18n)`Remove board?`}</Text>
            <Button
              type="custom"
              onPress={() => {
                hideDash(removeDash)
                setModalVisible(!modalVisible)
              }}
              backgroundColor={"#EE7674"}
              borderColor={"#EE4B48"}
              borderRadius={6}
              shadowHeight={8}
              activeOpacity={0.5}
              contentStyle={styles.modalButton}
            >
              {t(i18n)`Remove`}
            </Button>
            <Button
              type="custom"
              onPress={() => setModalVisible(!modalVisible)}
              backgroundColor={'#9b59b6'}
              borderColor={"#8e44ad"}
              borderRadius={6}
              shadowHeight={8}
              activeOpacity={0.5}
              contentStyle={styles.modalButton}
            >
              {t(i18n)`Cancel`}
            </Button>
          </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
  },
  listContainer: {
    flex: 1
  },
  dashContainer: {

  },
  imageContainer: {

  },
  buttonContainer: {
    paddingTop: 20,
    flexDirection: 'row',
    gap: 30,
    justifyContent: 'center'
  },
  objetiveText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingHorizontal: 5
  },
  modalButton: {
    padding: 10,
  },
  textModal: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    padding: 20
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 60,
    gap: 20
  }
})