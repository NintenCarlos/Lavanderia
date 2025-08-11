import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
   Pressable,
   SafeAreaView,
   StyleSheet,
   Alert,
   Platform,
   View,
} from "react-native";
import axios from "axios";
import { Card, Text, TextInput } from "react-native-paper";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function CreateUser() {
   const navigation = useNavigation();

   const [data, setData] = useState({
      name: "",
      email: "",
      password: "",
      rol: "empleado",
   });

   const onChangeData = (key, value) => {
      const user = { ...data };

      if (user) {
         user[key] = value;
      }

      setData(user);
   };

   async function loginUser() {
      try {
         await axios.post("http://127.0.0.1:5000/users/register", data);

         Platform.OS == "web"
            ? alert("Se ha registrado al usuario")
            : Alert.alert("Se ha registrado al usuario");

         navigation.navigate("ListUsers");
      } catch (error) {
         {
            Platform.OS == "web"
               ? alert("Hubo un error al hace el registro.")
               : Alert.alert("Hubo un error al hace el registro.");
         }
         console.error(error);
      }
   }

   return (
      <SafeAreaView style={styles.container}>
         <Card style={styles.card}>
            <View style={styles.titleContainer}>
               <Pressable
                  onPress={() => {
                     navigation.navigate("ListUsers");
                  }}
               >
                  <FontAwesome5
                     name="arrow-left"
                     size={Platform.OS == "web" ? 24 : 16}
                     color="#376CE4"
                  />
               </Pressable>
               <Text style={styles.title}>Crear Usuario</Text>
            </View>

            <Text style={styles.label}>Nombre</Text>
            <TextInput
               activeUnderlineColor="#5A3B32"
               placeholderTextColor="#5A3B32"
               underlineColor="#5A3B32"
               style={styles.textInput}
               onChangeText={(text) => onChangeData("name", text)}
            />

            <Text style={styles.label}>Correo Electrónico</Text>
            <TextInput
               activeUnderlineColor="#5A3B32"
               placeholderTextColor="#5A3B32"
               underlineColor="#5A3B32"
               style={styles.textInput}
               onChangeText={(text) => onChangeData("email", text)}
            />

            <Text style={styles.label}>Contraseña</Text>
            <TextInput
               activeUnderlineColor="#5A3B32"
               placeholderTextColor="#5A3B32"
               underlineColor="#5A3B32"
               style={styles.textInput}
               onChangeText={(text) => onChangeData("password", text)}
               secureTextEntry
            />

            <Text style={styles.label}>Rol del empleado</Text>
            <Picker
               style={
                  Platform.OS == "web"
                     ? styles.pickersWeb
                     : styles.pickersMobile
               }
               onValueChange={(value) => {
                  onChangeData("rol", value);
               }}
            >
               <Picker.Item label="Empleado" value="empleado" />
               <Picker.Item label="Administrador" value="administrador" />
            </Picker>

            <Pressable style={styles.button} onPress={loginUser}>
               <Text style={styles.buttonText}>Registrate</Text>
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

   pickersWeb: {
      borderColor: "#eee",
      backgroundColor: "#eee",
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
      height: 30,
      fontSize: 15,
   },

   pickersMobile: {
      backgroundColor: "#eee",
      borderWidth: 1,
      paddingHorizontal: 10,
      marginBottom: 10,
      height: 50,
      fontSize: 15,
   },
});
