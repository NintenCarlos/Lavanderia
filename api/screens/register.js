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

export default function Login() {
   const navigation = useNavigation();

   const [data, setData] = useState({
      name: "",
      email: "",
      password: "",
      rol: "empleado",
   });

   const [rol, setRol] = useState("");

   const settingData = (field, value) => {
      setData((prev) => ({
         ...prev,
         [field]: value,
      }));
   };

   async function loginUser() {
      try {
         const res = await fetch(
            "https://f2rrdchq-5000.usw3.devtunnels.ms/users/register",
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({ ...data, rol }),
            }
         );

         if (res.ok) {
            Alert.alert("Se ha creado el usuario");
            navigation.navigate("Login");
         } else {
            Alert.alert("Hubo un error");
         }
      } catch (error) {
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
               onChangeText={(text) => settingData("name", text)}
            />

            <Text style={styles.label}>Correo Electrónico</Text>
            <TextInput
               style={styles.form}
               onChangeText={(text) => settingData("email", text)}
            />

            <Text style={styles.label}>Contraseña</Text>
            <TextInput
               style={styles.form}
               onChangeText={(text) => settingData("password", text)}
            />

            <Text style={styles.label}>Rol del empleado</Text>
            <Picker
               style={Platform.OS == "web" ? styles.form : {marginBottom: 20}}
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
