import {
	View,
	Text,
	ScrollView,
	Image,
	TouchableOpacity,
	FlatList,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import CustomButton from "../../../../components/CustomButton";

const data = {
	name: "Innovative Startups: Sustainable Growth Strategies with SDG",
	aboutCourse:
		"Discover how to launch and grow your startup with a focus on sustainability and inclusive economic growth. This course will guide you through essential strategies to build a successful business aligned with Sustainable Development Goal 8. Learn how to conduct market research, secure funding, develop eco-friendly products, and create a positive impact on your community. Perfect for aspiring entrepreneurs committed to making a difference while achieving business success. Join us to drive innovation and sustainability in your startup journey!",
	benefits: [
		{ id: 1, title: "Sustainable Growth Techniques" },
		{ id: 2, title: "Market Research Skills" },
		{ id: 3, title: "Funding Insights" },
		{ id: 4, title: "Eco-friendly Practices" },
		{ id: 5, title: "Community Impact" },
	],
};

const one = () => {
	const [showFullText, setShowFullText] = useState(false);
	const router = useRouter();

	const toggleFullText = () => {
		setShowFullText(!showFullText);
	};

	return (
		<View className="bg-primary h-full px-4">
			<ScrollView>
				<View className="px-4 mb-4">
					<Image
						className="w-full h-[250px]"
						source={{
							uri: "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
						}}
						resizeMode="contain"
					/>
				</View>
				<View className="mb-1">
					<Text className="font-sfSemibold text-white text-xl">
						{data.name}
					</Text>
				</View>
				<View>
					<View className="mb-4">
						<Text className="font-sfSemibold text-secondary text-lg">
							About Course
						</Text>
						<Text className="font-sft text-gray-400 text-sm">
							{showFullText
								? data.aboutCourse
								: `${data.aboutCourse.substring(0, 300)}...`}
						</Text>
						<TouchableOpacity onPress={toggleFullText}>
							<Text className="font-sfSemibold text-secondary">
								{showFullText ? "See less" : "See more"}
							</Text>
						</TouchableOpacity>
					</View>
					<View className="pb-12">
						<Text className="font-sfSemibold text-secondary text-lg">
							Benefits
						</Text>
						<FlatList
							data={data.benefits}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({ item }) => (
								<View className="flex flex-row items-center gap-2">
									<Text className="text-2xl text-white -translate-y-0.5">{`\u25CF`}</Text>
									<Text className="font-sft text-gray-400 text-sm">
										{item.title}
									</Text>
								</View>
							)}
						/>
					</View>
				</View>
			</ScrollView>
			<View className="absolute bottom-4 w-full z-10 self-center">
				<CustomButton
					title="Open Course"
					handlePress={() => {
						router.push("pages/learningModules/one/lessons");
					}}
				/>
			</View>
		</View>
	);
};

export default one;
