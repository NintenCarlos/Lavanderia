import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
   View,
   Text,
   SafeAreaView,
   TextInput,
   Pressable,
   StyleSheet,
   Alert,
   Platform,
} from "react-native";
import axios from "axios";

export function CreateClient() {
   const navigation = useNavigation();

   const [data, setData] = useState({
      name: "",
      phone_number: "",
      address: "",
   });

   const settingData = (field, value) => {
      setData((prev) => ({
         ...prev,
         [field]: value,
      }));
   };

   async function createNewClient() {
      try {
         const res = await axios.post("https://f2rrdchq-5000.usw3.devtunnels.ms/clients/create", data)

         if (res.status == 200) {
            {Platform.OS == "web"? alert("Se ha creado el usuario."): Alert.alert("Se ha creado el usuario.") }
            navigation.navigate("Home");
         } else {
            {Platform.OS == "web"? alert("Ha ocurrido un error al momento de crear al cliente."): Alert.alert("Ha ocurrido un error al momento de crear al cliente.") }
         }
      } catch (error) {
         console.error(error);
      }
   }

   return (
      <SafeAreaView style={styles.container}>
         <View style={styles.createClientContainer}>
            {/* Contenido del label */}
            <Text style={styles.title}>Crear Cliente</Text>

            <Text style={styles.label}>Nombre(s)</Text>
            <TextInput
               style={styles.inputs}
               value={data.name}
               onChangeText={(text) => settingData("name", text)}
            />

            <Text style={styles.label}>Número Telefónico</Text>
            <TextInput
               style={styles.inputs}
               value={data.phone_number}
               onChangeText={(text) => settingData("phone_number", text)}
            />

            <Text style={styles.label}>Dirección</Text>
            <TextInput
               style={styles.inputs}
               value={data.address}
               onChangeText={(text) => settingData("address", text)}
            />

            <Pressable style={styles.button} onPress={createNewClient}>
               <Text style={styles.buttonText}>Crear Cliente</Text>
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

   createClientContainer: {
      backgroundColor: "#fff",
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
