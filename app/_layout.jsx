import { Stack } from "expo-router";
import {NavigationContainer} from "@react-navigation/native";

export default function RootLayout() {
  return (
      <NavigationContainer>
        <Stack.Navigator
            screenOptions={{headerShown: false}}
          initialRouteName="Welcome"
        >
          <Stack.Screen />
        </Stack.Navigator>
      </NavigationContainer>
  )
}
