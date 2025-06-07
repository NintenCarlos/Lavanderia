import './gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/login';
import Home from './screens/home';
import { CreateClient } from './screens/create-client';
import Register from './screens/register';
import UpdateClient from './screens/update-client';

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
      <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Stack.Screen name='Create-Client' component={CreateClient} options={{headerShown: false}}/>
      <Stack.Screen name="Update-Client" component={UpdateClient} options={{headerShown: false}} />
      <Stack.Screen name="Register" component={Register} options={{headerShown: false}} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

