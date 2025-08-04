import {
   Modal,
   View,
   Text,
   TextInput,
   StyleSheet,
   Pressable,
} from "react-native";

export default function EditServiceModal({
   visible,
   onClose,
   service,
   onChange,
   onSave,
}) {
   return (
      <Modal visible={visible} transparent onRequestClose={onClose}>
         <View style={styles.container}>
            <View style={styles.card}>
               <Text style={styles.title}>Editar Servicio</Text>

               <Text style={styles.label}>Nombre del Servicio</Text>
               <TextInput
                  style={styles.form}
                  placeholder="Nombre del Servicio"
                  value={service.name}
                  onChangeText={(text) => onChange({ ...service, name: text })}
               />

               <Text style={styles.label}>Descripción breve del servcio</Text>
               <TextInput
                  style={styles.form}
                  placeholder="Descripción"
                  value={service.description}
                  onChangeText={(text) =>
                     onChange({ ...service, description: text })
                  }
               />

               <Text style={styles.label}>Precio del servicio</Text>
               <TextInput
                  style={styles.form}
                  placeholder="Precio"
                  value={service.price}
                  onChangeText={(text) =>
                     onChange({ ...service, price: text })
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
