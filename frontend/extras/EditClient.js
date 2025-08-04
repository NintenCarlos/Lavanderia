import {
   Modal,
   View,
   Text,
   TextInput,
   StyleSheet,
   Pressable,
} from "react-native";

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
            <View style={styles.card}>
               <Text style={styles.title}>Editar Cliente</Text>

               <Text style={styles.label}>Nombre(s)</Text>
               <TextInput
                  style={styles.form}
                  placeholder="Nombre"
                  value={client.name}
                  onChangeText={(text) => onChange({ ...client, name: text })}
               />

               <Text style={styles.label}>Dirección</Text>
               <TextInput
                  style={styles.form}
                  placeholder="Dirección"
                  value={client.address}
                  onChangeText={(text) =>
                     onChange({ ...client, address: text })
                  }
               />

               <Text style={styles.label}>Telefóno</Text>
               <TextInput
                  style={styles.form}
                  placeholder="Teléfono"
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
            </View>
         </View>
      </Modal>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#DC6629',
      justifyContent: "center",
      alignItems: "center",
   },
   card: {
      width: "80%",
      backgroundColor: "#fff",
      borderRadius: 15,
      padding: 20,
   },
   title: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 15,
      textAlign: "center",
      color: "#376CE4",
   },

   label: {
      fontSize: 15,
      marginBottom: 10,
      marginLeft: 10,
      color: "#5A3B32",
   },

   form: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
   },

   buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
   },

   save: {
      backgroundColor: "green",
      padding: 10,
      borderRadius: 10,
   },

   cancel: {
      backgroundColor: "red",
      padding: 10,
      borderRadius: 10,
   },

   buttonText: {
      color: "#fff",
      fontWeight: "600",
   },
});
