import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import { courses } from "../data/courses";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const Learn = () => {
	const data = Object.values(courses);

	const [isLoading, setIsLoading] = useState(false);

	return (
		<SafeAreaView className="pb-6 px-5 bg-primary h-full">
			<View className="flex-1 my-6">
				<Text className="text-3xl text-white font-sfBold mb-8">
					Learning Modules
				</Text>
				<View>
					{data.map((course) => (
						<View
							key={course.id}
							className="rounded-xl w-full h-[180px] bg-[#1B232C] mb-5"
						>
							<TouchableOpacity
								onPress={() => {
									router.push(`/course/${course.id}`);
								}}
								className={`w-full ${isLoading ? "opacity-75" : ""}`}
							>
								<ImageBackground
									className="rounded-xl h-[180px] flex items-start justify-end p-5"
									source={{ uri: `${course.courseListImage}` }}
									imageStyle={{ borderRadius: 20 }}
									resizeMode="cover"
								>
									<View className="translate-y-2 flex flex-row items-start justify-center gap-1">
										<Ionicons name="time-outline" size={18} color="#9ca3af" />
										<Text className="font-sfBold text-gray-400 text-[12px]">
											{course.duration}
										</Text>
									</View>
									<Text className="font-sfBold text-white text-[18px]">
										{course.name}
									</Text>
								</ImageBackground>
							</TouchableOpacity>
						</View>
					))}
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: "#f8f8f8",
	},

	link: {
		color: "#007bff",
		marginTop: 10,
	},
});

export default Learn;

// {
// 	Object.values(courses).map((course) => (
// 		<View key={course.id} className="p-5 mb-5 rounded-xl">
// 			<Text className="font-sfBold text-white text-[18px]">{course.name}</Text>
// 			<Link href={`/course/${course.id}`}>
// 				<Text style={styles.link}>View Course</Text>
// 			</Link>
// 		</View>
// 	));
// }

{
	/* <ScreenList
				list={list}
				header="Learning Modules"
				buttonText="Go to Course"
			/> */
}
