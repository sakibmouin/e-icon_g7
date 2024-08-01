import { useLayoutEffect, useState } from "react";
import { router } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	View,
	Text,
	Alert,
	Image,
	TouchableOpacity,
	ScrollView,
} from "react-native";

import Feather from "@expo/vector-icons/Feather";
import { createBusiness } from "../../lib/appwrite";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { useGlobalContext } from "../../context/GlobalProvider";
import { useNavigation } from "@react-navigation/native";

const AddNewBusiness = () => {
	const { user } = useGlobalContext();
	const [uploading, setUploading] = useState(false);
	const [form, setForm] = useState({
		name: "",
		pdfFile: null,
		description: "",
	});

	const navigation = useNavigation();
	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Add New Business",
		});
	}, [navigation]);

	const pickPdf = async () => {
		try {
			const result = await DocumentPicker.getDocumentAsync({
				type: "application/pdf",
			});

			if (!result.canceled && result.assets && result.assets.length > 0) {
				setForm({ ...form, pdfFile: result.assets[0] });
			} else {
				console.log("PDF selection was canceled");
			}
		} catch (error) {
			console.error("Error picking PDF:", error);
			Alert.alert("Error", "Failed to pick PDF document");
		}
	};

	const submit = async () => {
		if (!form.name || !form.description || !form.pdfFile) {
			return Alert.alert("Error", "Please provide all fields");
		}

		setUploading(true);
		try {
			await createBusiness({ ...form, userId: user.$id });

			Alert.alert("Success", "Business Created successfully");
			router.push("/profile");
		} catch (error) {
			console.error("Error creating business:", error);
			Alert.alert("Error", error.message);
		} finally {
			setForm({
				name: "",
				description: "",
				pdfFile: null,
			});
			setUploading(false);
		}
	};

	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView className="px-5">
				<Text className="font-sfBold text-3xl text-white font-psemibold">
					Create Business
				</Text>

				<FormField
					title="Name of the Business"
					value={form.name}
					placeholder="Enter business name"
					handleChangeText={(e) => setForm({ ...form, name: e })}
					otherStyles="mt-10"
				/>

				<FormField
					title="Business Description"
					value={form.description}
					placeholder="Enter business description"
					handleChangeText={(e) => setForm({ ...form, description: e })}
					otherStyles="mt-7"
				/>

				<View className="mt-7 space-y-2">
					<Text className="font-sf text-base text-gray-300">
						Upload Pitch Deck (PDF)
					</Text>

					<TouchableOpacity onPress={pickPdf}>
						{form.pdfFile ? (
							<View className="w-full h-16 px-4 bg-blue rounded-2xl flex justify-center items-center">
								<Text className="text-sm text-white font-pmedium">
									Selected: {form.pdfFile.name}
								</Text>
							</View>
						) : (
							<View className="w-full h-16 px-4 bg-blue rounded-2xl flex justify-center items-center flex-row">
								<Feather name="upload" size={24} color="white" />
								<Text className="ml-2 text-sm text-white font-pmedium">
									Choose a PDF file
								</Text>
							</View>
						)}
					</TouchableOpacity>
				</View>

				<CustomButton
					title="Create Business"
					handlePress={submit}
					containerStyles="mt-7"
					isLoading={uploading}
					primary
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

export default AddNewBusiness;
