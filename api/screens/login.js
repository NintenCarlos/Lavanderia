import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import {
   Pressable,
   SafeAreaView,
   StyleSheet,
   Text,
   TextInput,
   View,
   Alert,
   KeyboardAvoidingView,
   Platform
} from "react-native";

export default function Login() {
   const navigation = useNavigation();

   const [data, setData] = useState({
      email: '', password: ''
   });

   const settingData = (field, value) => {
      setData((prev) => ({
         ...prev,
         [field]: value,
      }));
   };

   async function loginUser() {
      try {
         const res = await axios.post("https://f2rrdchq-5000.usw3.devtunnels.ms/users/login", data);

         if (res.status == 200) {
            navigation.navigate("Home");
         } else {
            {Platform.OS == 'web'? alert("Hubo un error al iniciar sesión."): Alert.alert("Hubo un error al iniciar sesión.")}
         }
      } catch (error) {
         console.error(error);
      }
   }

   return (
      <SafeAreaView style={styles.container}>
         <KeyboardAvoidingView>
            <View style={styles.loginContainer}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <Text style={styles.label}>Correo Electrónico</Text>
            <TextInput style={styles.form}  onChangeText={(text) => settingData("email", text)} />

            <Text style={styles.label}>Contraseña</Text>
            <TextInput style={styles.form}  onChangeText={(text) => settingData("password", text)} secureTextEntry={true} />

            <Pressable style={styles.loginButton} onPress={loginUser}>
               <Text style={styles.loginButton.loginButtonText}>
                  Iniciar Sesión
               </Text>
            </Pressable>

            <Pressable onPress={(()=> {navigation.navigate("Register")})}>
               <Text style={styles.registerLink}>
                  ¿No tienes una cuenta?. ¡Registrate!
               </Text>
            </Pressable>
         </View>
         </KeyboardAvoidingView>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#c8dfe2",
      alignItems: "center",
      justifyContent: "center",
   },

   loginContainer: {
      backgroundColor: "#fff",
      padding: 50,
      borderRadius: 30,
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.2,
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
      marginBottom: 10,
   },

   form: {
      borderColor: "#2e4967",
      borderWidth: 1,
      borderRadius: 15,
      paddingHorizontal: 10,
      marginBottom: 20,
      height: 40,
      fontSize: 15,
   },

   loginButton: {
      backgroundColor: "#2e4957",
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
      color: "#4a5575",
      marginTop: 10,
      fontWeight: 400,
   },
});
