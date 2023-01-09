import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet, StatusBar } from "react-native";
import NewTaskModal from "../Features/NewTaskModal";
import CreateTaskButton from "../Features/CreateTaskButton";
import Filter from "../Features/Filter";
import TasksList from "../Features/TasksList";
import { selectAllTasks, fetchTasks } from "../Redux/tasksSlice";

export const initialFilter = {
  title: "",
  startDate: "",
  endDate: "",
};

function HomeScreen() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectAllTasks);

  const [filter, setFilter] = useState(initialFilter);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  return (
    <View style={styles.container}>
      <Filter filter={filter} setFilter={setFilter} />
      <TasksList tasks={tasks} filter={filter} />
      <CreateTaskButton
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
      <NewTaskModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: "#FCFFE7",
    justifyContent: "flex-end",
  },
});
export default HomeScreen;
