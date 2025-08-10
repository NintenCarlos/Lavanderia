import { createDrawerNavigator } from "@react-navigation/drawer";
import Dashboard from "../screens/dashboard";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import {
   ClientsNavigation,
   GarmentsNavigation,
   LoginNavigation,
   OrderNavigation,
   ServicesNavigation,
   UsersNavigation,
} from "./Stack";

const Drawer = createDrawerNavigator();

export function DrawerNavigation() {
   return (
      <Drawer.Navigator
         screenOptions={{
            headerShown: false,
            drawerPosition: "right",
            drawerActiveTintColor: "#DC6629",
            drawerInactiveTintColor: "#5A3B32",
         }}
      >
        
         
         <Drawer.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
               drawerLabel: "Dashboard",
               drawerIcon: ({ color, size }) => (
                  <FontAwesome5 name="chart-bar" size={size} color={color} />
               ),
            }}
         />

          <Drawer.Screen
            name="Orders"
            component={OrderNavigation}
            options={{
               drawerLabel: "Ordenes",
               drawerIcon: ({ color, size }) => (
                  <FontAwesome5
                     name="clipboard-list"
                     size={size}
                     color={color}
                  />
               ),
            }}
         />

         <Drawer.Screen
            name="Clients"
            component={ClientsNavigation}
            options={{
               drawerLabel: "Clientes",
               drawerIcon: ({ color, size }) => (
                  <FontAwesome5 name="address-book" size={size} color={color} />
               ),
            }}
         />

         <Drawer.Screen
            name="Users"
            component={UsersNavigation}
            options={{
               drawerLabel: "Usuarios",
               drawerIcon: ({ color, size }) => (
                  <FontAwesome5 name="user-alt" size={size} color={color} />
               ),
            }}
         />

         <Drawer.Screen
            name="Garments"
            component={GarmentsNavigation}
            options={{
               drawerLabel: "Prendas",
               drawerIcon: ({ color, size }) => (
                  <FontAwesome5 name="redhat" size={size} color={color} />
               ),
            }}
         />

         <Drawer.Screen
            name="Services"
            component={ServicesNavigation}
            options={{
               drawerLabel: "Servicios",
               drawerIcon: ({ color, size }) => (
                  <FontAwesome5 name="soap" size={size} color={color} />
               ),
            }}
         />
      </Drawer.Navigator>
   );
}
