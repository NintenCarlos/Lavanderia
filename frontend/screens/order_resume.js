import axios from "axios";
import { useEffect, useState } from "react";
import {
   Platform,
   Pressable,
   ScrollView,
   StyleSheet,
   View,
} from "react-native";
import { Card, Text } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function OrderResume() {
   const route = useRoute();
   const { param } = route.params || {};
   const [order, setOrder] = useState({
      total: 0,
      garments: [
         {
            services: [
               {
                  unitPrice: 0,
               },
            ],
         },
      ],
   });

   useEffect(() => {
      getOrderDetail();
   }, [param]);

   const navigate = useNavigation();

   const getOrderDetail = async () => {
      console.log(param);
      const { data } = await axios.get(
         `http://127.0.0.1:5000/orders/get-order-detail/${param.id}`
      );

      setOrder(data.order);
   };

   return (
      <ScrollView
         contentContainerStyle={{
            paddingBottom: 100,
            height: "100vh",
         }}
      >
         <View style={styles.container}>
            <Card style={styles.card}>
               <Text
                  style={
                     Platform.OS == "web"
                        ? styles.title
                        : [styles.title, { fontSize: 24 }]
                  }
               >
                  Detalle de Orden No. {order.order_id}
               </Text>
               <Text style={styles.orderText}>Te atendió: {order.user}</Text>
               <Text style={styles.orderText}>Cliente: {order.client}</Text>
               <Text style={styles.orderText}>
                  Estado de la Orden: {order.status}
               </Text>

               {order.garments?.map((garment, index) => (
                  <Card key={garment.garment_id} style={styles.garmentCard}>
                     <Text
                        style={
                           Platform.OS == "web"
                              ? styles.subtitle
                              : [styles.subtitle, { fontSize: 18 }]
                        }
                     >
                        Prenda No. {index + 1}
                     </Text>
                     <Text style={styles.orderText}>
                        ID de la Prenda: {garment.garment_id}
                     </Text>
                     <Text style={styles.orderText}>
                        Tipo de prenda: {garment.type}
                     </Text>
                     <Text style={styles.orderText}>
                        Descripción de la prenda: {garment.description}
                     </Text>
                     <Text style={styles.orderText}>
                        Observaciones: {garment.observation}
                     </Text>
                     {garment.services?.map((service, index) => (
                        <Card
                           key={service.service_id}
                           style={[
                              styles.garmentCard,
                              { backgroundColor: "#fff" },
                           ]}
                        >
                           <Text
                              style={
                                 Platform.OS == "web"
                                    ? styles.subtitle
                                    : [styles.subtitle, { fontSize: 18 }]
                              }
                           >
                              Servicio No. {index + 1}
                           </Text>
                           <Text style={styles.orderText}>
                              ID del servicio: {service.service_id}
                           </Text>
                           <Text style={styles.orderText}>
                              Servicio: {service.name}
                           </Text>
                           <Text style={styles.orderText}>
                              Descripción del Servicio: {service.description}
                           </Text>
                           <Text style={styles.orderText}>
                              Cantidad: {service.quantity}
                           </Text>
                           <Text style={styles.orderText}>
                              Precio por Servicio: $
                              {service.unitPrice.toFixed(2)}
                           </Text>
                        </Card>
                     ))}
                  </Card>
               ))}

               <Text style={styles.total}>Total ${order.total.toFixed(2)}</Text>
               <Pressable
                  style={styles.addButton}
                  onPress={() => {
                     navigate.reset({
                        index: 0,
                        routes: [{ name: "Dashboard" }],
                     });
                  }}
               >
                  <Text style={{ color: "#fff" }}>Volver al Inicio</Text>
               </Pressable>
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
      marginVertical: 20,
   },

   card: {
      width: "95%",
      backgroundColor: "#fff",
      padding: 20,
      borderRadius: 10,
   },

   title: {
      color: "#376CE4",
      fontSize: 28,
      fontWeight: 700,
      marginVertical: 10,
   },

   orderText: {
      marginBottom: 7,
   },

   subtitle: {
      color: "#45B7BD",
      fontSize: 22,
      fontWeight: 700,
      marginVertical: 10,
   },

   garmentCard: {
      marginVertical: 10,
      padding: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
      backgroundColor: "#eeeeee",
   },

   total: {
      textAlign: "right",
      fontSize: 24,
      fontWeight: 700,
      paddingRight: 10,
      marginBottom: 20,
   },

   addButton: {
      flexDirection: "row",
      backgroundColor: "green",
      justifyContent: "center",
      borderRadius: 5,
      padding: 7,
   },
});
