import {
	View,
	Image,
	Text,
	StyleSheet,
	Dimensions,
	ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	TouchableOpacity,
	GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

import { courses } from "../data/courses";
import { useGlobalContext } from "../../context/GlobalProvider";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.8;
const ITEM_HEIGHT = ITEM_WIDTH * 1.2;

const list = [
	{
		name: "Sheikh Jamal Innovation Grant",
		$id: "kjlk34j5kj23h4k5jhl234jh23kj4l",
		icon: "https://cloud.appwrite.io/v1/storage/buckets/6696751b002a0827d855/files/66976b4600333fefd6c3/view?project=6690ac320023fc19ec92&mode=admin",
		bg: "primary",
		path: "pages/sjig",
	},
	{
		name: "K-Sartup Grand Challenge 2024",
		$id: "dsfdasfd",
		icon: "https://cloud.appwrite.io/v1/storage/buckets/6696751b002a0827d855/files/66976b64000f8a471cb4/view?project=6690ac320023fc19ec92&mode=admin",
		bg: "",
		path: "pages/kstartup",
	},
	{
		name: "Tech Incubator Program Korea",
		$id: "kjlk34sdfj5kj23h4k5jhl234jasdfa23kj4l",
		icon: "https://cloud.appwrite.io/v1/storage/buckets/6696751b002a0827d855/files/66976b5b0014a833677f/view?project=6690ac320023fc19ec92&mode=admin",
		bg: "primary",
		path: "pages/tipskorea",
	},
	{
		name: "Bangabandhu Innovation Grant",
		$id: "dsfdasfdfsdfasdfasdfd",
		icon: "https://cloud.appwrite.io/v1/storage/buckets/6696751b002a0827d855/files/66976b370030027512ec/view?project=6690ac320023fc19ec92&mode=admin",
		bg: "primary",
		path: "pages/big",
	},
];

const Home = () => {
	const { user } = useGlobalContext();
	const name = user.name;

	function getCourseById(courseId) {
		return courses[courseId] || null;
	}

	const data = Object.values(courses);
	const course = getCourseById("course-1");
	const [isLoading, setIsLoading] = useState(false);

	const renderItem = ({ item }) => (
		<TouchableOpacity
			onPress={() => router.push(item.path)}
			style={styles.itemContainer}
		>
			<Animated.View style={styles.itemInnerContainer}>
				<Image source={{ uri: item.icon }} style={styles.image} />
			</Animated.View>
		</TouchableOpacity>
	);

	return (
		<SafeAreaView className="pb-6 px-5 bg-primary h-full">
			<GestureHandlerRootView style={{ flex: 1 }}>
				<View className="flex-1 my-6">
					<Text className="text-3xl text-white font-sfBold mb-8">
						Welcome Back!
					</Text>
					<View className="mb-8">
						<Text className="font-sfSemibold text-white text-xl mb-3">
							Available Grants
						</Text>
						<Animated.FlatList
							data={list}
							renderItem={renderItem}
							keyExtractor={(item) => item.$id}
							horizontal
							showsHorizontalScrollIndicator={false}
							snapToInterval={ITEM_WIDTH}
							decelerationRate="fast"
							contentContainerStyle={styles.listContainer}
						/>
					</View>
					<View className="mb-8">
						<View className="flex items-start justify-center w-full h-auto bg-secondary rounded-3xl px-3 py-6">
							<Text className="font-sfBold text-2xl text-white mb-2">
								Discover Businesses around you!
							</Text>
							<TouchableOpacity
								className="w-auto h-auto p-3 bg-primary rounded-3xl"
								onPress={() => router.push("/directory")}
							>
								<Text className="text-white font-sft">Explore Businesses</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View>
						<View className="flex flex-row justify-between mb-3">
							<Text className="font-sfSemibold text-white text-xl">
								Currently Learning
							</Text>
							<TouchableOpacity onPress={() => router.push("/learn")}>
								<Text className="font-sft text-gray-500 text-xl">View All</Text>
							</TouchableOpacity>
						</View>
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
					</View>
				</View>
			</GestureHandlerRootView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	listContainer: {
		// paddingHorizontal: (width - ITEM_WIDTH) / 2,
	},
	itemContainer: {
		width: ITEM_WIDTH,
		height: ITEM_HEIGHT,
		marginHorizontal: 5,
		width: 90,
		height: 90,
	},
	itemInnerContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#1B232C",
		borderRadius: 12,
		overflow: "hidden",
	},
	image: {
		width: 70,
		height: "100%",
		resizeMode: "contain",
	},
});

export default Home;

{
	/* <SafeAreaView>
			<Text>Home</Text>
			<CustomButton
				title="Business Directory"
				primary
				handlePress={() => router.push("/directory/BusinessDirectory")}
			/>
			<CustomButton
				title="MyBusiness"
				primary
				handlePress={() => router.push("/directory/MyBusiness")}
			/>
			<CustomButton
				title="Add New Business"
				primary
				handlePress={() => router.push("/directory/AddNewBusiness")}
			/>
		</SafeAreaView> */
}
