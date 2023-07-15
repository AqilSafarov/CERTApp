import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
  ReportGeneral,
  ReportWriting,
  ReportWriting2,
  ReportWriting3,
  ArticlePage,
  ProfilePage,
} from './src/screens'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="ReportGeneral" component={ReportGeneral} />
          <Stack.Screen name="ReportWriting" component={ReportWriting} />
          <Stack.Screen name="ReportWriting2" component={ReportWriting2} />
          <Stack.Screen name="ReportWriting3" component={ReportWriting3} />
          <Stack.Screen name="ProfilePage" component={ProfilePage} />
          <Stack.Screen name="ArticlePage" component={ArticlePage} />
        
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
