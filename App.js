import { StatusBar, LogBox } from "react-native";
import RootNavigation from "./app/rootNavigation";

LogBox.ignoreAllLogs(true);
export default function App() {
  return (
    <>
      <StatusBar backgroundColor="#4C044C" barStyle="light-content" />
      <RootNavigation />
    </>
  );
}
