import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
   Pressable,
   SafeAreaView,
   StyleSheet,
   Text,
   TextInput,
   View,
   Alert,
   ScrollView,
   Platform,
} from "react-native";
import axios from "axios";


export default function Login() {
   const navigation = useNavigation();

   const [data, setData] = useState({
      name: "",
      email: "",
      password: "",
      rol: "empleado",
   });

   const [rol, setRol] = useState("");

   const onChangeData = (key, value) => {
      const user = {...data}; 

      if (user) {
         user[key] = value
      }
      
      setData(user)
      console.log(user)
   }


   async function loginUser() {
      try {
         await axios.post(
            "https://83l3lgt8-5000.usw3.devtunnels.ms/users/register",
            data
         );

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
         <View style={styles.loginContainer}>
            <Text style={styles.title}>Registrarse</Text>

            <Text style={styles.label}>Nombre</Text>
            <TextInput
               style={styles.form}
               onChangeText={(text) => onChangeData("name", text)}
            />

            <Text style={styles.label}>Correo Electrónico</Text>
            <TextInput
               style={styles.form}
               onChangeText={(text) => onChangeData("email", text)}
            />

            <Text style={styles.label}>Contraseña</Text>
            <TextInput
               style={styles.form}
               onChangeText={(text) => onChangeData("password", text)}
               secureTextEntry
            />

            <Text style={styles.label}>Rol del empleado</Text>
            <Picker
               style={Platform.OS == "web" ? styles.form : { marginBottom: 20 }}
               selectedValue={rol}
               onValueChange={(value) => {
                  setRol(value);
                  settingData("rol", value);
               }}
            >
               <Picker.Item label="Empleado" value="empleado" />
               <Picker.Item label="Administrador" value="administrador" />
            </Picker>

            <Pressable style={styles.loginButton} onPress={loginUser}>
               <Text style={styles.loginButton.loginButtonText}>
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
         </View>
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
      fontSize: 40,
      fontWeight: 700,
      textAlign: "center",
      marginBottom: 20,
   },

   label: {
      textAlign: "center",
      fontSize: 18,
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
      fontSize: 15,
   },
});
