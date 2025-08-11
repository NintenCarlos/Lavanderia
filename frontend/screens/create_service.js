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

export default function CreateService() {
   const navigation = useNavigation();

   const [data, setData] = useState({
      name: "",
      description: "",
      price: 0,
   });

   const onChangeData = (key, value) => {
      const service = { ...data };

      if (service) {
         service[key] = value;
      }

      setData(service);
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
         <Card style={styles.card}>
            <View style={styles.titleContainer}>
               <Pressable
                  onPress={() => {
                     navigation.navigate("ListServices");
                  }}
               >
                  <FontAwesome5
                     name="arrow-left"
                     size={Platform.OS == "web" ? 24 : 16}
                     color="#376CE4"
                  />
               </Pressable>

               <Text style={styles.title}>Crear Servicio</Text>
            </View>

            <Text style={styles.label}>Nombre del Servicio</Text>
            <TextInput
               activeUnderlineColor="#5A3B32"
               placeholderTextColor="#5A3B32"
               underlineColor="#5A3B32"
               style={styles.textInput}
               value={data.name}
               onChangeText={(text) => onChangeData("name", text)}
            />

            <Text style={styles.label}>Descripción breve del servicio</Text>
            <TextInput
               activeUnderlineColor="#5A3B32"
               placeholderTextColor="#5A3B32"
               underlineColor="#5A3B32"
               style={styles.textInput}
               value={data.description}
               onChangeText={(text) => onChangeData("description", text)}
            />

            <Text style={styles.label}>Precio del Servicio</Text>
            <TextInput
               activeUnderlineColor="#5A3B32"
               placeholderTextColor="#5A3B32"
               underlineColor="#5A3B32"
               style={styles.textInput}
               value={data.price}
               onChangeText={(text) => onChangeData("price", text)}
            />

            <Pressable style={styles.button} onPress={createNewService}>
               <Text style={styles.buttonText}>Crear Servicio</Text>
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
