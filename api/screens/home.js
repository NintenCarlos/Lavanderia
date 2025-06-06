import React, { useEffect, useState } from "react";
import {
   View,
   Text,
   StyleSheet,
   SafeAreaView,
   Pressable,
   ScrollView,
   Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";

export default function Home() {
   const [clients, setClients] = useState([]);

   const [search, setSearch] = useState("");
   const [filteredClients, setFilteredClients] = useState(clients);

   const navigation = useNavigation();

   useEffect(() => {
      axios.get(`https://f2rrdchq-5000.usw3.devtunnels.ms/clients/search/name?name=${search}`)
         .then((res) => setClients(res.data))
         .catch((err) => console.error("Error al conectar:", err));
   }, []);

   useEffect(() => {
      setFilteredClients(clients);
   }, [clients]);

   const goToCreate = () => {
      navigation.navigate("Create-Client");
   };

   const  deleteClient = async (id) => {
      try {
         await axios.delete(`https://f2rrdchq-5000.usw3.devtunnels.ms/clients/delete/${id}`)

         const updatedClients = clients.filter((client) => client.id !== id)
         setClients(updatedClients)
         
      } catch (error) {
         console.error("Hay un error",error)
      }

   };

   return (
      <SafeAreaView style={styles.container}>
         <ScrollView>
            <View style={styles.navbar}>
               <Pressable onPress={goToCreate}>
                  <Text style={styles.nabvarText}>Crear Cliente</Text>
               </Pressable>
            </View>
            <View style={styles.dashboard}>
               {/* Barra de Navegación (Demás Funciones por agregar) */}

               {/* Contenido de Abajo */}
               <View style={styles.searchContainer}>
                  <TextInput
                     style={styles.searchInput}
                     placeholder="Busca por nombre"
                     value={search}
                     onChangeText={(text) => {
                        setSearch(text);

                        const filtered = clients.filter((client) => {
                           return client.name
                              .toLowerCase()
                              .includes(text.toLowerCase());
                        });

                        setFilteredClients(filtered);
                     }}
                  />
                  <FontAwesome5 name="search" size={30} color="#375261" />
               </View>

               <View style={styles.cardsWrapper}>
                  {filteredClients.map((c, index) => {
                     return (
                        <View key={index} style={styles.notes}>
                           <Text style={styles.textNote}>Nombre: {c.name}</Text>
                           <Text style={styles.textNote}>
                              Tel: {c.phone_number}
                           </Text>
                           <Text style={styles.textNote}>
                              Dirección: {c.address}
                           </Text>

                           <View style={styles.iconContainer}>
                              <Pressable>
                                 <FontAwesome5
                                    name="edit"
                                    size={24}
                                    color="#8A804C"
                                 />
                              </Pressable>
                              <Pressable onPress={(()=> {deleteClient(c.id)})} >
                                 <FontAwesome5
                                    name="times"
                                    size={24}
                                    color="#8A804C"
                                 />
                              </Pressable>
                           </View>
                        </View>
                     );
                  })}
               </View>
            </View>
         </ScrollView>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },

   navbar: {
      backgroundColor: "#375261",
      justifyContent: "flex-end",
      paddingVertical: 30,
   },

   nabvarText: {
      color: "white",
      textAlign: "right",
      paddingHorizontal: 30,
      fontSize: 24,
      fontWeight: 500,
   },

   dashboard: {
      flex: 1,
      backgroundColor: "#eaffff",
      alignItems: "center",
   },

   cardsWrapper: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      padding: 20,
   },

   notes: {
      backgroundColor: "#FFEE8C",
      width: 150,
      height: 150,
      margin: 10,
      padding: 10,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
   },

   textNote: {
      fontSize: 15,
      color: "#8A804C",
      fontWeight: "bold",
      textAlign: "center",
   },

   iconContainer: {
      flexDirection: "row",
      paddingTop: 10,
      gap: 10,
   },

   searchContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 15,
      width: "80%",
      gap: 15,
   },

   searchInput: {
      backgroundColor: "white",
      height: 40,
      borderColor: "#375261",
      borderWidth: 1,
      borderRadius: 10,
      width: "100%",
      paddingHorizontal: 10,
   },
});
