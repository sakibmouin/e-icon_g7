// Entry Point of the App.
// this file serves as the entry point for the app's UI, defining how the first screen looks and behaves.

import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
	return (
		<SafeAreaView className="bg-primary h-full flex-1 items-center justify-center">
			<ScrollView contentContainerStyle={{ height: "100%" }}>
				<View className="w-full justify-center items-center min-h-[85vh] px-4">
					<Text className="text-white text-3xl">This is e-Icon Group 7</Text>
				</View>
			</ScrollView>
			<StatusBar />
		</SafeAreaView>
	);
}
