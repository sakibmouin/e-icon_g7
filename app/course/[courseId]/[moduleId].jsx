import {
	View,
	Text,
	Image,
	ScrollView,
	TouchableOpacity,
	useWindowDimensions,
	Alert,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { courses } from "../../data/courses";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import ShortTextInput from "../../../components/Learn/Course/module/ShortTextInput";
import LongTextInput from "../../../components/Learn/Course/module/LongTextInput";
import CustomButton from "../../../components/CustomButton";

const Module = () => {
	const [comeplete, setComeplete] = useState(false);
	const { width: SCREEN_WIDTH } = useWindowDimensions();

	const router = useRouter();
	const { courseId, moduleId } = useLocalSearchParams();

	const getCourseById = (courseId) => {
		return courses[courseId];
	};

	const course = getCourseById(courseId);
	const modules = course.modules;
	const module = course.modules.find((mod) => mod.id === moduleId);
	const moduleIndex = course.modules.findIndex((mod) => mod.id === moduleId);

	const navigation = useNavigation();
	useLayoutEffect(() => {
		navigation.setOptions({
			title: `Module ${moduleIndex + 1}`,
			headerStyle: {
				backgroundColor: "#12171F",
			},
			headerTintColor: "#f5f5f5",
			headerTitleStyle: {
				fontWeight: "bold",
			},
		});
	}, [navigation]);

	const handleNextModule = () => {
		if (moduleIndex < modules.length - 1) {
			const nextModuleId = modules[moduleIndex + 1].id;
			router.replace(`/course/${courseId}/${nextModuleId}`);
		} else {
			alert("This is the last Module.");
		}
	};
	const handlePreviousModule = () => {
		if (moduleIndex !== 0) {
			const previousModuleId = modules[moduleIndex - 1].id;
			router.replace(`/course/${courseId}/${previousModuleId}`);
		} else {
			alert("This is the first Module.");
		}
	};

	const handleSubmit = () => {
		Alert.alert("Success", "Submitted successfully!");
	};

	const handleModCompleteSubmit = () => {
		Alert.alert(
			"Great job!",
			"You have successfully finished the module. You can review it if you want or go to the next module	.",
			[
				{
					text: "Review",
					style: "cancel",
				},
				{ text: "Next Module", onPress: { handleNextModule } },
			]
		);
		setComeplete(true);
	};

	return (
		<View className="flex-1 bg-primary">
			<ScrollView className="p-5 flex-1">
				<Text className="font-sfBold text-2xl text-white mb-4">
					Module {moduleIndex + 1}: {module.title}
				</Text>
				{module.body.map((section, index) => {
					if (section.type === "lottie") {
						return (
							<View
								className="w-full flex justify-center items-center mb-2"
								key={index}
							>
								<LottieView
									autoPlay
									style={{
										width: SCREEN_WIDTH - 120,
										height: SCREEN_WIDTH - 120,
									}}
									loop
									source={section.content}
								/>
							</View>
						);
					} else if (section.type === "heading") {
						return (
							<Text
								key={index}
								className="text-xl font-sfSemibold text-white mt-4 mb-2"
							>
								{section.content}
							</Text>
						);
					} else if (section.type === "paragraph") {
						return (
							<Text key={index} className="text-gray-300 mb-2">
								{section.content}
							</Text>
						);
					} else if (section.type === "image") {
						return (
							<View className="mb-2" key={index}>
								<Image
									source={section.content}
									style={{
										width: SCREEN_WIDTH - 40,
										height: "auto",
									}}
								/>
							</View>
						);
					} else if (section.type === "shortTextInput") {
						return (
							<View className="mb-2" key={index}>
								<ShortTextInput
									heading={section.content}
									onSubmit={handleSubmit}
								/>
							</View>
						);
					} else if (section.type === "longTextInput") {
						return (
							<View className="mb-2" key={index}>
								<LongTextInput
									heading={section.content}
									onSubmit={handleSubmit}
								/>
							</View>
						);
					}
					return (
						<View className="flex-1 justify-center items-center">
							<Text className="font-sfBold text-3xl text-white">
								No Contents Found
							</Text>
						</View>
					);
				})}
				<CustomButton
					title={comeplete ? "Completed" : "Complete the Module"}
					handlePress={handleModCompleteSubmit}
					primary={!comeplete}
					secondary={comeplete}
				/>
				<View className="h-10"></View>
			</ScrollView>

			<View className="p-4 flex flex-row justify-between bg-secondary mt-1">
				<TouchableOpacity
					onPress={handlePreviousModule}
					className="flex flex-row justify-center items-center"
				>
					<AntDesign name="arrowleft" size={20} color="white" />
					<Text className="text-white text-base ml-2">Previous Module</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={handleNextModule}
					className="flex flex-row justify-center items-center"
				>
					<Text className="text-white text-base mr-2">Next Module</Text>
					<AntDesign name="arrowright" size={20} color="white" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Module;
