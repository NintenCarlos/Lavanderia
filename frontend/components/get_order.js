import { Pressable, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function GetOrderComponent({
   orders,
   pagination,
   numOrders,
   newPagination,
}) {
   const [maxPagination, setMaxPagination] = useState(1);
   const navigate = useNavigation();

   useEffect(() => {
      setMaxPagination(Math.ceil(numOrders / 10));
   }, [numOrders]);

   return (
      <Card style={styles.container}>
         <Text style={styles.title}>Ordenes</Text>
         {orders.map((order) => (
            <Pressable
               key={order.id}
               onPress={() => {
                  console.log(order),
                     navigate.navigate("Orders", {
                        screen: "OrderDetail",
                        params: { param: order },
                     });
               }}
            >
               <Card style={styles.orders}>
                  <Text style={styles.ordertitle}>Orden No. {order.id}</Text>
                  <Text style={styles.orderText}>
                     Cliente: {order.client_name}
                  </Text>
                  <Text style={styles.orderText}>
                     Usuario Encargado: {order.user_name}
                  </Text>
                  <Text style={styles.orderText}>Monto: ${order.total}</Text>
                  <Text style={styles.orderText}>Estado: {order.state}</Text>
                  <Text style={styles.orderText}>
                     Creada el: {order.created_at}
                  </Text>
               </Card>
            </Pressable>
         ))}

         <View style={styles.paginationContainer}>
            {pagination == 1 ? (
               <></>
            ) : (
               <Pressable onPress={() => newPagination("left")}>
                  <FontAwesome5 name="angle-left" size={18} color="black" />
               </Pressable>
            )}

            <Text style={styles.paginationText}>{pagination}</Text>

            {pagination == maxPagination ? (
               <></>
            ) : (
               <Pressable onPress={() => newPagination("right")}>
                  <FontAwesome5 name="angle-right" size={18} color="black" />
               </Pressable>
            )}
         </View>
      </Card>
   );
}

const styles = StyleSheet.create({
   container: {
      width: "49%",
      backgroundColor: "#eee",
      padding: 20,
      paddingHorizontal: 20,
      borderRadius: 7,
   },

   title: {
      color: "#5A3B32",
      fontSize: 22,
      fontWeight: 700,
      textAlign: "center",
      marginVertical: 10,
   },

   orders: {
      backgroundColor: "rgba(69, 183, 189, 0.9)",
      padding: 20,
      marginBottom: 10,
   },

   ordertitle: {
      color: "white",
      fontSize: 18,
      fontWeight: 600,
   },

   orderText: {
      color: "white",
      marginTop: 5,
   },

   paginationContainer: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 10,
   },

   paginationText: {
      alignSelf: "center",
      fontWeight: 700,
   },
});
