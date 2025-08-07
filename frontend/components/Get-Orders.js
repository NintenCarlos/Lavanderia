import { Platform, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

export default function GetOrderComponent({ orders }) {
   return (
      <Card
         style={
            Platform.OS == "web" ? styles.containerWeb : styles.containerMobile
         }
      >
         <Text style={styles.title}>Ordenes</Text>
         {orders.map((order) => (
            <Card style={styles.orders} key={order.id}>
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
         ))}
      </Card>
   );
}

const styles = StyleSheet.create({
   containerWeb: {
      width: "49%",
      backgroundColor: "#eee",
      padding: 20,
      paddingHorizontal: 20,
      borderRadius: 15,
   },

   containerMobile: {
      width: "40%",
      backgroundColor: "#fff",
      padding: 20,
      borderRadius: 15,
   },

   title: {
      color: "#5A3B32",
      fontSize: 40,
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
      fontSize: 20,
      fontWeight: 600,
   },

   orderText: {
      color: "white",
      marginTop: 5
   },
});
