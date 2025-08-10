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

export default function CreateGarment() {
   const navigation = useNavigation();

   const [data, setData] = useState({
      type: "",
      description: "",
      observation: "",
   });

   const settingData = (field, value) => {
      setData((prev) => ({
         ...prev,
         [field]: value,
      }));
   };

   async function createNewGarment() {
      try {
         const res = await axios.post(
            "http://127.0.0.1:5000/garments/create",
            data
         );

         if (res.status == 200) {
            {
               Platform.OS == "web"
                  ? alert("Se ha creado la prenda.")
                  : Alert.alert("Se ha creado la prenda.");
            }
            navigation.navigate("ListGarments");
         } else {
            {
               Platform.OS == "web"
                  ? alert(
                       "Ha ocurrido un error al momento de crear la prenda."
                    )
                  : Alert.alert(
                       "Ha ocurrido un error al momento de crear la prenda."
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

      
               <Pressable onPress={(()=>{navigation.navigate('ListGarments')})} >
                  <FontAwesome5 name="arrow-left" size={20} color="#5A3B32" />
               </Pressable>

            <Text  style={
                  Platform.OS == "web" ? styles.titleWeb : styles.titleMobile
               }>Crear Prenda</Text>

            <Text
               style={
                  Platform.OS == "web" ? styles.labelWeb : styles.labelMobile
               }
            >
               Tipo de Prenda
            </Text>
            <TextInput
               style={styles.form}
               value={data.type}
               onChangeText={(text) => settingData("type", text)}
            />

            <Text
               style={
                  Platform.OS == "web" ? styles.labelWeb : styles.labelMobile
               }
            >
               Descripción breve de la prenda
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
               Observaciones
            </Text>
            <TextInput
               style={styles.form}
               value={data.observation}
               onChangeText={(text) => settingData("observation", text)}
            />

            <Pressable style={styles.button} onPress={createNewGarment}>
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
