import { createStackNavigator } from "@react-navigation/stack";
import OrderResume from "../screens/order_resume";
import CreateOrder from "../screens/order";
import ListUsers from "../screens/list_users";
import ListGarments from "../screens/list_garments";
import ListServices from "../screens/list_services";
import ListClients from "../screens/list_clients";
import CreateClient from "../screens/create_client";
import CreateService from "../screens/create_service";
import CreateGarment from "../screens/create_garment";
import CreateUser from "../screens/create_user";

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
         <Stack.Screen name="CreateUser" component={CreateUser} />
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
      <Stack.Navigator
         screenOptions={{ headerShown: false }}
         initialRouteName="CreateOrder"
      >
         <Stack.Screen name="CreateOrder" component={CreateOrder} />
         <Stack.Screen name="OrderDetail" component={OrderResume} />
      </Stack.Navigator>
   );
}
