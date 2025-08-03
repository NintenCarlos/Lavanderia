import {
   Pressable,
   SafeAreaView,
   StyleSheet,
   Text,
   View,
   TextInput,
   Alert,
   Platform,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import axios from "axios";

export default function UpdateClient() {
   const route = useRoute();
   const navigation = useNavigation();
   const { client } = route.params;

   const [data, setData] = useState({
      name: client.name,
      phone_number: client.phone_number,
      address: client.address,
   });

   const updateClient = async () => {
      try {
         await axios.put(
            `https://83l3lgt8-5000.usw3.devtunnels.ms/clients/update/${client.id}`,
            data
         );

         Platform.OS == "web"
            ? alert("Cliente actualizado")
            : Alert.alert("Cliente Actualizado");
         navigation.navigate("Home");
      } catch (error) {
         Platform.OS == "web"
            ? alert("Hubo un error al actualizar al cliente.")
            : Alert.alert("Hubo un error al actualizar al cliente.");
         console.error(error);
      }
   };

   return (
      <SafeAreaView style={styles.container}>
         <View style={styles.updateClientContainer}>
            {/* Contenido del label */}
            <Text style={styles.title}>Modificar Cliente</Text>

            <Text style={styles.label}>Nombre(s)</Text>
            <TextInput
               style={styles.inputs}
               value={data.name}
               onChangeText={(text) => setData({ ...data, name: text })}
            />

            <Text style={styles.label}>Número Telefónico</Text>
            <TextInput
               style={styles.inputs}
               value={data.phone_number}
               onChangeText={(text) => setData({ ...data, phone_number: text })}
            />

            <Text style={styles.label}>Dirección</Text>
            <TextInput
               style={styles.inputs}
               value={data.address}
               onChangeText={(text) => setData({ ...data, address: text })}
            />

            <Pressable style={styles.button} onPress={updateClient}>
               <Text style={styles.buttonText}>Actualizar Datos</Text>
            </Pressable>
         </View>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#c8dfe2",
   },

   updateClientContainer: {
      backgroundColor: "white",
      padding: 50,
      borderRadius: 20,
      shadowOffset: { height: 2, width: 3 },
      shadowOpacity: 0.3,
   },

   title: {
      color: "#2e4957",
      fontSize: 36,
      fontWeight: 700,
      textAlign: "center",
      marginBottom: 20,
   },

   label: {
      textAlign: "center",
      fontSize: 16,
      fontWeight: "light",
      marginBottom: 10,
   },

   inputs: {
      borderWidth: 1,
      marginBottom: 10,
      height: 40,
      borderRadius: 15,
      paddingHorizontal: 10,
      fontSize: 15,
      borderColor: "#2e4967",
   },

   button: {
      backgroundColor: "#2e4967",
      paddingVertical: 20,
      marginTop: 10,
      borderRadius: 20,
   },

   buttonText: {
      color: "white",
      textAlign: "center",
      fontSize: 20,
      fontWeight: 500,
   },
});
