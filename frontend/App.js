import "./gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerNavigation } from "./components/Drawer";
import { createStackNavigator } from "@react-navigation/stack";
import OrderResume from "./screens/order_resume";

export default function MyStack() {
   const Stack = createStackNavigator();

   return (
      <NavigationContainer>
         <DrawerNavigation />
         <Stack.Screen name="OrderDetail" component={OrderResume} />
      </NavigationContainer>
   );
}
