import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Text, Divider } from "@rneui/themed";
import TaskCard from "../Features/TaskCard";

const TasksList = ({ tasks, filter }) => {
  const {
    title: filterTitle,
    startDate: filterStartDate,
    endDate: filterEndDate,
  } = filter;

  const [filterTasksList, setFilterTasksList] = useState(tasks);
  const filterTasks = () => {
    const filterTitleList = tasks.filter((item) => {
      const itemData = item.title ? item.title.toUpperCase() : "";
      return itemData.indexOf(filterTitle.toUpperCase()) > -1;
    });
    if (!filterStartDate && !filterEndDate) {
      return filterTitleList;
    }
    let filterStartDateList = filterTitleList;
    if (filterStartDate && !filterEndDate) {
      filterStartDateList = filterTitleList.filter((item) => {
        const itemStartDateString = new Date(
          item.startDate
        ).toLocaleDateString();
        if (itemStartDateString === filterStartDate) {
          return item;
        }
      });
    }

    let filterEndDateList = filterStartDateList;
    if (filterStartDate && filterEndDate) {
      const startDate = new Date(filterStartDate);
      const endDate = new Date(filterEndDate);
      filterEndDateList = filterEndDateList.filter((item) => {
        if (item.startDate > startDate && item.startDate < endDate) {
          return item;
        }
        if (
          item.endDate &&
          item.endDate > startDate &&
          item.endDate < endDate
        ) {
          return item;
        }
      });
    }
    return filterEndDateList;
  };

  useEffect(() => {
    setFilterTasksList(filterTasks());
  }, [tasks, filter]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 2 }}>
        {filterTasksList.map((task) => (
          <TaskCard
            key={task.title}
            title={task.title}
            endDate={task.endDate}
          />
        ))}
      </ScrollView>
      {!filterTasksList.length && (
        <Text
          h1
          style={{
            textAlign: "center",
            color: "#001E6C",
            flex: 2,
          }}
        >
          Empty List
        </Text>
      )}
    </View>
  );
};
export default TasksList;
