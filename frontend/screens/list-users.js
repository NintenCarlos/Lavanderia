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
import EdituserModal from "../extras/EditUser";

export default function ListUsers() {
   const [users, setUsers] = useState([
      {
         id: 1,
         name: "Tío Neto",
         email: "viva_la_coca@utma.edu.mx",
         created_at: "Tue, 29 Jul 2025 12:37:51 GMT",
         rol: 'empleado'
      },
   ]);

   const navigate = useNavigation();

   const [modalVisible, setModalVisible] = useState(false);
   const [updatedUser, setUpdatedUser] = useState({
      id: null,
      name: "",
      email: "",
      created_at: "",
      rol: "empleado"
   });

   useEffect(() => {
      getUsers();
   }, []);

   const getUsers = async () => {
      const { data } = await axios.get(
         "http://127.0.0.1:5000/users/get"
      );

      console.log(data);
      setUsers(data.users);
   };

   const handleUpdateGarment = async () => {
      try {
         await axios.put(
            `http://127.0.0.1:5000/users/update/${updatedUser.id}`,
            updatedUser
         );

         const updatedList = users.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
         );

         setUsers(updatedList);
         setModalVisible(false);

         Platform.OS === "web"
            ? alert("Usuario actualizado correctamente.")
            : Alert.alert("Usuario actualizado correctamente.");
      } catch (error) {
         console.error("Error al actualizar usuario:", error);
      }
   };

   const deleteUser = async (id) => {
      try {
         await axios.delete(`http://127.0.0.1:5000/users/delete/${id}`);

         const updatedUsers = users.filter(
            (user) => user.id !== id
         );
         setUsers(updatedUsers);

         {
            Platform.OS == "web"
               ? alert("El usuario se ha elimiando.")
               : Alert.alert("El usuario se ha elimiando.");
         }
      } catch (error) {
         {
            Platform.OS == "web"
               ? alert("El usuario aún tiene ordenes por atender.")
               : Alert.alert("El usuario aún tiene ordenes por atender.");
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
                     Lista de Usuarios
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

              {/*  <View style={styles.addButtonContainer}>
                  <Pressable
                     style={styles.add}
                     onPress={() => {
                        navigate.navigate("CreateService");
                     }}
                  >
                     <Text style={styles.editDeleteText}>Agregar Servicio</Text>
                  </Pressable>
               </View> */}

               {users?.map((user, index) => (
                  <Card style={styles.clientCard} key={index}>
                     <Text style={styles.clientTitle}>
                        Usuario No. {user.id}
                     </Text>
                     <Text style={styles.clientText}>
                        Nombre: {user.name}
                     </Text>
                     <Text style={styles.clientText}>
                        Rol: {user.rol}
                     </Text>
                     <Text style={styles.clientText}>
                        Correo Electrónico: {user.email}
                     </Text>
                     <Text style={styles.clientText}>
                        Creado el: {user.created_at}
                     </Text>

                     <View style={styles.clientButtons}>
                        <Pressable
                           style={styles.edit}
                           onPress={() => {
                              setUpdatedUser(user);
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
                              deleteUser(user.id);
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

         <EdituserModal 
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            user={updatedUser}
            onChange={setUpdatedUser}
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

   containerWeb: {
      width: "95%",
      backgroundColor: "#fff",
      padding: 20,
      paddingHorizontal: 100,
      borderRadius: 15,
      marginBottom: 100,
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
