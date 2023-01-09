import React, { useState } from "react";
import { View } from "react-native";
import {
  SearchBar,
  Button,
  ListItem,
  Divider,
  Switch,
  Text,
} from "@rneui/themed";
import { DatePickerModal } from "react-native-paper-dates";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const Filter = ({ filter, setFilter }) => {
  const [open, setOpen] = useState(false);
  const [allCompleted, setAllCompleted] = useState(false);

  const onDismiss = () => setOpen(false);
  const toggleSwitch = () => setAllCompleted(!allCompleted);

  const onConfirm = ({ startDate, endDate }) => {
    setOpen(false);
    setFilter({
      ...filter,
      startDate: !!startDate ? startDate.toLocaleDateString() : "",
      endDate: !!endDate ? endDate.toLocaleDateString() : "",
    });
  };

  return (
    <View>
      <SearchBar
        style={{}}
        platform="android"
        onChangeText={(text) => {
          setFilter({ ...filter, title: text });
        }}
        value={filter.title}
      />

      <Divider />
      <ListItem>
        <ListItem.Content>
          <ListItem.Title>Start Date:</ListItem.Title>
          <ListItem.Subtitle>
            {filter.startDate ? filter.startDate : "MM/DD/YYYY"}
          </ListItem.Subtitle>
        </ListItem.Content>
        <Divider orientation="vertical" />
        <ListItem.Content>
          <ListItem.Title>End Date:</ListItem.Title>
          <ListItem.Subtitle>
            {filter.endDate ? filter.endDate : "MM/DD/YYYY"}
          </ListItem.Subtitle>
        </ListItem.Content>
        <Divider orientation="vertical" />
        <Button
          radius={"sm"}
          type="clear"
          onPress={() => setFilter({ ...filter, startDate: "", endDate: "" })}
        >
          <MaterialIcons name="clear" size={24} color="black" />
        </Button>
        <Button radius={"sm"} type="clear" onPress={() => setOpen(true)}>
          <AntDesign name="calendar" size={24} color="black" />
        </Button>
      </ListItem>

      <DatePickerModal
        locale="en"
        mode="range"
        visible={open}
        onDismiss={onDismiss}
        onConfirm={onConfirm}
        startDate={filter.startDate && new Date(filter.startDate)}
        endDate={filter.endDate && new Date(filter.endDate)}
      />
    </View>
  );
};

export default Filter;
