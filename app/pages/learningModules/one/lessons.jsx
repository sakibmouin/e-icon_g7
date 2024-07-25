import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";

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

const modulesTable = [
	{ id: 1, title: "Module 1: Understanding Sustainable Development Goal 8" },
	{ id: 2, title: "Module 2: Market Research and Analysis" },
];

const lessonsTable = [
	{
		id: 1,
		moduleId: 1,
		title: "Introduction to SDG 8: Decent Work and Economic Growth",
	},
	{ id: 2, moduleId: 1, title: "The Importance of Inclusive Economic Growth" },
	{ id: 3, moduleId: 2, title: "Conducting Effective Market Research" },
	{ id: 4, moduleId: 2, title: "Analyzing Market Trends" },
];

const Lessons = () => {
	return (
		<ScrollView className="bg-primary h-full px-4">
			<View className="mb-1 mt-4">
				<Text className="font-sfSemibold text-white text-xl">{data.name}</Text>
			</View>
			{modulesTable.map((module) => (
				<View key={module.id} className="mb-4">
					<Text className="font-sfSemibold text-secondary text-lg">
						{module.title}
					</Text>
					{lessonsTable
						.filter((lesson) => lesson.moduleId === module.id)
						.map((lesson) => (
							<View
								key={lesson.id}
								className="flex flex-row items-center gap-2 my-2"
							>
								<Text className="text-2xl text-white -translate-y-0.5">{`\u25CF`}</Text>
								<Link
									href={`pages/learningModules/${module.id}/lessons/${lesson.id}`}
								>
									<Text className="text-blue-500 underline">
										{lesson.title}
									</Text>
								</Link>
							</View>
						))}
				</View>
			))}
		</ScrollView>
	);
};

export default Lessons;
