import 'react-native-gesture-handler';

import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Movies from '../screens/movies/Movies';
import MovieDetails from '../screens/movieDetails/MovieDetails';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="movies"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="movies" component={Movies} />
        <Stack.Screen name="movieDetails" component={MovieDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
