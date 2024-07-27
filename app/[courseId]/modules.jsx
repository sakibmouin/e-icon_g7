import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { courses } from "../data/courses";
import { useNavigation } from "@react-navigation/native";

const Modules = () => {
	const router = useRouter();
	const { courseId } = useLocalSearchParams();
	const course = courses[courseId];

	const navigation = useNavigation();
	useLayoutEffect(() => {
		navigation.setOptions({
			title: `Modules`,
			headerStyle: {
				backgroundColor: "#12171F",
			},
			headerTintColor: "#f5f5f5",
			headerTitleStyle: {
				fontWeight: "bold",
			},
		});
	}, [navigation]);

	return (
		<ScrollView className="flex-1 bg-primary p-5">
			<Text className="font-sfBold text-white text-2xl mb-4">
				{course.name}
			</Text>
			<Text className="font-sfSemibold text-white text-xl mb-2">Modules</Text>
			{course.modules.map((module) => (
				<View key={module.id} style={{ marginBottom: 16 }}>
					<Text className="text-base text-gray-200 font-sfSemibold">
						{module.title}
					</Text>
					{module.lessons.map((lesson) => (
						<TouchableOpacity
							key={lesson.id}
							onPress={() =>
								router.push(`/${courseId}/${module.id}/${lesson.id}`)
							}
						>
							<View className="flex flex-row">
								<Text className="text-white ml-4 mt-1">{`\u25CF`}</Text>
								<Text className="text-white ml-2 mt-1">{lesson.title}</Text>
							</View>
						</TouchableOpacity>
					))}
				</View>
			))}
		</ScrollView>
	);
};

export default Modules;
