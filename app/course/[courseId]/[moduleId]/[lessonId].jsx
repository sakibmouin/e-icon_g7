import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { courses } from "../../../data/courses";
import { useNavigation } from "@react-navigation/native";

const Lesson = () => {
	const { courseId, moduleId, lessonId } = useLocalSearchParams();
	const router = useRouter();

	const getCourseById = (courseId) => {
		return courses[courseId];
	};

	const course = getCourseById(courseId);
	const module = course.modules.find((mod) => mod.id === moduleId);
	const lesson = module.lessons.find((les) => les.id === lessonId);
	const lessonIndex = module.lessons.findIndex((les) => les.id === lessonId);

	const navigation = useNavigation();
	useLayoutEffect(() => {
		navigation.setOptions({
			title: `Lesson ${lessonIndex + 1}`,
			headerStyle: {
				backgroundColor: "#12171F",
			},
			headerTintColor: "#f5f5f5",
			headerTitleStyle: {
				fontWeight: "bold",
			},
		});
	}, [navigation]);

	const handleNextLesson = () => {
		if (lessonIndex < module.lessons.length - 1) {
			const nextLessonId = module.lessons[lessonIndex + 1].id;
			router.replace(`/course/${courseId}/${moduleId}/${nextLessonId}`);
		} else {
			alert("This is the last lesson.");
		}
	};

	return (
		<View className="flex-1 bg-primary">
			<ScrollView className="p-5 flex-1">
				<Text className="font-sfBold text-2xl text-white mb-4">
					{lesson.title}
				</Text>
				{lesson.body.map((section, index) => {
					if (section.type === "heading") {
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
					}
					return null;
				})}
			</ScrollView>

			<View className="p-4 flex flex-row justify-between bg-secondary">
				<TouchableOpacity onPress={() => alert("Lesson completed!")}>
					<Text className="text-white text-base">Completed</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={handleNextLesson}>
					<Text className="text-white text-base">Next Lesson</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Lesson;
