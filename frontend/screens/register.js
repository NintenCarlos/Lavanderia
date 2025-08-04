import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
   Pressable,
   SafeAreaView,
   StyleSheet,
   Text,
   TextInput,
   Alert,
   Platform,
} from "react-native";
import axios from "axios";
import { Card } from "react-native-paper";

export default function Register() {
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

         navigation.navigate("Login");
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
         <Card
            style={
               Platform.OS == "web"
                  ? styles.ContainerWeb
                  : styles.containerMobile
            }
         >
            <Text style={styles.title}>Registrarse</Text>

            <Text style={Platform.OS == 'web' ? styles.labelWeb : styles.labelMobile}>Nombre</Text>
            <TextInput
               style={styles.form}
               onChangeText={(text) => onChangeData("name", text)}
            />

            <Text style={Platform.OS == 'web' ? styles.labelWeb : styles.labelMobile}>Correo Electrónico</Text>
            <TextInput
               style={styles.form}
               onChangeText={(text) => onChangeData("email", text)}
            />

            <Text style={Platform.OS == 'web' ? styles.labelWeb : styles.labelMobile}>Contraseña</Text>
            <TextInput
               style={styles.form}
               onChangeText={(text) => onChangeData("password", text)}
               secureTextEntry
            />

            <Text style={Platform.OS == 'web' ? styles.labelWeb : styles.labelMobile}>Rol del empleado</Text>
            <Picker
               style={Platform.OS == "web" ? styles.form : { marginBottom: 20 }}
               onValueChange={(value) => {
                  onChangeData("rol", value);
               }}
            >
               <Picker.Item label="Empleado" value="empleado" />
               <Picker.Item label="Administrador" value="administrador" />
            </Picker>

            <Pressable style={styles.button} onPress={loginUser}>
               <Text style={styles.buttonText}>
                  Registrate
               </Text>
            </Pressable>

            <Pressable
               onPress={() => {
                  navigation.navigate("Login");
               }}
            >
               <Text style={styles.registerLink}>
                  ¿Ya tienes una cuenta? !Inicia sesión!
               </Text>
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
   },

   ContainerWeb: {
      backgroundColor: "#fff",
      padding: 100,
      paddingHorizontal: 100,
      borderRadius: 15,
   },

   containerMobile: {
      backgroundColor: "#fff",
      padding: 50,
      borderRadius: 15,
   },

   title: {
      color: "#376CE4",
      fontSize: 40,
      fontWeight: 700,
      textAlign: "center",
      marginBottom: 20,
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
   
   registerLink: {
      color: "#5A3B32",
      marginTop: 10,
      fontWeight: 400,
      fontSize: 15,
      textAlign: 'center'
   },
});
