import {
	View,
	Text,
	TouchableOpacity,
	Image,
	FlatList,
	Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserBusinesses, signOut, deletePdf } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";
import InfoBox from "../../components/InfoBox";
import BusinessInfo from "../../components/BusinessInfo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";

const Profile = () => {
	const { user, setUser, setIsLogged } = useGlobalContext();
	const [businesses, setBusinesses] = useState([]);

	const logout = () => {
		Alert.alert("Logout", "Are you sure you want to log out?", [
			{ text: "Cancel", style: "cancel" },
			{
				text: "Log out",
				onPress: async () => {
					try {
						await signOut();
						setUser(null);
						setIsLogged(false);
						router.replace("/sign-in");
					} catch (error) {
						console.error("Error logging out:", error);
					}
				},
			},
		]);
	};

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
			const updatedBusinesses = await deletePdf(id, businesses);
			setBusinesses(updatedBusinesses);
		} catch (error) {
			console.error("Error deleting business:", error);
		}
	};

	const renderHeader = () => (
		<View className="w-full flex justify-center items-center mt-6 ">
			<TouchableOpacity
				onPress={logout}
				className="flex w-full items-end mb-10"
			>
				<MaterialCommunityIcons name="logout" size={24} color="white" />
			</TouchableOpacity>
			<View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
				<Image
					source={{ uri: user?.avatar }}
					className="w-[90%] h-[90%] rounded-lg"
					resizeMode="cover"
				/>
			</View>
			<InfoBox
				title={"@" + user?.username}
				containerStyles="mt-5"
				titleStyles="text-lg"
			/>
			<View className="flex-row items-center justify-center w-full">
				<Text className="mt-6 font-sfSemibold text-white text-xl mb-3 self-start">
					My Business(es)
				</Text>
				<TouchableOpacity
					className="translate-y-1 absolute right-0"
					onPress={() => router.push("/directory/AddNewBusiness")}
				>
					<AntDesign name="plus" size={28} color="white" />
				</TouchableOpacity>
			</View>
		</View>
	);

	return (
		<SafeAreaView className="bg-primary h-full p-5">
			<FlatList
				data={businesses}
				keyExtractor={(item) => item.$id}
				renderItem={({ item }) => (
					<BusinessInfo
						name={item.name}
						description={item.description}
						pdfFileUrl={item.pdfFileUrl}
						deleteEnabled
						onDelete={() => handleDelete(item.$id)}
					/>
				)}
				ItemSeparatorComponent={() => <View className="h-4"></View>}
				ListHeaderComponent={renderHeader}
			/>
		</SafeAreaView>
	);
};

export default Profile;
