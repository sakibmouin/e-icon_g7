import { View, Text } from "react-native";
import React from "react";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
	return (
		<SafeAreaView>
			<Text>Home</Text>
			<CustomButton
				title="Business Directory"
				primary
				handlePress={() => router.push("/directory/BusinessDirectory")}
			/>
			<CustomButton
				title="MyBusiness"
				primary
				handlePress={() => router.push("/directory/MyBusiness")}
			/>
			<CustomButton
				title="Add New Business"
				primary
				handlePress={() => router.push("/directory/AddNewBusiness")}
			/>
		</SafeAreaView>
	);
};

export default Home;
