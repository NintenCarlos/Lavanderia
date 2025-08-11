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
import EditGarmentModal from "../extras/EditGarment";

export default function ListGarments() {
   const [garments, setGarments] = useState([
      {
         id: 1,
         type: "Playera del Neca",
         description: "Playera que tiene que ser lavada por los mejores.",
         observation: "N/A",
      },
   ]);

   const navigate = useNavigation();

   const [modalVisible, setModalVisible] = useState(false);
   const [updatedGarment, setUpdatedGarment] = useState({
      id: null,
      type: "",
      description: "",
      observation: "",
   });

   useEffect(() => {
      getGarments();
   }, []);

   const getGarments = async () => {
      const { data } = await axios.get(
         "http://127.0.0.1:5000/garments/get-all"
      );

      console.log(data);
      setGarments(data.garments);
   };

   const handleUpdateGarment = async () => {
      try {
         await axios.put(
            `http://127.0.0.1:5000/garments/update/${updatedGarment.id}`,
            updatedGarment
         );

         const updatedList = garments.map((garment) =>
            garment.id === updatedGarment.id ? updatedGarment : garment
         );

         setGarments(updatedList);
         setModalVisible(false);

         Platform.OS === "web"
            ? alert("Prenda actualizada correctamente.")
            : Alert.alert("Prenda actualizada correctamente.");
      } catch (error) {
         console.error("Error al actualizar prenda:", error);
      }
   };

   const deleteGarment = async (id) => {
      try {
         await axios.delete(`http://127.0.0.1:5000/garments/delete/${id}`);

         const updatedGarments = garments.filter(
            (garment) => garment.id !== id
         );
         setGarments(updatedGarments);

         {
            Platform.OS == "web"
               ? alert("La prenda se ha elimiando.")
               : Alert.alert("La prenda se ha elimiando.");
         }
      } catch (error) {
         {
            Platform.OS == "web"
               ? alert("La prenda aún tiene ordenes por atender.")
               : Alert.alert("La prenda aún tiene ordenes por atender.");
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
                     Prendas
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
                        navigate.navigate("CreateGarment");
                     }}
                  >
                     <Text style={styles.editDeleteText}>Agregar Prenda</Text>
                  </Pressable>
               </View>

               {garments?.map((garment, index) => (
                  <Card style={styles.clientCard} key={index}>
                     <Text style={styles.clientTitle}>
                        Prenda No. {garment.id}
                     </Text>
                     <Text style={styles.clientText}>
                        Tipo de Prenda: {garment.type}
                     </Text>
                     <Text style={styles.clientText}>
                        Descripción: {garment.description}
                     </Text>
                     <Text style={styles.clientText}>
                        Observaciones: {garment.observation}
                     </Text>

                     <View style={styles.clientButtons}>
                        <Pressable
                           style={styles.edit}
                           onPress={() => {
                              setUpdatedGarment(garment);
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
                              deleteGarment(garment.id);
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

         <EditGarmentModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            garment={updatedGarment}
            onChange={setUpdatedGarment}
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
      borderRadius: 15,
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
      marginTop: 5,
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
