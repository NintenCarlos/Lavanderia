import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
   SafeAreaView,
   TextInput,
   Pressable,
   StyleSheet,
   Alert,
   Platform,
} from "react-native";
import axios from "axios";
import { Card, Text } from "react-native-paper";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function CreateService() {
   const navigation = useNavigation();

   const [data, setData] = useState({
      name: "",
      description: "",
      price: 0,
   });

   const settingData = (field, value) => {
      setData((prev) => ({
         ...prev,
         [field]: value,
      }));
   };

   async function createNewService() {
      try {
         const res = await axios.post(
            "http://127.0.0.1:5000/service/create",
            data
         );

         if (res.status == 200) {
            {
               Platform.OS == "web"
                  ? alert("Se ha creado el servicio.")
                  : Alert.alert("Se ha creado el servicio.");
            }
            navigation.navigate("ListServices");
         } else {
            {
               Platform.OS == "web"
                  ? alert(
                       "Ha ocurrido un error al momento de crear el servicio."
                    )
                  : Alert.alert(
                       "Ha ocurrido un error al momento de crear el servicio."
                    );
            }
         }
      } catch (error) {
         console.error(error);
      }
   }

   return (
      <SafeAreaView style={styles.container}>
         <Card
            style={
               Platform.OS == "web"
                  ? styles.containerWeb
                  : styles.containerMobile
            }
         >
            {/* Contenido del label */}

      
               <Pressable onPress={(()=>{navigation.navigate('ListServices')})} >
                  <FontAwesome5 name="arrow-left" size={20} color="#5A3B32" />
               </Pressable>

            <Text  style={
                  Platform.OS == "web" ? styles.titleWeb : styles.titleMobile
               }>Crear Servicio</Text>

            <Text
               style={
                  Platform.OS == "web" ? styles.labelWeb : styles.labelMobile
               }
            >
               Nombre del Servicio
            </Text>
            <TextInput
               style={styles.form}
               value={data.name}
               onChangeText={(text) => settingData("name", text)}
            />

            <Text
               style={
                  Platform.OS == "web" ? styles.labelWeb : styles.labelMobile
               }
            >
               Descripción breve del servicio
            </Text>
            <TextInput
               style={styles.form}
               value={data.description}
               onChangeText={(text) => settingData("description", text)}
            />

            <Text
               style={
                  Platform.OS == "web" ? styles.labelWeb : styles.labelMobile
               }
            >
               Precio del Servicio
            </Text>
            <TextInput
               style={styles.form}
               value={data.price}
               onChangeText={(text) => settingData("price", text)}
            />

            <Pressable style={styles.button} onPress={createNewService}>
               <Text style={styles.buttonText}>Crear Prenda</Text>
            </Pressable>
         </Card>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#eee",
      alignItems: "center",
      justifyContent: "center",
   },

   containerWeb: {
      backgroundColor: "#fff",
      padding: 100,
      paddingHorizontal: 100,
      borderRadius: 15,
   },

   containerMobile: {
      backgroundColor: "#fff",
      padding: 70,
      borderRadius: 15,
   },


   titleWeb: {
      color: "#376CE4",
      fontSize: 40,
      fontWeight: 700,
      textAlign: "center",
      marginBottom: 20,
   },

   titleMobile: {
      color: "#376CE4",
      fontSize: 30,
      fontWeight: 700,
      textAlign: "center",
      marginVertical: 10,
   },

   labelWeb: {
      textAlign: "center",
      fontSize: 18,
      marginBottom: 10,
      width: 400,
      color: "#5A3B32",
   },

   labelMobile: {
      textAlign: "center",
      fontSize: 18,
      marginBottom: 10,
      color: "#5A3B32",
   },

   form: {
      borderColor: "#376CE4",
      borderWidth: 1,
      borderRadius: 15,
      paddingHorizontal: 10,
      marginBottom: 20,
      height: 40,
      fontSize: 15,
   },

   button: {
      backgroundColor: "#376CE4",
      paddingVertical: 10,
      borderRadius: 20,
   },

   buttonText: {
      color: "white",
      textAlign: "center",
      fontSize: 20,
      fontWeight: 500,
   },
});
