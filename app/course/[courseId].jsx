import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { courses } from "../data/courses";
import CourseHeader from "../../components/Learn/Course/CourseHeader";
import ModuleBox from "../../components/Learn/Course/ModuleBox";

import { icons } from "../../constants";

const CourseInfo = () => {
	const getCourseById = (courseId) => {
		return courses[courseId];
	};

	const { courseId } = useLocalSearchParams();
	const course = getCourseById(courseId);

	const courseName = course.name;
	const aboutCourse = course.aboutCourse;
	const courseModules = course.modules;
	const courseImage = course.courseImage;

	const navigation = useNavigation();
	useLayoutEffect(() => {
		navigation.setOptions({
			title: `${courseName}`,
		});
	}, [navigation]);

	return (
		<SafeAreaView className="flex-1 bg-primary px-5">
			<FlatList
				ListHeaderComponent={
					<CourseHeader
						courseName={courseName}
						aboutCourse={aboutCourse}
						courseImage={courseImage}
					/>
				}
				data={courseModules}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<View key={item.id}>
						<View
							onPress={() => router.push(`/course/${courseId}/${item.id}`)}
							className="mb-3"
						>
							<ModuleBox
								heading={item.title}
								iconPath={icons.fund}
								onPress={() => router.push(`/course/${courseId}/${item.id}`)}
							/>
						</View>
					</View>
				)}
				contentContainerStyle={{ paddingBottom: 80 }} // Ensure the list has enough bottom padding for the button
			/>

			<View></View>
		</SafeAreaView>
	);
};

export default CourseInfo;
