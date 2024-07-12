import { View, Text, Image } from "react-native";
import { Tabs, Redirect } from "expo-router";

import { icons } from "../../constants";

const TabIcon = ({ icon, color }) => {
	return (
		<View className="items-center justify-center gap-2">
			<Image
				source={icon}
				resizeMode="contain"
				tintColor={color}
				className="w-6 h-6"
			/>
		</View>
	);
};

const TabsLayout = () => {
	return (
		<>
			<Tabs
				screenOptions={{
					tabBarShowLabel: false,
					tabBarActiveTintColor: "#35917a",
					tabBarInactiveTintColor: "#F5F5F5",
					tabBarStyle: {
						backgroundColor: "#12171F",
						borderTopWidth: 1,
						borderTopColor: "#12171F",
						height: 84,
					},
				}}
			>
				<Tabs.Screen
					name="home"
					options={{
						title: "Home",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon icon={icons.home} color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="fund"
					options={{
						title: "Funding Opportunities",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon icon={icons.fund} color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="learn"
					options={{
						title: "Learning Modules",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon icon={icons.learn} color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="profile"
					options={{
						title: "Profile",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon icon={icons.profile} color={color} />
						),
					}}
				/>
			</Tabs>
		</>
	);
};

export default TabsLayout;
