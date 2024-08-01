import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	FlatList,
	Button,
	Linking,
	TouchableOpacity,
} from "react-native";
import { fetchBusinesses } from "../../lib/appwrite";
import { SafeAreaView } from "react-native-safe-area-context";
import BusinessInfo from "../../components/BusinessInfo";

export default function BusinessDirectory() {
	const [businesses, setBusinesses] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const businessesObject = await fetchBusinesses();
				setBusinesses(businessesObject);
			} catch (error) {
				console.error("Error fetching businesses:", error);
			}
		};
		fetchData();
	}, []);

	return (
		<SafeAreaView className="pb-6 px-5 bg-primary h-full">
			<FlatList
				data={businesses}
				keyExtractor={(item) => item.$id}
				renderItem={({ item }) => (
					<BusinessInfo
						name={item.name}
						description={item.description}
						pdfFileUrl={item.pdfFileUrl}
						delete={false}
					/>
				)}
				ItemSeparatorComponent={() => <View className="h-4"></View>}
				ListHeaderComponent={() => (
					<View className="my-6">
						<Text className="text-3xl text-white font-sfBold">
							Business Directory
						</Text>
					</View>
				)}
			/>
		</SafeAreaView>
	);
}
