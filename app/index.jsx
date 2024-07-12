// Entry Point of the App.
// this file serves as the entry point for the app's UI, defining how the first screen looks and behaves.

import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
	return (
		<SafeAreaView>
			<ScrollView></ScrollView>
			<StatusBar />
		</SafeAreaView>
	);
}
