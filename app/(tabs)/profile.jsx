import { View, Text, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";

const Profile = () => {
	const { setUser, setIsLogged, isLogged } = useGlobalContext();
	const logout = async () => {
		await signOut();
		setUser(null);
		setIsLogged(false);

		router.replace("/sign-in");
		console.log("After pressing logout, the islogged status is: " + isLogged);
	};

	return (
		<SafeAreaView>
			<View>
				<Text>Profile</Text>
				<Button onPress={logout} title="Logout" color="#000000" />
			</View>
		</SafeAreaView>
	);
};

export default Profile;
