import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./components/nav/AppNavigator";
import ScreensNav from "./components/nav/ScreensNav";

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
