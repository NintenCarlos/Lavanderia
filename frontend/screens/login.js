import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import {
   Pressable,
   SafeAreaView,
   StyleSheet,
   Text,
   TextInput,
   Alert,
   KeyboardAvoidingView,
   Platform,
} from "react-native";
import { Card } from "react-native-paper";

export default function Login() {
   const navigation = useNavigation();

   const [data, setData] = useState({
      email: "",
      password: "",
   });

   const settingData = (field, value) => {
      setData((prev) => ({
         ...prev,
         [field]: value,
      }));
   };

   async function loginUser() {
      try {
         const res = await axios.post(
            "http://127.0.0.1:5000/users/login",
            data
         );

         if (res.status == 200) {
            {
               Platform.OS == 'web'? 
               alert("Inicio de sesión corrercto."): 
               Alert.alert("Inicio de sesión correcto.")
            }

            navigation.navigate("Dashboard");
         } else {
            {
               Platform.OS == "web"
                  ? alert("Hubo un error al iniciar sesión.")
                  : Alert.alert("Hubo un error al iniciar sesión.");
            }
         }
      } catch (error) {
         console.error(error);
      }
   }

   return (
      <SafeAreaView style={styles.container}>
         <KeyboardAvoidingView>
            <Card
               style={
                  Platform.OS === "web"
                     ? styles.containerWeb
                     : styles.containerMobile
               }
            >
               <Text style={styles.title}>Lavandería</Text>
               <Text style={Platform.OS == 'web'? styles.labelWeb : styles.labelMobile}>Correo Electrónico</Text>
               <TextInput
                  style={styles.form}
                  onChangeText={(text) => settingData("email", text)}
               />

               <Text style={Platform.OS == 'web'? styles.labelWeb : styles.labelMobile}>Contraseña</Text>
               <TextInput
                  style={styles.form}
                  onChangeText={(text) => settingData("password", text)}
                  secureTextEntry={true}
               />

               <Pressable style={styles.loginButton} onPress={loginUser}>
                  <Text style={styles.loginButton.loginButtonText}>
                     Iniciar Sesión
                  </Text>
               </Pressable>

               <Pressable
                  onPress={() => {
                     navigation.navigate("Register");
                  }}
               >
                  <Text style={styles.registerLink}>
                     ¿No tienes una cuenta?. ¡Registrate!
                  </Text>
               </Pressable>
            </Card>
         </KeyboardAvoidingView>
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
      color: '#5A3B32'
   },

   labelMobile: {
      textAlign: "center",
      fontSize: 18,
      marginBottom: 10,
      color: '#5A3B32'
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

   loginButton: {
      backgroundColor: "#376CE4",
      paddingVertical: 10,
      borderRadius: 20,

      loginButtonText: {
         color: "white",
         textAlign: "center",
         fontSize: 20,
         fontWeight: 500,
      },
   },

   registerLink: {
      color: "#5A3B32",
      marginTop: 10,
      fontWeight: 400,
      fontSize: 15,
      textAlign: "center",
   },
});
