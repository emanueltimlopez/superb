import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { DashScreen } from './screens/dash';
import DataProvider from './lib/data/provider';
import { ListScreen } from './screens/list';
import { NewDashScreen } from './screens/dash/new';
import { FeedbackScreen } from './screens/feedback';

const Stack = createStackNavigator();

export default function App() {
  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="List" component={ListScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Dash" component={DashScreen} options={{ 
            title: ''
           }}/>
          <Stack.Screen name="NewDash" component={NewDashScreen} options={{ 
            title: '',
          }}/>
          <Stack.Screen name="Feedback" component={FeedbackScreen} options={{ 
            title: '',
            headerStyle: {
              backgroundColor: '#5eba7d',
            }
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
