import React, { useEffect, useState } from "react";
import {
   View,
   StyleSheet,
   Pressable,
   ScrollView,
   Platform,
   Alert,
} from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import axios from "axios";
import { Card, Text } from "react-native-paper";
import EditServiceModal from "../extras/EditService";

export default function ListServices() {
   const [services, setServices] = useState([
      {
         id: 1,
         name: "Lavado",
         description: "Proceso de lavado completo por docena.",
         price: 22,
      },
   ]);

   const navigate = useNavigation();

   const [modalVisible, setModalVisible] = useState(false);
   const [updatedService, setUpdatedService] = useState({
      id: null,
      name: "",
      description: "",
      price: 0,
   });

   useEffect(() => {
      getServices();
   }, []);

   const getServices = async () => {
      const { data } = await axios.get("http://127.0.0.1:5000/service/get-all");

      console.log(data);
      setServices(data.services);
   };

   const handleUpdateGarment = async () => {
      try {
         await axios.put(
            `http://127.0.0.1:5000/service/update/${updatedService.id}`,
            updatedService
         );

         const updatedList = services.map((service) =>
            service.id === updatedService.id ? updatedService : service
         );

         setServices(updatedList);
         setModalVisible(false);

         Platform.OS === "web"
            ? alert("Servicio actualizado correctamente.")
            : Alert.alert("Servicio actualizado correctamente.");
      } catch (error) {
         console.error("Error al actualizar servicio:", error);
      }
   };

   const deleteService = async (id) => {
      try {
         await axios.delete(`http://127.0.0.1:5000/service/delete/${id}`);

         const updatedServices = services.filter(
            (service) => service.id !== id
         );
         setServices(updatedServices);

         {
            Platform.OS == "web"
               ? alert("El servicio se ha elimiando.")
               : Alert.alert("El servicio se ha elimiando.");
         }
      } catch (error) {
         {
            Platform.OS == "web"
               ? alert("El servicio aún tiene ordenes por atender.")
               : Alert.alert("El servicio aún tiene ordenes por atender.");
         }

         console.error("Hay un error", error);
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
                     ? styles.card
                     : { ...styles.card, marginTop: 30 }
               }
            >
               <View style={styles.titleContainer}>
                  <Text
                     style={
                        Platform.OS == "web"
                           ? styles.titleWeb
                           : styles.titleMobile
                     }
                  >
                     Servicios
                  </Text>

                  <Pressable
                     style={styles.iconPressable}
                     onPress={() => {
                        navigate.dispatch(DrawerActions.toggleDrawer());
                     }}
                  >
                     <FontAwesome5 name="bars" size={30} color="#376CE4" />
                  </Pressable>
               </View>

               <View style={styles.addButtonContainer}>
                  <Pressable
                     style={styles.add}
                     onPress={() => {
                        navigate.navigate("CreateService");
                     }}
                  >
                     <Text style={styles.editDeleteText}>Agregar Servicio</Text>
                  </Pressable>
               </View>

               {services?.map((service, index) => (
                  <Card style={styles.clientCard} key={index}>
                     <Text style={styles.clientTitle}>
                        Servicio No. {service.id}
                     </Text>
                     <Text style={styles.clientText}>
                        Tipo de Prenda: {service.name}
                     </Text>
                     <Text style={styles.clientText}>
                        Descripción: {service.description}
                     </Text>
                     <Text style={styles.clientText}>
                        Precio del Servicio: {service.price}
                     </Text>

                     <View style={styles.clientButtons}>
                        <Pressable
                           style={styles.edit}
                           onPress={() => {
                              setUpdatedService(service);
                              setModalVisible(true);
                           }}
                        >
                           <Text style={styles.editDeleteText}>Editar</Text>
                           <View style={styles.iconPressable}>
                              <FontAwesome5
                                 name="edit"
                                 size={14}
                                 color="white"
                              />
                           </View>
                        </Pressable>

                        <Pressable
                           style={styles.delete}
                           onPress={() => {
                              deleteService(service.id);
                           }}
                        >
                           <Text style={styles.editDeleteText}>Borrar</Text>
                           <View style={styles.iconPressable}>
                              <FontAwesome5
                                 name="trash"
                                 size={14}
                                 color="white"
                              />
                           </View>
                        </Pressable>
                     </View>
                  </Card>
               ))}
            </Card>
         </View>

         <EditServiceModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            service={updatedService}
            onChange={setUpdatedService}
            onSave={handleUpdateGarment}
         />
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

   card: {
      width: "95%",
      backgroundColor: "#fff",
      padding: 20,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginBottom: 100,
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

   clientCard: {
      backgroundColor: "#DC6629",
      padding: 10,
      marginBottom: 10,
   },

   clientTitle: {
      color: "white",
      fontSize: 18,
      fontWeight: 600,
      marginBottom: 5,
   },

   clientText: {
      color: "white",
      marginBottom: 5,
   },

   clientButtons: {
      justifyContent: "flex-end",
      flexDirection: "row",
      gap: 10,
   },

   edit: {
      backgroundColor: "#376CE4",
      flexDirection: "row",
      borderRadius: 5,
      padding: 7,
      gap: 10,
   },

   editDeleteText: {
      color: "white",
      fontWeight: 500,
      alignSelf: "center",
   },

   delete: {
      backgroundColor: "red",
      flexDirection: "row",
      borderRadius: 5,
      padding: 7,
      gap: 10,
   },

   addButtonContainer: {
      justifyContent: "flex-end",
      flexDirection: "row",
      margin: 10,
   },

    add: {
      backgroundColor: "green",
      alignSelf: "center",
      borderRadius: 5,
      padding: 7,
   },
});
