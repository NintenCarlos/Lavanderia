import { Modal, View, StyleSheet, Pressable } from "react-native";
import { Card, Text, TextInput } from "react-native-paper";

export default function EditClientModal({
   visible,
   onClose,
   client,
   onChange,
   onSave,
}) {
   return (
      <Modal visible={visible} transparent onRequestClose={onClose}>
         <View style={styles.container}>
            <Card style={styles.card}>
               <Text style={styles.title}>Editar Cliente</Text>

               <Text style={styles.label}>Nombre(s)</Text>
               <TextInput
                  activeUnderlineColor="#5A3B32"
                  placeholderTextColor="#5A3B32"
                  underlineColor="#5A3B32"
                  style={styles.textInput}
                  value={client.name}
                  onChangeText={(text) => onChange({ ...client, name: text })}
               />

               <Text style={styles.label}>Dirección</Text>
               <TextInput
                  activeUnderlineColor="#5A3B32"
                  placeholderTextColor="#5A3B32"
                  underlineColor="#5A3B32"
                  style={styles.textInput}
                  value={client.address}
                  onChangeText={(text) =>
                     onChange({ ...client, address: text })
                  }
               />

               <Text style={styles.label}>Telefóno</Text>
               <TextInput
                  style={styles.textInput}
                  activeUnderlineColor="#5A3B32"
                  placeholderTextColor="#5A3B32"
                  underlineColor="#5A3B32"
                  value={client.phone_number}
                  onChangeText={(text) =>
                     onChange({ ...client, phone_number: text })
                  }
               />

               <View style={styles.buttonContainer}>
                  <Pressable style={styles.save} onPress={onSave}>
                     <Text style={styles.buttonText}>Guardar</Text>
                  </Pressable>
                  <Pressable style={styles.cancel} onPress={onClose}>
                     <Text style={styles.buttonText}>Cancelar</Text>
                  </Pressable>
               </View>
            </Card>
         </View>
      </Modal>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#45B7BD",
      alignItems: "center",
      justifyContent: "center",
   },
   card: {
      width: "90%",
      backgroundColor: "#fff",
      borderRadius: 15,
      padding: 20,
   },
   title: {
      fontSize: 32,
      fontWeight: 700,
      marginBottom: 15,
      color: "#376CE4",
      paddingLeft: 10,
   },

   label: {
      fontSize: 18,
      marginTop: 15,
      color: "#5A3B32",
      paddingLeft: 10,
   },

   textInput: {
      height: 30,
      backgroundColor: "#eeeeee",
      marginTop: 5,
   },

   buttonContainer: {
      marginTop: 20,
      flexDirection: "row",
      justifyContent: "space-around",
   },

   save: {
      backgroundColor: "green",
      borderRadius: 5,
      padding: 7,
   },

   cancel: {
      backgroundColor: "red",
      borderRadius: 5,
      padding: 7,
   },

   buttonText: {
      color: "white",
      fontWeight: 500,
   },
});
