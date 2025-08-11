import {
   Platform,
   Pressable,
   ScrollView,
   StyleSheet,
   View,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Card, Text, TextInput } from "react-native-paper";
import {
   useNavigation,
   DrawerActions,
   useFocusEffect,
} from "@react-navigation/native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { useCallback, useEffect, useState } from "react";
import constants from "../constants";

export default function CreateOrder() {
   const navigate = useNavigation();

   const { garments, services } = constants;
   const [clients, setClients] = useState([]);
   const [users, setUsers] = useState([]);

   const [totalOrder, setTotalOrder] = useState(0);

   const defaultGarment = {
      type: "Camisa",
      description: "",
      observation: "",
      services: [{ ...services[0] }],
   };
   const [order, setOrder] = useState({
      client_id: 1,
      user_id: 1,
      state: "recibido",
      estimated_delivery_date: "",
      total: totalOrder,
      pagado: false,
      garments: [{ ...defaultGarment }],
   });

   useFocusEffect(
      useCallback(() => {
         getClients();
         getUsers();
         onChangeUserClient("estimated_delivery_date", "");
         calculateTotal();
      }, [])
   );

   const calculateTotal = () => {
      let subtotal = 0;
      const data = { ...order };

      if (data.garments) {
         for (const garment of data.garments) {
            for (const service of garment.services) {
               subtotal += service.quantity * service.unitPrice;
            }
         }
      }

      setTotalOrder(subtotal);
   };

   const addGarment = () => {
      const data = { ...order };

      data.garments.push({ ...defaultGarment });
      setOrder(data);
   };

   const addService = (garment_id) => {
      const data = { ...order };

      if (data.garments[garment_id]) {
         data.garments[garment_id].services.push({ ...services[0] });
      }

      setOrder(data);
   };

   const getClients = async () => {
      const { data } = await axios.get("http://127.0.0.1:5000/clients/search");

      setClients(data);
   };

   const getUsers = async () => {
      const { data } = await axios.get("http://127.0.0.1:5000/users/get");

      setUsers(data.users);
   };

   const deleteGarment = (garment_id) => {
      const data = { ...order };

      if (data.garments[garment_id]) {
         data.garments = data.garments.filter((_, i) => i != garment_id);

         setOrder(data);
      }
   };

   const deleteService = (garment_id, service_id) => {
      const data = { ...order };

      if (data.garments[garment_id].services[service_id]) {
         data.garments[garment_id].services = data.garments[
            garment_id
         ].services.filter((_, i) => i != service_id);
      }

      setOrder(data);
   };

   const onChangeUserClient = (key, value) => {
      const data = { ...order };

      if (key == "estimated_delivery_date") {
         const date = new Date();
         date.setDate(date.getDate() + 2);
         const dateString = date.toISOString().split("T")[0];

         data[key] = dateString;
      } else {
         data[key] = parseInt(value);
      }

      setOrder(data);
   };

   const onChangeGarment = (key, value, garment_id) => {
      const data = { ...order };

      if (data.garments[garment_id]) {
         data.garments[garment_id][key] = value;
      }

      setOrder(data);
   };

   const onChangeService = (key, value, garment_id, service_id) => {
      const data = { ...order };

      if (data.garments[garment_id].services[service_id]) {
         if (["name", "description"].includes(key)) {
            data.garments[garment_id].services[service_id][key] = value;

            if (key == "name") {
               const price =
                  services.filter((service) => service.name === value)[0]
                     ?.unitPrice || 0;

               data.garments[garment_id].services[service_id].unitPrice = price;
            }
         } else {
            data.garments[garment_id].services[service_id][key] = value;
         }
      }

      setOrder(data);
   };

   const createOrder = async () => {
      try {
         const orderToSend = { ...order, total: totalOrder };
         const { data } = await axios.post(
            "http://127.0.0.1:5000/orders/create",
            orderToSend
         );
         console.log(data);

         alert("Orden Creada Con Éxito");

         navigate.navigate("Dashboard");
      } catch (error) {
         alert("ERROr al Crear la orden");
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
            <Card style={styles.card}>
               <View style={styles.titleContainer}>
                  <Text
                     style={
                        Platform.OS == "web"
                           ? styles.titleWeb
                           : styles.titleMobile
                     }
                  >
                     Ordenes
                  </Text>

                  <Pressable
                     style={styles.iconPressable}
                     onPress={() => {
                        navigate.dispatch(DrawerActions.toggleDrawer());
                     }}
                  >
                     <FontAwesome5 name="bars" size={24} color="#376CE4" />
                  </Pressable>
               </View>

               <Text style={styles.label}>Usuario</Text>
               <Picker
                  onValueChange={(value) => {
                     onChangeUserClient("user_id", value);
                  }}
                  style={
                     Platform.OS == "web"
                        ? styles.pickersWeb
                        : styles.pickersMobile
                  }
               >
                  <Picker.Item label="-- Selecciona un usuario --" />
                  {users.map((user) => (
                     <Picker.Item
                        key={user.id}
                        label={user.name}
                        value={user.id}
                     />
                  ))}
               </Picker>

               <Text style={styles.label}>Cliente</Text>
               <Picker
                  onValueChange={(value) => {
                     onChangeUserClient("client_id", value);
                  }}
                  style={
                     Platform.OS == "web"
                        ? styles.pickersWeb
                        : styles.pickersMobile
                  }
               >
                  <Picker.Item label="-- Selecciona un cliente --" value={0} />
                  {clients.map((client) => (
                     <Picker.Item
                        key={client.id}
                        label={client.name}
                        value={client.id}
                     />
                  ))}
               </Picker>

               {order.garments.map((garment, index) => (
                  <Card
                     style={[
                        styles.cardServices,
                        { backgroundColor: "rgba(69, 183, 189, .7)" },
                     ]}
                     key={index}
                  >
                     <View style={styles.subititleContainer}>
                        <Text
                           style={
                              Platform.OS == "web"
                                 ? styles.subtitlesWeb
                                 : styles.subtitlesMobile
                           }
                        >
                           Prenda No. {index + 1}
                        </Text>
                        <Pressable style={styles.addButton}>
                           <Text
                              style={styles.buttonText}
                              onPress={() => {
                                 addGarment();
                              }}
                           >
                              Agregar Prenda
                           </Text>
                        </Pressable>
                     </View>
                     <Picker
                        style={
                           Platform.OS == "web"
                              ? styles.pickersWeb
                              : styles.pickersMobile
                        }
                        onValueChange={(value) => {
                           onChangeGarment("type", value, index);
                        }}
                     >
                        {garments.map((garment) => (
                           <Picker.Item label={garment} value={garment} />
                        ))}
                     </Picker>
                     <Text style={styles.label}>Descripción de la Prenda</Text>
                     <TextInput
                        activeUnderlineColor="#5A3B32"
                        placeholderTextColor="#5A3B32"
                        underlineColor="#5A3B32"
                        style={styles.textInput}
                        onChangeText={(text) => {
                           onChangeGarment("description", text, index);
                        }}
                     />

                     <Text style={styles.label}>
                        Observaciones de la Prenda
                     </Text>
                     <TextInput
                        activeUnderlineColor="#5A3B32"
                        placeholderTextColor="#5A3B32"
                        underlineColor="#5A3B32"
                        style={styles.textInput}
                        onChangeText={(text) => {
                           onChangeGarment("observation", text, index);
                        }}
                     />

                     {garment.services.map((service, service_index) => (
                        <Card style={styles.cardServices} key={service_index}>
                           <View style={styles.subititleContainer}>
                              <Text
                                 style={
                                    Platform.OS == "web"
                                       ? styles.subtitlesWeb
                                       : styles.subtitlesMobile
                                 }
                              >
                                 Servicio No. {service_index + 1}
                              </Text>

                              <Pressable
                                 style={styles.addButton}
                                 onPress={() => {
                                    addService(index);
                                 }}
                              >
                                 <Text style={styles.buttonText}>
                                    Agregar Servicio
                                 </Text>
                              </Pressable>
                           </View>
                           <Picker
                              onValueChange={(value) => {
                                 onChangeService(
                                    "name",
                                    value,
                                    index,
                                    service_index
                                 );
                              }}
                              style={
                                 Platform.OS == "web"
                                    ? styles.pickersWeb
                                    : styles.pickersMobile
                              }
                           >
                              {services.map((service) => (
                                 <Picker.Item
                                    label={service.name}
                                    value={service.name}
                                 />
                              ))}
                           </Picker>
                           <Text style={styles.label}>
                              Descripción del Servicio
                           </Text>
                           <TextInput
                              activeUnderlineColor="#5A3B32"
                              placeholderTextColor="#5A3B32"
                              defaultValue={service.description}
                              underlineColor="#5A3B32"
                              style={styles.textInput}
                              onChangeText={(text) => {
                                 onChangeService(
                                    "description",
                                    text,
                                    index,
                                    service_index
                                 );
                              }}
                           />

                           <Text style={styles.label}>Cantidad</Text>
                           <TextInput
                              activeUnderlineColor="#5A3B32"
                              placeholderTextColor="#5A3B32"
                              defaultValue={service.quantity}
                              underlineColor="#5A3B32"
                              style={styles.textInput}
                              onChangeText={(text) => {
                                 onChangeService(
                                    "quantity",
                                    text,
                                    index,
                                    service_index
                                 );
                              }}
                              onBlur={() => calculateTotal()}
                           />

                           <Text style={styles.label}>Precio del Servicio</Text>
                           {["Lavado", "Planchado"].includes(service.name) ? (
                              <TextInput
                                 activeUnderlineColor="#5A3B32"
                                 placeholderTextColor="#5A3B32"
                                 underlineColor="#5A3B32"
                                 placeholder={service.unitPrice}
                                 disabled={true}
                                 style={styles.textInput}
                                 onBlur={() => calculateTotal()}
                              />
                           ) : (
                              <TextInput
                                 activeUnderlineColor="#5A3B32"
                                 placeholderTextColor="#5A3B32"
                                 underlineColor="#5A3B32"
                                 style={styles.textInput}
                                 defaultValue={"0"}
                                 onBlur={() => calculateTotal()}
                                 onChangeText={(text) => {
                                    onChangeService(
                                       "unitPrice",
                                       parseFloat(text),
                                       index,
                                       service_index
                                    );
                                 }}
                              />
                           )}

                           {service_index > 0 && (
                              <Pressable
                                 style={styles.deleteButton}
                                 onPress={() => {
                                    deleteService(index, service_index);
                                 }}
                              >
                                 <Text style={styles.buttonText}>
                                    Eliminar Servicio
                                 </Text>
                              </Pressable>
                           )}
                        </Card>
                     ))}

                     {index > 0 && (
                        <Pressable
                           style={styles.deleteButton}
                           onPress={() => {
                              deleteGarment(index);
                           }}
                        >
                           <Text style={styles.buttonText}>
                              Eliminar Prenda
                           </Text>
                        </Pressable>
                     )}
                  </Card>
               ))}

               <Text style={styles.total}>Total: ${totalOrder.toFixed(2)}</Text>

               <Pressable
                  style={styles.addButton}
                  onPress={() => {
                     createOrder();
                  }}
               >
                  <Text style={styles.buttonText}>Crear Orden</Text>
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
      borderRadius: 10
   },

   card: {
      width: "95%",
      backgroundColor: "#fff",
      padding: 20,
      borderRadius: 15,
   },

   titleContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
   },

   titleWeb: {
      color: "#376CE4",
      fontSize: 32,
      fontWeight: 700,
      marginVertical: 10,
   },

   titleMobile: {
      color: "#376CE4",
      fontSize: 24,
      fontWeight: 700,
      marginVertical: 10,
   },

   iconPressable: {
      alignSelf: "center",
   },

   pickersWeb: {
      borderColor: "#eee",
      backgroundColor: "#eee",
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
      height: 30,
      fontSize: 15,
   },

   pickersMobile: {
      backgroundColor: "#eee",
      borderWidth: 1,
      paddingHorizontal: 10,
      marginBottom: 10,
      height: 50,
      fontSize: 15,
   },

   subititleContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
   },

   subtitlesWeb: {
      color: "#DC6629",
      fontSize: 20,
      fontWeight: 700,
      marginVertical: 10,
   },

   subtitlesMobile: {
      color: "#DC6629",
      fontSize: 15,
      fontWeight: 700,
      marginVertical: 10,
   },

   cardServices: {
      marginVertical: 10,
      backgroundColor: "#fff",
      padding: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
   },

   addButton: {
      backgroundColor: "green",
      alignSelf: "center",
      borderRadius: 5,
      padding: 7,
   },

   deleteButton: {
      backgroundColor: "red",
      alignSelf: "center",
      marginVertical: 7,
      borderRadius: 5,
      padding: 7,
   },

   buttonText: {
      color: "white",
   },

   textInput: {
      height: 30,
      backgroundColor: "#eeeeee",
      marginBottom: 5,
   },

   label: {
      fontSize: 15,
      marginVertical: 5,
      width: 400,
      color: "#5A3B32",
   },

   total: {
      textAlign: "right",
      fontSize: 24,
      fontWeight: 700,
   },
});
