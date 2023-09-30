import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { ListScreen } from '../../screens/list/list';
import { t } from "@lingui/macro";
import { useLingui } from '@lingui/react';
import { Path, Svg } from 'react-native-svg';
import { MetricsIcon } from '../../lib/icons/metrics';
import { PlusIcon } from '../../lib/icons/plus';
import { ConfigIcon } from '../../lib/icons/config';

const Tab = createBottomTabNavigator();
function Empty() {
  return (<></>)
}

export function TabsNavigation() {
  const { i18n } = useLingui()

  return (
    <Tab.Navigator id='Primary' screenOptions={({ route, navigation }) => ({
      headerShadowVisible: false,
      headerShown: false,
      title: '',
      tabBarShowLabel: false,
      tabBarStyle: {
        position: 'absolute',
        backgroundColor: '#fff',
        shadowColor: '#666',
        shadowOpacity: .3,
        shadowRadius: 10,
        borderTopWidth: 0,
        height: 70,
        borderRadius: 10,
        margin: 10
      },
      tabBarActiveTintColor: '#377F67',
      tabBarInactiveTintColor: '#ACACAC',
      tabBarIcon: ({ color, size, focused }) => {
        if (route.name === 'List') {
          return (<Pressable 
            style={{ 
              borderRadius: 10,
              height: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              minWidth: '100%'
            }} 
            onPress={(e) => {
              e.preventDefault()
              e.stopPropagation()
              navigation.navigate("NewDash")
            }}>
            <PlusIcon color='#377F67' size='46'/>
            <Text style={{ color: '#377F67', fontWeight: 'bold', fontSize: 17, width: '60%' }}>{t(i18n)`New board`}</Text>
          </Pressable>)
        } else if (route.name === 'MetricsAction') {
          return (<Pressable onPress={(e) => {
            e.preventDefault()
            e.stopPropagation()
            navigation.navigate("Metrics")
          }} style={{ width: '100%', alignItems: 'center' }}>
            <View style={{ paddingHorizontal: 5, paddingTop: 5 }}>
              <MetricsIcon />
            </View>
          </Pressable>)
        } else if (route.name === 'ConfigAction') {
          return (<Pressable onPress={(e) => {
            e.preventDefault()
            e.stopPropagation()
            navigation.navigate("Config")
          }} style={{ width: '100%', alignItems: 'center' }}>
            <View style={{ paddingHorizontal: 5, paddingTop: 5 }}>
              <ConfigIcon />
            </View>
          </Pressable>)
        }
      }
    })}>
      <Tab.Screen name="List" component={ListScreen} options={{ headerShown: false, title: 'Superb' }}/>
      <Tab.Screen name="MetricsAction" component={Empty} />
      <Tab.Screen name="ConfigAction" component={Empty} />
    </Tab.Navigator>
  )
}