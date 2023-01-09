import React, { useState } from "react";
import { ListItem, ButtonGroup } from "@rneui/themed";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  updateTaskByTitle,
  deleteTaskByTitle,
  getTaskByTitle,
} from "../Redux/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
import { Task } from "../Utils/Task";

function TaskCard({ title }) {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const taskFound = useSelector((state) => getTaskByTitle(state, title));

  if (!taskFound) return null;

  const task = new Task(taskFound);
  return (
    <>
      {task && (
        <ListItem.Accordion
          bottomDivider
          containerStyle={{
            backgroundColor: task.isCompleted ? "#E8AA42" : "#F0ECCF",
          }}
          content={
            <ListItem.Content>
              <ListItem.Title
                h3
                style={{
                  textDecorationLine: task.isCompleted
                    ? "line-through"
                    : "none",
                }}
              >
                {task.title}
              </ListItem.Title>
            </ListItem.Content>
          }
          isExpanded={expanded}
          onPress={() => setExpanded(!expanded)}
        >
          {task.description && (
            <ListItem key={"description"} bottomDivider>
              <MaterialIcons name="description" size={24} color="black" />
              <ListItem.Content>
                <ListItem.Title h4>{task.description}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          )}

          <ListItem key={"start-date"}>
            <MaterialCommunityIcons
              name="clock-start"
              size={24}
              color="black"
            />
            <ListItem.Content>
              <ListItem.Title>{task.startString}</ListItem.Title>
            </ListItem.Content>
          </ListItem>

          {task.endString && (
            <ListItem key={"end-date"} bottomDivider>
              <MaterialCommunityIcons
                name="clock-end"
                size={24}
                color="black"
              />
              <ListItem.Content>
                <ListItem.Title>{task.endString}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          )}

          <ListItem>
            <ListItem.Content>
              <ButtonGroup
                buttons={["Completed", "Delete"]}
                disabled={task.isCompleted ? [0] : []}
                buttonContainerStyle={{}}
                onPress={(selectedIdx) => {
                  if (selectedIdx === 0 && !task.isCompleted) {
                    dispatch(updateTaskByTitle(task.title));
                  } else if (selectedIdx === 1) {
                    dispatch(deleteTaskByTitle(task.title));
                  }
                }}
              />
            </ListItem.Content>
          </ListItem>
        </ListItem.Accordion>
      )}
    </>
  );
}

export default TaskCard;
