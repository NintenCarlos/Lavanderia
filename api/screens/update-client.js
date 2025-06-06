import { Pressable, SafeAreaView, StyleSheet, Text, View, TextInput } from "react-native";

export default function UpdateClient() {
   return (
      <SafeAreaView style={styles.container}>
         <View style={styles.updateClientContainer}>
            {/* Contenido del label */}
            <Text style={styles.title}>Modificar Cliente</Text>

            <Text style={styles.label}>Nombre(s)</Text>
            <TextInput style={styles.inputs} />

            <Text style={styles.label}>Número Telefónico</Text>
            <TextInput style={styles.inputs} />

            <Text style={styles.label}>Dirección</Text>
            <TextInput style={styles.inputs} />

            <Pressable style={styles.button}>
               <Text style={styles.buttonText}>Actualizar Datos</Text>
            </Pressable>
         </View>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#c8dfe2",
   },

   updateClientContainer: {
      backgroundColor: "white",
      padding: 50,
      borderRadius: 20,
      shadowOffset: { height: 2, width: 3 },
      shadowOpacity: 0.3,
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
      fontWeight: "light",
      marginBottom: 10,
   },

   inputs: {
      borderWidth: 1,
      marginBottom: 10,
      height: 40,
      borderRadius: 15,
      paddingHorizontal: 10,
      fontSize: 15,
      borderColor: "#2e4967",
   },

   button: {
      backgroundColor: "#2e4967",
      paddingVertical: 20,
      marginTop: 10,
      borderRadius: 20,
   },

   buttonText: {
      color: "white",
      textAlign: "center",
      fontSize: 20,
      fontWeight: 500,
   },
});
