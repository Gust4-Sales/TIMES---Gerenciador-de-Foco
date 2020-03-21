import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// import { registerScreens } from './pages/screens'

// registerScreens()


import HomePage from './pages/HomePage';
import FormPage from './pages/FormPage';
import RunningCiclePage from './pages/RunningCiclePage'
import FeedbackPage from './pages/FeedbackPage'


const Stack = createStackNavigator()

function Router() {
    return (
        <Stack.Navigator screenOptions={defaultHeaderStyles} initialRouteName="HomePage" >
            <Stack.Screen 
                name="HomePage" 
                component={HomePage} 
            />
            <Stack.Screen 
                name="FormPage" 
                component={FormPage} 
            />
            <Stack.Screen 
                name="RunningCiclePage" 
                component={RunningCiclePage}    
            /> 
            <Stack.Screen 
                name="FeedbackPage" 
                component={FeedbackPage}    
            /> 
    </Stack.Navigator>
  )
}

const defaultHeaderStyles = {
    headerShown: false,
}

export default Router