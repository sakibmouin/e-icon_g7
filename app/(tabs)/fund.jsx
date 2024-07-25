import { ScrollView, View, Text, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FundList from "../../components/FundList";

const list = [
	{
		name: "Sheikh Jamal Innovation Grant",
		$id: "kjlk34j5kj23h4k5jhl234jh23kj4l",
		icon: "https://cloud.appwrite.io/v1/storage/buckets/6696751b002a0827d855/files/66976b4600333fefd6c3/view?project=6690ac320023fc19ec92&mode=admin",
		bg: "primary",
		path: "/pages/sjig",
	},
	{
		name: "K-Sartup Grand Challenge 2024",
		$id: "dsfdasfd",
		icon: "https://cloud.appwrite.io/v1/storage/buckets/6696751b002a0827d855/files/66976b64000f8a471cb4/view?project=6690ac320023fc19ec92&mode=admin",
		bg: "",
	},
	{
		name: "Tech Incubator Program Korea",
		$id: "kjlk34sdfj5kj23h4k5jhl234jasdfa23kj4l",
		icon: "https://cloud.appwrite.io/v1/storage/buckets/6696751b002a0827d855/files/66976b5b0014a833677f/view?project=6690ac320023fc19ec92&mode=admin",
		bg: "primary",
	},
	{
		name: "Bangabandhu Innovation Grant",
		$id: "dsfdasfdfsdfasdfasdfd",
		icon: "https://cloud.appwrite.io/v1/storage/buckets/6696751b002a0827d855/files/66976b370030027512ec/view?project=6690ac320023fc19ec92&mode=admin",
		bg: "primary",
	},
];

const Fund = () => {
	return (
		<SafeAreaView className="bg-primary h-full px-4">
			<View className="my-6">
				<FlatList
					data={list}
					keyExtractor={(item) => item.$id}
					renderItem={({ item }) => (
						<FundList
							title={item.name}
							icon={item.icon}
							bg={item.bg}
							path={item.path}
						/>
					)}
					ListHeaderComponent={() => (
						<Text className="text-3xl text-white font-sfBold mb-8">
							Funding Opportunities
						</Text>
					)}
					ItemSeparatorComponent={() => <View className="h-2"></View>}
				></FlatList>
			</View>
		</SafeAreaView>
	);
};

export default Fund;
