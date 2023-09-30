import '@formatjs/intl-locale/polyfill'
import '@formatjs/intl-pluralrules/polyfill'
import '@formatjs/intl-pluralrules/locale-data/en'
import '@formatjs/intl-pluralrules/locale-data/es'

import React from 'react'
import { View } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { I18nProvider, useLingui } from '@lingui/react'
import { i18n } from "@lingui/core"
import { locale } from 'expo-localization';
import { t } from "@lingui/macro";

import { DashScreen } from './screens/dash';
import DataProvider from './lib/data/provider';
import { ListScreen } from './screens/list';
import { NewDashScreen } from './screens/dash/new';
import { FeedbackScreen } from './screens/feedback';
import { MetricsScreen } from './screens/metrics';
import { messages as enMessages } from './locales/en/messages';
import { messages as esMessages } from './locales/es/messages';

const Stack = createStackNavigator();
i18n.load({
  'en': enMessages,
  'es': esMessages
});
i18n.activate(locale.slice(0, 2));

function EmptyHeader() {
  return (<View></View>)
}

function NavigationRouter() {
  const { i18n } = useLingui()

  return (
    <Stack.Navigator>
      <Stack.Screen name="List" component={ListScreen} options={{ headerShown: false, title: 'Superb' }}/>
      <Stack.Screen name="Dash" component={DashScreen} options={{ title: 'Superb', headerTitle: EmptyHeader}} />
      <Stack.Screen name="NewDash" component={NewDashScreen} options={{ title: t(i18n)`New board` }}/>
      <Stack.Screen name="Feedback" component={FeedbackScreen} options={{ 
        title: 'Superb',
        headerTitle: EmptyHeader,
        headerStyle: {
          backgroundColor: '#5eba7d',
        }
      }}/>
      <Stack.Screen name="Metrics" component={MetricsScreen} options={{ title: t(i18n)`Metrics` }}/>
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <I18nProvider i18n={i18n}>
      <DataProvider userId=''>
        <NavigationContainer>
          <NavigationRouter />
        </NavigationContainer>
      </DataProvider>
    </I18nProvider>
  );
}
