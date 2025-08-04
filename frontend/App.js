import "./gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerNavigation } from "./components/Drawer";

export default function MyStack() {
   return (
      <NavigationContainer>
         <DrawerNavigation />
      </NavigationContainer>
   );
}
