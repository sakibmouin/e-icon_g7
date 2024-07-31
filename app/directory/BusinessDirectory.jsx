import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, Linking } from "react-native";
import { fetchBusinesses } from "../../lib/appwrite";
import { SafeAreaView } from "react-native-safe-area-context";

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

	const openPdfFile = async (fileUrl) => {
		try {
			Linking.openURL(fileUrl);
		} catch (error) {
			console.error("Error opening PDF:", error);
		}
	};

	return (
		<SafeAreaView className="bg-white">
			<FlatList
				data={businesses}
				keyExtractor={(item) => item.$id}
				renderItem={({ item }) => (
					<View>
						<Text className="text-black text-2xl">{item.name}</Text>
						<Text className="text-black">{item.description}</Text>
						<Button
							title="View PDF"
							onPress={() => openPdfFile(item.pdfFileUrl)}
						/>
					</View>
				)}
			/>
		</SafeAreaView>
	);
}
