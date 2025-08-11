import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
   SafeAreaView,
   Pressable,
   StyleSheet,
   Alert,
   Platform,
   View,
} from "react-native";
import axios from "axios";
import { Card, Text, TextInput } from "react-native-paper";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function CreateClient() {
   const navigation = useNavigation();

   const [data, setData] = useState({
      name: "",
      phone_number: "",
      address: "",
   });

   const onChangeData = (key, value) => {
      const client = { ...data };

      if (client) {
         client[key] = value;
      }

      setData(client);
   };

   async function createNewClient() {
      try {
         const res = await axios.post(
            "http://127.0.0.1:5000/clients/create",
            data
         );

         if (res.status == 200) {
            {
               Platform.OS == "web"
                  ? alert("Se ha creado el usuario.")
                  : Alert.alert("Se ha creado el usuario.");
            }
            navigation.navigate("ListClients");
         } else {
            {
               Platform.OS == "web"
                  ? alert(
                       "Ha ocurrido un error al momento de crear al cliente."
                    )
                  : Alert.alert(
                       "Ha ocurrido un error al momento de crear al cliente."
                    );
            }
         }
      } catch (error) {
         console.error(error);
      }
   }

   return (
      <SafeAreaView style={styles.container}>
         <Card style={styles.card}>
            <View style={styles.titleContainer}>
               <Pressable
                  onPress={() => {
                     navigation.navigate("ListClients");
                  }}
               >
                  <FontAwesome5
                     name="arrow-left"
                     size={Platform.OS == "web" ? 24 : 16}
                     color="#376CE4"
                  />
               </Pressable>

               <Text style={styles.title}>Crear Cliente</Text>
            </View>

            <Text style={styles.label}>Nombre(s)</Text>
            <TextInput
               activeUnderlineColor="#5A3B32"
               placeholderTextColor="#5A3B32"
               underlineColor="#5A3B32"
               style={styles.textInput}
               onChangeText={(text) => onChangeData("name", text)}
            />

            <Text style={styles.label}>Dirección</Text>
            <TextInput
               activeUnderlineColor="#5A3B32"
               placeholderTextColor="#5A3B32"
               underlineColor="#5A3B32"
               style={styles.textInput}
               onChangeText={(text) => onChangeData("address", text)}
            />

            <Text style={styles.label}>Número Telefónico</Text>
            <TextInput
               activeUnderlineColor="#5A3B32"
               placeholderTextColor="#5A3B32"
               underlineColor="#5A3B32"
               style={styles.textInput}
               onChangeText={(text) => onChangeData("phone_number", text)}
            />

            <Pressable style={styles.button} onPress={createNewClient}>
               <Text style={styles.buttonText}>Crear Cliente</Text>
            </Pressable>
         </Card>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#eeeeee",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 20,
   },

   card: {
      width: "95%",
      backgroundColor: "#fff",
      padding: 20,
      paddingHorizontal: 20,
      borderRadius: 15,
   },

   title: {
      color: "#376CE4",
      fontSize: 32,
      fontWeight: 700,
      marginBottom: 20,
   },

   titleContainer: {
      flexDirection: "row",
      gap: "2%",
   },

   label: {
      fontSize: 18,
      marginTop: 10,
      color: "#5A3B32",
      paddingLeft: 10,
   },

   textInput: {
      height: 30,
      backgroundColor: "#eeeeee",
      marginBottom: 5,
   },

   button: {
      marginTop: 25,
      backgroundColor: "#376CE4",
      padding: 7,
      borderRadius: 5,
   },

   buttonText: {
      color: "white",
      textAlign: "center",
      fontSize: 20,
      fontWeight: 500,
   },
});
