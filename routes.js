import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NavBar from './componant/navBar';
import BoardDetails from './pages/boardDetails';
import ModelBoard from './componant/ModelBoard';
import Workspaces from './pages/workspaces';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
        <Stack.Navigator initialRouteName='Workspace' screenOptions={{headerShown: false}}>
          <Stack.Screen name='Workspace' component={Workspaces} />
          <Stack.Screen name='Main' component={NavBar} />
          <Stack.Screen name='BoardDetails' component={BoardDetails} options={{
            headerShown: true
            }} 
          />
          <Stack.Screen name='modelBoard' component={ModelBoard} />
        </Stack.Navigator>
  )
}
export default Routes