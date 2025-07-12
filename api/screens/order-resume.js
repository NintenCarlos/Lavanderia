import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Text } from "react-native-paper";

export default function OrderResume() {
   const [order, setOrder] = useState(null);
   const [total, setTotal] = useState(0);

   const getOrderDetail = async () => {
      try {
         const data = await axios.get(
            "http://127.0.0.1:5000/orders/get-order-detail/9"
         );
         setOrder(data.data.order);
      } catch (err) {
         alert("un error ha ocurrido.");
         console.log(err);
      }
   };

   const getAmounts = () => {
      let amount = 0;

      {
         order?.garments.map((garment) => {
            {
               garment?.services.map((service) => {
                  amount += service.quantity * service.unitPrice;
               });
            }
         });
      }

      setTotal(amount);
   };

   useEffect(() => {
      getOrderDetail();
   }, []);

   useEffect(() => {
      getAmounts();
   }, [order]);

   return (
      <View style={styles.container}>
         <ScrollView>
            <Card style={styles.card}>
               <Text style={styles.title}>Resumen de Orden</Text>

               {order?.garments.map((garment, index) => (
                  <View key={index} style={styles.section}>
                     <Text style={styles.subtitle}>Prenda No. {index + 1}</Text>
                     <Text style={styles.mono}>
                        Tipo de prenda: {garment.type}
                     </Text>
                     <Text style={styles.mono}>
                        Descripción: {garment.description}
                     </Text>
                     <Text style={styles.mono}>
                        Observaciones: {garment.observation || "Sin observaciones"}
                     </Text>

                     {garment?.services.map((service, i) => (
                        <View key={i} style={styles.serviceSection}>
                           <Text style={[styles.mono, styles.bold]}>
                              Servicio: {service.name}
                           </Text>
                           <Text style={styles.mono}>
                              Descripción: {service.description}
                           </Text>
                           <Text style={styles.mono}>
                              Cantidad: {service.quantity}
                           </Text>
                           <Text style={styles.mono}>
                              Precio unitario: ${service.unitPrice}
                           </Text>
                           <Text style={[styles.mono, styles.bold]}>
                              Subtotal: $
                              {(service.unitPrice ?? 0) * service.quantity}
                           </Text>
                        </View>
                     ))}

                     <View style={styles.separator} />
                  </View>
               ))}

               <Text style={[styles.mono, styles.bold, styles.center]}>
                  Total: ${total.toFixed(2)}
               </Text>
            </Card>
         </ScrollView>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#c8dfe2",
      padding: 16,
   },

   card: {
      backgroundColor: "#fff",
      padding: 12,
      borderRadius: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
      marginVertical: 10,
   },

   title: {
      textAlign: "center",
      marginBottom: 12,
      fontSize: 20,
      fontWeight: "700",
      color: "#2e4957",
   },

   subtitle: {
      fontSize: 14,
      color: "#2e4957",
      marginBottom: 6,
   },

   mono: {
      fontSize: 13,
      color: "#333",
   },

   bold: {
      fontWeight: "700",
   },

   section: {
      marginBottom: 10,
   },

   serviceSection: {
      marginLeft: 10,
      marginVertical: 4,
   },

   separator: {
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      marginTop: 10,
   },

   center: {
      textAlign: "center",
      marginTop: 20,
      fontSize: 14,
   },
});
