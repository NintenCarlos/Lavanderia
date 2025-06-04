import { useNavigation } from "@react-navigation/native";
import {
   Pressable,
   SafeAreaView,
   StyleSheet,
   Text,
   TextInput,
   View,
} from "react-native";




export default function Login() {
    const navigation = useNavigation(); 
    const goToHome = () =>  {
        navigation.navigate('Home')
    }

   return (
      <SafeAreaView style={styles.container}>
         <View style={styles.loginContainer}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <Text style={styles.label}>Correo Electrónico</Text>
            <TextInput style={styles.form} />

            <Text style={styles.label}>Contraseña</Text>
            <TextInput style={styles.form} />

            <Pressable style={styles.loginButton} onPress={goToHome} >
               <Text style={styles.loginButton.loginButtonText}>
                  Iniciar Sesión
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
      padding: 150,
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
      borderRadius: 20,
      paddingHorizontal: 10,
      marginBottom: 20,
      height: 40,
      fontSize: 17,
   },

   loginButton: {
      backgroundColor: "#2e4957",
      paddingVertical: 10,
      borderRadius: 20,

      loginButtonText: {
         color: "white",
         textAlign: "center",
         fontSize: 20,
         fontWeight: 700,
      },
   },
});
