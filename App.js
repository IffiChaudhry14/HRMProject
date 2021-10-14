import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainStackNavigator } from "./source/navigations/MainStackNavigator";
 const App = () => {
  return (
    <NavigationContainer>
      < MainStackNavigator/>
    </NavigationContainer>
  );
}

export default App;
