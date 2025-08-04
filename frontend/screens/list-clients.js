import React, { useEffect, useState } from "react";
import {
   View,
   Text,
   StyleSheet,
   Pressable,
   ScrollView,
   Platform,
   Alert,
} from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import axios from "axios";
import { Card } from "react-native-paper";
import EditClientModal from "../extras/EditClient";

export default function ListClients() {
   const [clients, setClients] = useState([
      {
         id: 1,
         name: "Jorge Nitales",
         address: "El centro",
         phone_number: "449 123 4567",
      },
   ]);

   const navigate = useNavigation();

   const [modalVisible, setModalVisible] = useState(false);
   const [updatedClient, setUpdatedClient] = useState({
      id: null,
      name: "",
      address: "",
      phone_number: "",
   });

   useEffect(() => {
      getClients();
   }, []);

   const getClients = async () => {
      const { data } = await axios.get("http://127.0.0.1:5000/clients/search");

      console.log(data);
      setClients(data);
   };

   const handleUpdateClient = async () => {
      try {
         await axios.put(
            `http://127.0.0.1:5000/clients/update/${updatedClient.id}`,
            updatedClient
         );

         const updatedList = clients.map((client) =>
            client.id === updatedClient.id ? updatedClient : client
         );
         setClients(updatedList);
         setModalVisible(false);

         Platform.OS === "web"
            ? alert("Cliente actualizado correctamente.")
            : Alert.alert("Cliente actualizado correctamente.");
      } catch (error) {
         console.error("Error al actualizar cliente:", error);
      }
   };

   const deleteClient = async (id) => {
      try {
         await axios.delete(`http://127.0.0.1:5000/clients/delete/${id}`);

         const updatedClients = clients.filter((client) => client.id !== id);
         setClients(updatedClients);

         {
            Platform.OS == "web"
               ? alert("El cliente se ha elimiando.")
               : Alert.alert("El cliente se ha elimiando.");
         }
      } catch (error) {
         {
            Platform.OS == "web"
               ? alert("El cliente aún tiene ordenes por atender.")
               : Alert.alert("El cliente aún tiene ordenes por atender.");
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
                     ? styles.containerWeb
                     : { ...styles.containerMobile, marginTop: 30 }
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
                     Clientes
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
                        navigate.navigate("CreateClient");
                     }}
                  >
                     <Text style={styles.editDeleteText}>Agregar Cliente</Text>
                  </Pressable>
               </View>

               {clients?.map((client, index) => (
                  <Card style={styles.clientCard} key={index}>
                     <Text style={styles.clientTitle}>
                        Cliente No. {client.id}
                     </Text>
                     <Text style={styles.clientText}>
                        Nombre: {client.name}
                     </Text>
                     <Text style={styles.clientText}>
                        Dirección: {client.address}
                     </Text>
                     <Text style={styles.clientText}>
                        Teléfono: {client.phone_number}
                     </Text>

                     <View style={styles.clientButtons}>
                        <Pressable
                           style={styles.edit}
                           onPress={() => {
                              setUpdatedClient(client);
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
                              deleteClient(client.id);
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

         <EditClientModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            client={updatedClient}
            onChange={setUpdatedClient}
            onSave={handleUpdateClient}
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

   containerWeb: {
      width: "95%",
      backgroundColor: "#fff",
      padding: 20,
      paddingHorizontal: 100,
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

   titleWeb: {
      color: "#376CE4",
      fontSize: 40,
      fontWeight: 700,
      marginVertical: 10,
   },

   titleMobile: {
      color: "#376CE4",
      fontSize: 28,
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
      marginBottom: 2,
   },

   clientButtons: {
      justifyContent: "flex-end",
      flexDirection: "row",
      gap: 10,
   },

   edit: {
      backgroundColor: "#376CE4",
      flexDirection: "row",
      borderRadius: 15,
      padding: 10,
      gap: 10,
   },

   editDeleteText: {
      color: "white",
      fontWeight: 500,
   },

   delete: {
      backgroundColor: "red",
      flexDirection: "row",
      borderRadius: 15,
      padding: 10,
      gap: 10,
   },

   addButtonContainer: {
      justifyContent: "flex-end",
      flexDirection: "row",
      margin: 10,
   },

   add: {
      backgroundColor: "green",
      flexDirection: "row",
      borderRadius: 15,
      padding: 12,
      gap: 10,
   },
});
