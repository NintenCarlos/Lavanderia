import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/login";
import Register from "../screens/register";
import CreateClient from "../screens/create-client";
import ListClients from "../screens/list-clients";
import ListGarments from "../screens/list-garments";
import CreateGarment from "../screens/create-garment";
import CreateService from "../screens/create-services";
import ListServices from "../screens/list-services";
import ListUsers from "../screens/list-users";
import CreateOrder from "../screens/order";
import OrderResume from "../screens/order_resume";

const Stack = createStackNavigator();

export function ClientsNavigation() {
   return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen name="ListClients" component={ListClients} />
         <Stack.Screen name="CreateClient" component={CreateClient} />
      </Stack.Navigator>
   );
}

export function GarmentsNavigation() {
   return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen name="ListGarments" component={ListGarments} />
         <Stack.Screen name="CreateGarment" component={CreateGarment} />
      </Stack.Navigator>
   );
}

export function UsersNavigation() {
   return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen name="ListUsers" component={ListUsers} />
      </Stack.Navigator>
   );
}

export function ServicesNavigation() {
   return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen name="ListServices" component={ListServices} />
         <Stack.Screen name="CreateService" component={CreateService} />
      </Stack.Navigator>
   );
}

export function OrderNavigation() {
   return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen name="CreateOrder" component={CreateOrder} />
         <Stack.Screen name="OrderDetail" component={OrderResume} />
      </Stack.Navigator>
   );
}

export function LoginNavigation() {
   return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen name="Login" component={Login} />
         <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
   );
}
