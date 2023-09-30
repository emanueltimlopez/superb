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

  type OpenURLButtonProps = {
    url: string;
    children: string;
  };

  const OpenURLButton = ({url, children}: OpenURLButtonProps) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);
  
      if (supported) {
        await Linking.openURL(url);
      }
    }, [url]);
  
    return <Pressable onPress={handlePress}><Text style={{ textAlign: 'center', fontSize: 12 }}>{children}</Text></Pressable>;
  };

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
      <View style={styles.buttonContainer}>
        <ButtonComponent stylesProp={{ height: 40, width: 200, textAlign: 'center' }} text={t(i18n)`New board`} onPress={() => {
          navigation.navigate("NewDash")
        }}/>
        <ButtonComponent stylesProp={{ height: 40 }} onPress={() => {
          navigation.navigate("Metrics")
        }}>
          <View style={{ paddingHorizontal: 5, paddingTop: 5 }}>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path d="M23 22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7956 2 19V1C2 0.734784 1.89464 0.48043 1.70711 0.292893C1.51957 0.105357 1.26522 0 1 0C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1L0 19C0.00158786 20.3256 0.528882 21.5964 1.46622 22.5338C2.40356 23.4711 3.6744 23.9984 5 24H23C23.2652 24 23.5196 23.8946 23.7071 23.7071C23.8946 23.5196 24 23.2652 24 23C24 22.7348 23.8946 22.4804 23.7071 22.2929C23.5196 22.1054 23.2652 22 23 22Z" fill="#fff"/>
              <Path d="M6 20C6.26521 20 6.51957 19.8946 6.7071 19.7071C6.89464 19.5196 7 19.2652 7 19V12C7 11.7348 6.89464 11.4804 6.7071 11.2929C6.51957 11.1054 6.26521 11 6 11C5.73478 11 5.48043 11.1054 5.29289 11.2929C5.10536 11.4804 5 11.7348 5 12V19C5 19.2652 5.10536 19.5196 5.29289 19.7071C5.48043 19.8946 5.73478 20 6 20Z" fill="#fff"/>
              <Path d="M10 10V19C10 19.2652 10.1054 19.5196 10.2929 19.7071C10.4804 19.8946 10.7348 20 11 20C11.2652 20 11.5196 19.8946 11.7071 19.7071C11.8947 19.5196 12 19.2652 12 19V10C12 9.73478 11.8947 9.48043 11.7071 9.29289C11.5196 9.10536 11.2652 9 11 9C10.7348 9 10.4804 9.10536 10.2929 9.29289C10.1054 9.48043 10 9.73478 10 10Z" fill="#fff"/>
              <Path d="M15 13V19C15 19.2652 15.1054 19.5196 15.2929 19.7071C15.4804 19.8946 15.7348 20 16 20C16.2652 20 16.5196 19.8946 16.7071 19.7071C16.8947 19.5196 17 19.2652 17 19V13C17 12.7348 16.8947 12.4804 16.7071 12.2929C16.5196 12.1054 16.2652 12 16 12C15.7348 12 15.4804 12.1054 15.2929 12.2929C15.1054 12.4804 15 12.7348 15 13Z" fill="#fff"/>
              <Path d="M20 9V19C20 19.2652 20.1054 19.5196 20.2929 19.7071C20.4804 19.8946 20.7348 20 21 20C21.2652 20 21.5196 19.8946 21.7071 19.7071C21.8947 19.5196 22 19.2652 22 19V9C22 8.73478 21.8947 8.48043 21.7071 8.29289C21.5196 8.10536 21.2652 8 21 8C20.7348 8 20.4804 8.10536 20.2929 8.29289C20.1054 8.48043 20 8.73478 20 9Z" fill="#fff"/>
              <Path d="M5.99979 8.99943C6.26498 8.99937 6.51929 8.89398 6.70679 8.70643L10.2928 5.12043C10.4834 4.93886 10.7365 4.83757 10.9998 4.83757C11.263 4.83757 11.5162 4.93886 11.7068 5.12043L13.8788 7.29243C14.4414 7.85484 15.2043 8.17079 15.9998 8.17079C16.7953 8.17079 17.5582 7.85484 18.1208 7.29243L23.7068 1.70643C23.8889 1.51783 23.9897 1.26523 23.9875 1.00303C23.9852 0.740833 23.88 0.49002 23.6946 0.304612C23.5092 0.119204 23.2584 0.014035 22.9962 0.0117566C22.734 0.00947813 22.4814 0.110273 22.2928 0.292431L16.7068 5.87743C16.5193 6.0649 16.265 6.17022 15.9998 6.17022C15.7346 6.17022 15.4803 6.0649 15.2928 5.87743L13.1208 3.70643C12.5582 3.14402 11.7953 2.82807 10.9998 2.82807C10.2043 2.82807 9.44137 3.14402 8.87879 3.70643L5.29279 7.29243C5.15298 7.43228 5.05777 7.61045 5.0192 7.8044C4.98064 7.99835 5.00044 8.19939 5.07611 8.38208C5.15178 8.56478 5.27992 8.72095 5.44433 8.83083C5.60874 8.94072 5.80204 8.99939 5.99979 8.99943V8.99943Z" fill="#fff"/>
            </Svg>
          </View>
        </ButtonComponent>
      </View>
      <View style={styles.tyc}>
        <OpenURLButton url='https://www.okwombat.com/tyc'>{t(i18n)`Terms and Conditions`}</OpenURLButton>
        <OpenURLButton url='https://www.okwombat.com/politicas-de-privacidad'>{t(i18n)`Privacy Policy`}</OpenURLButton>
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
  tyc: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 20
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