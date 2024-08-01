import React, { useState } from "react";
import {
	Alert,
	Image,
	Text,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	ScrollView,
	View,
	Platform,
} from "react-native";
import { router } from "expo-router";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";

import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";

const SignIn = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [isSubmitting, setSubmitting] = useState(false);
	const [form, setForm] = useState({ email: "", password: "", username: "" });

	const { setUser, setIsLogged } = useGlobalContext();

	const handleSubmit = async () => {
		if (form.email === "" || form.password === "" || form.username === "") {
			Alert.alert("Error", "Please fill in all fields");
			return;
		}

		setSubmitting(true);

		try {
			await signIn(form.email, form.password, form.username);
			const result = await getCurrentUser();
			setUser(result);
			setIsLogged(true);

			Alert.alert("Success", "User signed in successfully");
			router.push("/Quiz");
		} catch (error) {
			Alert.alert("Error", error.message);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			className="flex-1 bg-primary"
		>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1 }}
				keyboardShouldPersistTaps="handled"
			>
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
							Create an account!
						</Animated.Text>
					</View>

					<View className="justify-center items-center mx-4 my-1">
						<Animated.View
							entering={FadeInDown.delay(200).duration(1000).springify()}
							className="w-full rounded-2xl mb-4"
						>
							<FormField
								value={form.username}
								title="Username"
								handleChangeText={(e) => setForm({ ...form, username: e })}
							/>
						</Animated.View>
						<Animated.View
							entering={FadeInDown.duration(1000).springify()}
							className="w-full rounded-2xl mb-4"
						>
							<FormField
								value={form.email}
								title="Email Address"
								handleChangeText={(e) => setForm({ ...form, email: e })}
							/>
						</Animated.View>
						<Animated.View
							entering={FadeInDown.delay(200).duration(1000).springify()}
							className="w-full rounded-2xl mb-4"
						>
							<FormField
								value={form.password}
								title="Password"
								handleChangeText={(e) => setForm({ ...form, password: e })}
								secureTextEntry
							/>
						</Animated.View>
						<Animated.View
							entering={FadeInDown.delay(400).duration(1000).springify()}
							className="w-full mt-9"
						>
							<CustomButton
								primary
								title={isSubmitting ? "Signing up..." : "Sign up"}
								handlePress={handleSubmit}
								disabled={isSubmitting}
							/>
						</Animated.View>
						<Animated.View
							entering={FadeInDown.delay(600).duration(1000).springify()}
							className="flex-row justify-center mt-6"
						>
							<Text className="text-gray-400 text-base">
								Already have an account?
							</Text>
							<TouchableOpacity onPress={() => router.push("/sign-in")}>
								<Text className="font-sf text-base text-secondary pl-2">
									Sign in
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
