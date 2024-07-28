import React, { useState } from "react";
import {
	Alert,
	Image,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { router } from "expo-router";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";

import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";

import imgTop from "../../assets/images/auth/background.png";
import imgLight from "../../assets/images/auth/light.png";

const SignIn = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [isSubmitting, setSubmitting] = useState(false);
	const [form, setForm] = useState({ email: "", password: "" });

	const { setUser, setIsLogged } = useGlobalContext();

	const handleSubmit = async () => {
		if (form.email === "" || form.password === "") {
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
	};

	return (
		<View className="flex-1 bg-white">
			<Image source={imgTop} className="absolute h-full w-full" />
			<View className="flex-row justify-around w-full absolute -top-4">
				<Animated.Image
					entering={FadeInUp.delay(200).duration(1000).springify().damping(5)}
					source={imgLight}
					className="h-56 w-24"
				/>
				<Animated.Image
					entering={FadeInUp.delay(400).duration(1000).springify().damping(5)}
					source={imgLight}
					className="h-40 w-16"
				/>
			</View>

			<View className="flex-1 pt-64 pb-2.5">
				<View className="items-center">
					<Animated.Text
						entering={FadeInUp.duration(1000).springify()}
						className="text-white font-bold tracking-wider text-5xl"
					>
						Login
					</Animated.Text>
				</View>

				<View className="flex-1 justify-center items-center mx-4 my-1">
					<Animated.View
						entering={FadeInDown.duration(1000).springify()}
						className="w-full bg-black/10 p-5 rounded-2xl mb-4"
					>
						<TextInput
							placeholder="E-mail"
							placeholderTextColor="gray"
							value={form.email}
							keyboardType="email-address"
							onChangeText={(e) => setForm({ ...form, email: e })}
						/>
					</Animated.View>

					<Animated.View
						entering={FadeInDown.delay(200).duration(1000).springify()}
						className="w-full bg-black/10 p-5 rounded-2xl mb-4"
					>
						<View className="flex flex-row justify-between">
							<TextInput
								placeholder="Password"
								placeholderTextColor="gray"
								value={form.password}
								onChangeText={(e) => setForm({ ...form, password: e })}
								secureTextEntry={!showPassword}
							/>
							<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
								<Image
									source={!showPassword ? icons.eye : icons.eyeHide}
									className="w-6 h-6"
									resizeMode="contain"
								/>
							</TouchableOpacity>
						</View>
					</Animated.View>

					<Animated.View
						entering={FadeInDown.delay(400).duration(1000).springify()}
						className="w-full"
					>
						<TouchableOpacity
							className="w-full bg-[#7FBEEB] p-5 rounded-3xl mt-3"
							onPress={handleSubmit}
							disabled={isSubmitting}
						>
							<Text className="text-white font-bold text-center text-xl">
								{isSubmitting ? "Logging in..." : "Login"}
							</Text>
						</TouchableOpacity>
					</Animated.View>

					<Animated.View
						entering={FadeInDown.delay(600).duration(1000).springify()}
						className="flex-row justify-center mt-6"
					>
						<Text>Don't have an account?</Text>
						<TouchableOpacity onPress={() => router.push("/sign-up")}>
							<Text className="text-secondary pl-2">Sign Up</Text>
						</TouchableOpacity>
					</Animated.View>
				</View>
			</View>
		</View>
	);
};

export default SignIn;
