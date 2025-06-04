import './gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/login';
import Home from './screens/home';
import { CreateClient } from './screens/create-client';

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name='Create-Client' component={CreateClient} options={{headerShown: false}}/>
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
      <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

