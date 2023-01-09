import React from "react";
import { Provider as StoreProvider } from "react-redux";
import "react-native-gesture-handler";
import HomeScreen from "./Screens/HomeScreen";
import store from "./Redux/store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootSiblingParent } from "react-native-root-siblings";
import { en, registerTranslation } from "react-native-paper-dates";
registerTranslation("en", en);

const Stack = createStackNavigator();

function App() {
  return (
    <StoreProvider store={store}>
      <RootSiblingParent>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: "TODO List",
                headerStyle: {
                  backgroundColor: "#E8AA42",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </RootSiblingParent>
    </StoreProvider>
  );
}

export default App;
