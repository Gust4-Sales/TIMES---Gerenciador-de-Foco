import { Navigation } from '@react-navigation/native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

import HomePage from './HomePage';
import FormPage from './FormPage';

export function registerScreens() {
  Navigation.registerComponent('HomePage', () => gestureHandlerRootHOC(HomePage));
  Navigation.registerComponent('FormPage', () => gestureHandlerRootHOC(FormPage));
}