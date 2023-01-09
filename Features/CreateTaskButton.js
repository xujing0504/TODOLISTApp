import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";

const CreateTaskButton = ({ setModalVisible, modalVisible }) => (
  <View style={styles.bottom}>
    <Button
      title="Create Task"
      titleStyle={{ fontWeight: "500" }}
      onPress={() => setModalVisible(!modalVisible)}
      buttonStyle={{
        backgroundColor: "#E8AA42",
        borderColor: "transparent",
        borderWidth: 0,
      }}
      containerStyle={{
        height: 45,
        marginHorizontal: 50,
        marginVertical: 10,
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  bottom: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#E8AA42",
  },
});
export default CreateTaskButton;
