import {
   Alert,
   Platform,
   Pressable,
   ScrollView,
   StyleSheet,
   View,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Card, Text } from "react-native-paper";
import { useEffect, useState } from "react";
import axios from "axios";
import GetOrderComponent from "../components/Get-Orders";
import GetPendingOrderComponent from "../components/Get-Pending-Orders";

export default function Dashboard() {
   const navigate = useNavigation();

   const [counting, setCounting] = useState({
      garments: 0,
      services: 0,
      users: 0,
      clients: 0,
   });

   const [orders, setOrders] = useState([]);
   const [pendingOrders, setPendingOrders] = useState();

   useEffect(() => {
      getOrders();
      getCounting();
      getPendingOrders();
   }, []);

   const getCounting = async () => {
      const { data } = await axios.get(
         "http://127.0.0.1:5000/orders/get-order-counting"
      );

      console.log(data);
      setCounting(data);
   };

   const getOrders = async () => {
      try {
         const { data } = await axios.get(
            "http://127.0.0.1:5000/orders/get-order-dashboard?pagination=1"
         );
         console.log(data);

         setOrders(data);
      } catch (error) {
         {
            Platform.OS == "web"
               ? alert("Hubo un error al obtener las ordenes")
               : Alert.alert("Hubo un error al obtener las ordenes.");
         }
      }
   };

   const getPendingOrders = async () => {
      try {
         const { data } = await axios.get(
            "http://127.0.0.1:5000/orders/get-order-pending-dashboard?pagination=1"
         );

         setPendingOrders(data);
      } catch (error) {
         {
            Platform.OS == "web"
               ? alert("Hubo un error al obtener las ordenes")
               : Alert.alert("Hubo un error al obtener las ordenes.");
         }
      }
   };

   return (
      <ScrollView
         contentContainerStyle={{
            paddingBottom: 100,
            height: "100vh",
         }}
      >
         <View style={styles.container}>
            <Card
               style={
                  Platform.OS == "web"
                     ? styles.containerWeb
                     : { ...styles.containerMobile, marginTop: 30 }
               }
            >
               <View style={styles.titleContainer}>
                  <Text style={styles.title}>Dashboard</Text>
                  <Pressable
                     style={styles.barsButton}
                     onPress={() => {
                        navigate.dispatch(DrawerActions.toggleDrawer());
                     }}
                  >
                     <FontAwesome5 name="bars" size={30} color="#376CE4" />
                  </Pressable>
               </View>

               <Card style={styles.cardCounting}>
                  <Text style={styles.subtitle}>Conteo de Datos</Text>

                  <View style={{ ...styles.rowing, alignItems: "center" }}>
                     <View>
                        <Text style={styles.labelWeb}>No. Clientes</Text>
                        <Text style={styles.numberWeb}>{counting.clients}</Text>
                     </View>

                     <View>
                        <Text style={styles.labelWeb}>No. Prendas</Text>
                        <Text style={styles.numberWeb}>
                           {counting.garments}
                        </Text>
                     </View>
                     <View>
                        <Text style={styles.labelWeb}>No. Servicios</Text>
                        <Text style={styles.numberWeb}>
                           {counting.services}
                        </Text>
                     </View>
                     <View>
                        <Text style={styles.labelWeb}>No. Usuarios</Text>
                        <Text style={styles.numberWeb}>{counting.users}</Text>
                     </View>
                  </View>
               </Card>

               <View style={styles.ordersContainer}>
                  <GetOrderComponent orders={orders} />
                  <GetPendingOrderComponent orders={pendingOrders}/>
               </View>
            </Card>
         </View>
      </ScrollView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#eee",
      alignItems: "center",
      marginTop: 20,
   },

   containerWeb: {
      width: "95%",
      backgroundColor: "#fff",
      padding: 20,
      paddingHorizontal: 20,
      borderRadius: 15,
   },

   containerMobile: {
      width: "95%",
      backgroundColor: "#fff",
      padding: 20,
      borderRadius: 15,
   },

   titleContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
   },

   title: {
      color: "#376CE4",
      fontSize: 40,
      fontWeight: 700,
      textAlign: "center",
      marginVertical: 10,
   },

   barsButton: {
      alignSelf: "center",
   },

   cardCounting: {
      backgroundColor: "rgba(220, 102, 41, 0.9)",
      padding: 20,
   },

   subtitle: {
      color: "#fff",
      fontSize: 30,
      fontWeight: 700,
      textAlign: "center",
      marginBottom: 20,
   },

   rowing: {
      justifyContent: "center",
      gap: 20,
      textAlign: "center",
      flexDirection: "row",
      flexWrap: "wrap",
   },

   labelWeb: {
      color: "#fff",
      fontSize: 22,
      fontWeight: 600,
   },

   numberWeb: {
      color: "#5A3B32",
      fontSize: 40,
      alignSelf: "center",
      marginTop: 10,
      fontWeight: 700,
   },

   ordersContainer: {
      flexDirection: "row",
      justifyContent: 'space-between',
      flexWrap: "wrap",
      marginTop: 20,
      gap: 10
   },
});
