import { View, Text, Image, Button, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const FundList = ({ title, icon, path }) => {
	const handlePress = () => {
		router.push("/" + path);
	};

	const isLoading = false;

	return (
		<View className="rounded-xl w-full bg-gray-700">
			<View className="flex flex-row p-4 gap-4 justify-center align-middle">
				<View className="self-center">
					<Image
						source={{ uri: icon }}
						className="h-[70px] w-[70px] rounded-xl"
						resizeMode="contain"
					/>
				</View>
				<View className="flex flex-1 justify-center align-middle">
					<Text className="text-white text-xl font-sf">{title}</Text>
					<TouchableOpacity
						onPress={handlePress}
						className={`bg-secondary w-[120px] p-1 rounded-2xl flex ${
							isLoading ? "opacity-50" : ""
						}`}
					>
						<Text className="self-center text-white font-sft">SEE MORE</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default FundList;
