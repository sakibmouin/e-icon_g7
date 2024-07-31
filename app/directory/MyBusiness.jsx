import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import {
	getUserBusinesses,
	fetchBusinesses,
	deletePdf,
} from "../../lib/appwrite";
import CustomButton from "../../components/CustomButton";
import { useGlobalContext } from "../../context/GlobalProvider";

export default function MyBusiness() {
	const { user } = useGlobalContext();
	const [businesses, setBusinesses] = useState([]);

	useEffect(() => {
		async function fetchData() {
			if (user && user.$id) {
				try {
					const fetchedBusinesses = await getUserBusinesses(user.$id);
					setBusinesses(fetchedBusinesses);
				} catch (error) {
					console.error("Error fetching businesses:", error);
				}
			}
		}
		fetchData();
	}, [user]);

	const handleDelete = async (id) => {
		try {
			const updatedBusinesses = await deletePdf($id, businesses);
			setBusinesses(updatedBusinesses);
		} catch (error) {
			console.error("Error deleting business:", error);
		}
	};

	return (
		<View className="bg-primary flex-1 p-5">
			<Text className="text-white font-sfBold text-3xl">My Business</Text>
			<FlatList
				data={businesses}
				keyExtractor={(item) => item.$id}
				renderItem={({ item }) => (
					<View className="bg-white rounded-lg p-4 my-2">
						<Text className="text-black font-sfSemibold text-xl">
							{item.name}
						</Text>
						<Button title="Delete" onPress={() => handleDelete(item.$id)} />
					</View>
				)}
			/>
		</View>
	);
}
