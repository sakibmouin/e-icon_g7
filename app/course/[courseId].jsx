import { View, Text, FlatList } from "react-native";
import React, { useLayoutEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { courses } from "../data/courses";
import CustomButton from "../../components/CustomButton";
import CourseHeader from "../../components/Learn/Course/CourseHeader";
import ListItem from "../../components/Learn/Course/ListItem";

const CourseInfo = () => {
	const getCourseById = (courseId) => {
		return courses[courseId];
	};

	const router = useRouter();
	const { courseId } = useLocalSearchParams();
	const course = getCourseById(courseId);

	const courseName = course.name;
	const aboutCourse = course.aboutCourse;
	const courseBenefits = course.benefits;
	const courseModules = course.modules;
	const courseImage = course.courseImage;

	const navigation = useNavigation();
	useLayoutEffect(() => {
		navigation.setOptions({
			title: `${courseName}`,
		});
	}, [navigation]);

	return (
		<SafeAreaView className="flex-1 bg-primary p-5">
			<FlatList
				ListHeaderComponent={
					<CourseHeader
						courseName={courseName}
						aboutCourse={aboutCourse}
						courseImage={courseImage}
					/>
				}
				data={courseBenefits}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => <ListItem item={item} />}
				contentContainerStyle={{ paddingBottom: 80 }} // Ensure the list has enough bottom padding for the button
			/>
			<View
				style={{
					position: "absolute",
					bottom: 16,
					left: 16,
					right: 16,
				}}
			>
				<CustomButton
					title="Open Course"
					handlePress={() => {
						router.push(`/${courseId}/modules`);
					}}
				/>
			</View>
		</SafeAreaView>
	);
};

export default CourseInfo;
