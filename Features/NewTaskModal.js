import React from "react";
import { useDispatch } from "react-redux";
import { View, StyleSheet, Modal, SafeAreaView } from "react-native";
import Constants from "expo-constants";

import { TextInput } from "react-native";
import { Text, Button } from "@rneui/themed";

import { addNewTask } from "../Redux/tasksSlice";
import { useForm, Controller } from "react-hook-form";

const NewTaskModal = ({ modalVisible, setModalVisible }) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async ({ title, description }) => {
    try {
      await dispatch(
        addNewTask({ label: title, description, start_date: new Date() })
      );
      reset({
        title: "",
        description: "",
      });
    } catch (err) {
      console.error("Failed to save the task: ", err);
    } finally {
      setModalVisible(!modalVisible);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.label}>Title</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="title"
            rules={{ required: true }}
          />
          <Text style={styles.label}>Description</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="description"
          />

          <View style={styles.button}>
            <Button
              style={styles.buttonInner}
              color
              title="Reset"
              onPress={() => {
                reset({
                  title: "",
                  description: "",
                });
              }}
            />
          </View>

          <View style={styles.button}>
            <Button
              style={styles.buttonInner}
              color
              title="Create"
              onPress={handleSubmit(onSubmit)}
            />
          </View>

          <View style={styles.button}>
            <Button
              style={styles.buttonInner}
              color
              title="Close"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  label: {
    color: "white",
    margin: 20,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: "white",
    height: 40,
    backgroundColor: "#205295",
    borderRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: "#E8AA42",
  },
  input: {
    backgroundColor: "white",
    borderColor: "none",
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
});
export default NewTaskModal;
