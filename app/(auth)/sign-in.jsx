import React, { useState, useCallback } from "react";
import {
	Alert,
	Text,
	TouchableOpacity,
	View,
	KeyboardAvoidingView,
	ScrollView,
	Platform,
} from "react-native";
import { router } from "expo-router";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";

import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { images } from "../../constants";

const SignIn = () => {
	const [isSubmitting, setSubmitting] = useState(false);
	const [form, setForm] = useState({ email: "", password: "" });
	const { setUser, setIsLogged } = useGlobalContext();

	const handleInputChange = useCallback(
		(field) => (value) => {
			setForm((prevForm) => ({ ...prevForm, [field]: value }));
		},
		[]
	);

	const handleSubmit = useCallback(async () => {
		if (!form.email || !form.password) {
			Alert.alert("Error", "Please fill in all fields");
			return;
		}

		setSubmitting(true);
		try {
			await signIn(form.email, form.password);
			const result = await getCurrentUser();
			setUser(result);
			setIsLogged(true);
			Alert.alert("Success", "User signed in successfully");
			router.replace("/home");
		} catch (error) {
			Alert.alert("Error", error.message);
		} finally {
			setSubmitting(false);
		}
	}, [form, setUser, setIsLogged]);

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
			className="bg-primary"
		>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1 }}
				keyboardShouldPersistTaps="handled"
			>
				{/* <Image source={imgTop} className="absolute h-full w-full" /> */}
				<View className="flex-1 justify-around pt-20 pb-5">
					<View className="items-center">
						<Animated.Image
							entering={FadeInUp.duration(1000).springify()}
							source={images.logoMain}
							className="w-[342px] h-[124px] mb-6"
						/>
						<Animated.Text
							entering={FadeInUp.duration(1000).springify()}
							className="font-sfBold text-white font-bold tracking-wider text-3xl"
						>
							Login to your account!
						</Animated.Text>
					</View>
					<View className="justify-center items-center mx-4 my-1">
						<Animated.View
							entering={FadeInDown.duration(1000).springify()}
							className="w-full py-3 rounded-2xl"
						>
							<FormField
								value={form.email}
								title="Email Address"
								handleChangeText={handleInputChange("email")}
							/>
						</Animated.View>
						<Animated.View
							entering={FadeInDown.delay(200).duration(1000).springify()}
							className="w-full py-3 rounded-2xl mb-4"
						>
							<FormField
								value={form.password}
								title="Password"
								handleChangeText={handleInputChange("password")}
								secureTextEntry
							/>
						</Animated.View>
						<Animated.View
							entering={FadeInDown.delay(400).duration(1000).springify()}
							className="w-full mt-9"
						>
							<CustomButton
								primary
								title={isSubmitting ? "Logging in..." : "Login"}
								handlePress={handleSubmit}
								disabled={isSubmitting}
							/>
						</Animated.View>
						<Animated.View
							entering={FadeInDown.delay(600).duration(1000).springify()}
							className="flex-row justify-center mt-6"
						>
							<Text className="font-sf text-gray-400 text-base">
								Don't have an account?
							</Text>
							<TouchableOpacity onPress={() => router.push("/sign-up")}>
								<Text className="font-sf text-base text-secondary pl-2">
									Sign Up
								</Text>
							</TouchableOpacity>
						</Animated.View>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default SignIn;
