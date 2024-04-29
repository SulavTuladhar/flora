/* eslint-disable eqeqeq */
/* eslint-disable comma-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Easing } from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import MainScreen from './src/screens/MainScreen';
import { checkLocalStorage } from './src/features/auth/reducers';
import LoginScreen from './src/screens/LoginScreen';

const App = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  useEffect(() => {
    changeNavigationBarColor('#01605A');
    dispatch(checkLocalStorage());
  }, []);
  const token = useSelector((state) => state.token);

  // const config = {
  //   animation: 'timing',
  //   config: {
  //     duration: 300,
  //     easing: Easing.linear,

  //     // stiffness: 1000,
  //     // damping: 50,
  //     // mass: 1,
  //     // overshootClamping: false,
  //     // restDisplacementThreshold: 0.02,
  //     // restSpeedThreshold: 0.02,

  //   }
  // }
  // const closeConfig = {
  //   animation: 'timing',
  //   config: {
  //     duration: 300,
  //     easing: Easing.linear,
  //   }
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          // statusBarColor: '#dd8843',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      >
        {
          token == undefined
            ? (
              <>
                <Stack.Screen name="Main" component={MainScreen}
                  options={{
                    headerShown: false
                  }}
                />
                <Stack.Screen name="Login" component={LoginScreen}
                  options={{
                    headerShown: false
                  }}
                />
              </>
            )
            : (
              <Stack.Screen name="Main" component={MainScreen}
                options={{
                  headerShown: false
                }}
              />
            )
        }


      </Stack.Navigator>
    </NavigationContainer>


  )

}

export default App;
