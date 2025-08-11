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

export default function CreateGarment() {
   const navigation = useNavigation();

   const [data, setData] = useState({
      type: "",
      description: "",
      observation: "",
   });

   const onChangeData = (key, value) => {
      const garment = { ...data };

      if (garment) {
         garment[key] = value;
      }

      setData(garment);
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
                  ? alert("Ha ocurrido un error al momento de crear la prenda.")
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
         <Card style={styles.card}>
            <View style={styles.titleContainer}>
               <Pressable
                  onPress={() => {
                     navigation.navigate("ListGarments");
                  }}
               >
                  <FontAwesome5
                     name="arrow-left"
                     size={Platform.OS == "web" ? 24 : 16}
                     color="#376CE4"
                  />
               </Pressable>

               <Text style={styles.title}>Crear Prenda</Text>
            </View>

            <Text style={styles.label}>Tipo de Prenda</Text>
            <TextInput
               activeUnderlineColor="#5A3B32"
               placeholderTextColor="#5A3B32"
               underlineColor="#5A3B32"
               style={styles.textInput}
               value={data.type}
               onChangeText={(text) => onChangeData("type", text)}
            />

            <Text style={styles.label}>Descripción breve de la prenda</Text>
            <TextInput
               activeUnderlineColor="#5A3B32"
               placeholderTextColor="#5A3B32"
               underlineColor="#5A3B32"
               style={styles.textInput}
               value={data.description}
               onChangeText={(text) => onChangeData("description", text)}
            />

            <Text style={styles.label}>Observaciones</Text>
            <TextInput
               activeUnderlineColor="#5A3B32"
               placeholderTextColor="#5A3B32"
               underlineColor="#5A3B32"
               style={styles.textInput}
               value={data.observation}
               onChangeText={(text) => onChangeData("observation", text)}
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
