import { useState } from "react";
import {
   View,
   Text,
   ScrollView,
   TouchableOpacity,
   StyleSheet,
   TextInput,
   Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Button, Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import constants from "../constants";

const { garments, services } = constants;

const CreateOrder = () => {
   const defaultGarment = {
      type: "Camisa",
      description: "",
      observations: "",
      services: [{ ...services[0] }],
   };

   const [order, setOrder] = useState({
      client_id: 0,
      user_id: 0,
      state: "recibido",
      total: 0,
      pagado: false,
      garments: [{ ...defaultGarment }],
   });

   const [total, setTotal] = useState(0);

   const calculateTotal = () => {
      let subTotal = 0;
      const data = { ...order };
      if (data.garments) {
         for (const garment of data.garments) {
            for (const service of garment.services) {
               subTotal += service.quantity * service.unitPrice;
            }
         }
      }
      setTotal(subTotal);
   };

   const addGarment = () => {
      const data = { ...order };
      data.garments.push({ ...defaultGarment });
      setOrder(data);
   };

   const onChangeService = (value, ig, is) => {
      const data = { ...order };
      const newService = services.find((s) => s.name === value);
      if (data.garments && data.garments[ig] && newService) {
         data.garments[ig].services[is] = { ...newService };
      }
      setOrder(data);
      onChangeServiceFields("name", value, ig, is);
   };

   const addServiceToGarment = (ig) => {
      const data = { ...order };
      if (data.garments && data.garments[ig]) {
         data.garments[ig].services.push({ ...services[0] });
      }
      setOrder(data);
   };

   const deleteServiceToGarment = (ig, is) => {
      const data = { ...order };
      if (data.garments && data.garments[ig]) {
         data.garments[ig].services = data.garments[ig].services.filter(
            (_, i) => i !== is
         );
      }
      setOrder(data);
   };

   const deleteGarment = (ig) => {
      const data = { ...order };
      if (data.garments && data.garments[ig]) {
         data.garments = data.garments.filter((_, i) => i !== ig);
      }
      setOrder(data);
   };

   const onChangeGarment = (key, value, ig) => {
      const data = { ...order };
      if (data.garments) {
         data.garments[ig][key] = value;
      }
      setOrder(data);
   };

   const onChangeServiceFields = (key, value, ig, is) => {
      const data = { ...order };
      if (data.garments) {
         if (key === "name") {
            data.garments[ig].services[is][key] = value;
         } else {
            data.garments[ig].services[is][key] = parseFloat(value) || 0;
         }
      }
      setOrder(data);
   };

   return (
      <View>
         <ScrollView style={styles.container}>
            <Card style={{ marginBottom: 30, marginTop: 30 }}>
               <Text style={styles.title}>Creación de Orden</Text>
               <Card.Content>
                  <Button
                     mode="contained"
                     onPress={addGarment}
                     style={styles.addButton}
                  >
                     Agregar Prenda
                  </Button>

                  <Text style={styles.subtitle}>Prendas:</Text>

                  {order.garments?.map((garment, i) => (
                     <View key={`garment-${i}`} style={styles.garmentContainer}>
                        {i > 0 && (
                           <TouchableOpacity
                              style={styles.deleteButton}
                              onPress={() => deleteGarment(i)}
                           >
                              <Icon name="delete" size={24} color="red" />
                           </TouchableOpacity>
                        )}

                        <Text style={styles.garmentTitle}>
                           Prenda No.{i + 1}
                        </Text>

                        <View style={styles.row}>
                           <View style={styles.column}>
                              <Text style={styles.label}>Tipo de prenda:</Text>
                              <Picker
                                 selectedValue={garment.type}
                                 onValueChange={(value) =>
                                    onChangeGarment("type", value, i)
                                 }
                                 style={
                                    Platform.OS == "web"
                                       ? styles.picker
                                       : { marginBottom: 10 }
                                 }
                              >
                                 {garments.map((g, index) => (
                                    <Picker.Item
                                       key={`garment-${index}`}
                                       label={g}
                                       value={g}
                                    />
                                 ))}
                              </Picker>
                           </View>

                           <View style={styles.column}>
                              <Text style={styles.label}>Descripción:</Text>
                              <TextInput
                                 style={styles.input}
                                 value={garment.description}
                                 onChangeText={(text) =>
                                    onChangeGarment("description", text, i)
                                 }
                                 placeholder="Descripción"
                              />
                           </View>
                        </View>

                        <View style={styles.column}>
                           <Text style={styles.label}>Observaciones:</Text>
                           <TextInput
                              style={styles.input}
                              value={garment.observations}
                              onChangeText={(text) =>
                                 onChangeGarment("observations", text, i)
                              }
                              placeholder="Observaciones"
                           />
                        </View>

                        <Text style={styles.servicesTitle}>Servicios:</Text>

                        {garment.services.map((service, is) => (
                           <View
                              key={`service-${is}`}
                              style={styles.serviceContainer}
                           >
                              {is > 0 && (
                                 <TouchableOpacity
                                    style={styles.deleteServiceButton}
                                    onPress={() =>
                                       deleteServiceToGarment(i, is)
                                    }
                                 >
                                    <Icon name="close" size={20} color="red" />
                                 </TouchableOpacity>
                              )}

                              <Text style={styles.label}>Servicio:</Text>
                              <Picker
                                 selectedValue={service.name}
                                 onValueChange={(value) =>
                                    onChangeService(value, i, is)
                                 }
                                 style={
                                    Platform.OS == "web"
                                       ? styles.picker
                                       : { marginBottom: 10 }
                                 }
                              >
                                 {services.map((s, index) => (
                                    <Picker.Item
                                       key={`service-${index}`}
                                       label={s.name}
                                       value={s.name}
                                    />
                                 ))}
                              </Picker>

                              <Text style={styles.label}>Cantidad:</Text>
                              <TextInput
                                 style={styles.input}
                                 keyboardType="numeric"
                                 value={service.quantity.toString()}
                                 onChangeText={(text) =>
                                    onChangeServiceFields(
                                       "quantity",
                                       text,
                                       i,
                                       is
                                    )
                                 }
                              />

                              {service.name == "Lavado" ||
                              service.name == "Planchado" ? (
                                 <>
                                    <Text style={styles.label}>Precio:</Text>
                                    <Text style={styles.subtitle}>
                                       {service.unitPrice}
                                    </Text>
                                 </>
                              ) : (
                                 <>
                                    <Text style={styles.label}>Precio:</Text>
                                    <TextInput
                                       style={styles.input}
                                       keyboardType="numeric"
                                       value={service.unitPrice.toString()}
                                       onChangeText={(text) =>
                                          onChangeServiceFields(
                                             "unitPrice",
                                             text,
                                             i,
                                             is
                                          )
                                       }
                                    />
                                 </>
                              )}
                           </View>
                        ))}

                        <Button
                           mode="outlined"
                           onPress={() => addServiceToGarment(i)}
                           style={styles.addServiceButton}
                        >
                           Agregar Servicio
                        </Button>
                     </View>
                  ))}

                  <View style={styles.totalContainer}>
                     <Text style={styles.subtotal}>
                        Subtotal: ${(total / 1.16).toFixed(2)}
                     </Text>
                     <Text style={styles.subtotal}>
                        IVA: ${(total - total / 1.16).toFixed(2)}
                     </Text>
                     <Text style={styles.total}>
                        Total: ${total.toFixed(2)}
                     </Text>
                     <Button
                        mode="contained"
                        onPress={calculateTotal}
                        style={styles.calculateButton}
                     >
                        Calcular Total
                     </Button>
                  </View>
               </Card.Content>
            </Card>
         </ScrollView>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#c8dfe2",
      padding: 16,
   },
   title: {
      marginTop: 10,
      fontSize: 22,
      fontWeight: "700",
      color: "#2e4957",
      marginBottom: 7,
      textAlign: "center",
   },
   subtitle: {
      fontSize: 18,
      color: "#2e4957",
      marginVertical: 10,
   },
   garmentContainer: {
      backgroundColor: "#fff",
      borderRadius: 20,
      padding: 16,
      marginBottom: 12,
      shadowColor: "#000",
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.2,
   },
   garmentTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: "#2e4957",
      marginBottom: 8,
   },
   input: {
      borderColor: "#2e4957",
      borderWidth: 1,
      borderRadius: 15,
      paddingHorizontal: 10,
      height: 40,
      fontSize: 15,
      color: "#2e4957",
      marginVertical: 6,
   },
   deleteButton: {
      alignSelf: "flex-end",
      marginBottom: 6,
   },
   deleteButtonText: {
      color: "#2e4957",
      fontWeight: "700",
   },
   servicesTitle: {
      marginTop: 10,
      fontWeight: "700",
      fontSize: 16,
      color: "#2e4957",
   },
   serviceContainer: {
      backgroundColor: "#e7f0f3",
      borderRadius: 15,
      padding: 10,
      marginVertical: 8,
   },
   closeButton: {
      alignSelf: "flex-end",
   },
   closeButtonText: {
      color: "#2e4957",
      fontSize: 18,
      fontWeight: "700",
   },
   total: {
      fontSize: 20,
      fontWeight: "700",
      margin: 10,
      textAlign: "center",
      color: "#2e4957",
   },

   subtotal: {
      fontSize: 16,
      fontWeight: "500",
      margin: 5,
      textAlign: "center",
      color: "#2e4957",
   },
   addButton: {
      backgroundColor: "#2e4957",
      borderRadius: 20,
      marginTop: 10,
   },
   addButtonText: {
      color: "white",
      textAlign: "center",
      fontSize: 16,
      fontWeight: "700",
   },

   picker: {
      borderColor: "#2e4967",
      borderWidth: 1,
      borderRadius: 15,
      paddingHorizontal: 10,
      marginBottom: 10,
      height: 40,
      fontSize: 15,
      color: "#2e4957",
      justifyContent: "center",
      backgroundColor: "#fff",
   },
});

export default CreateOrder;
