import { View, Text } from "react-native";
import React from "react";
import ScreenList from "../../components/ScreenList";

const list = [
	{
		name: "C",
		$id: "kjlk34j5kj23h4k5jhl234jh23kj4l",
		icon: "https://cloud.appwrite.io/v1/storage/buckets/6696751b002a0827d855/files/66976b4600333fefd6c3/view?project=6690ac320023fc19ec92&mode=admin",
		bg: "primary",
		path: "/pages/learningModules/one",
	},
];

const Learn = () => {
	return (
		<ScreenList
			list={list}
			header="Learning Modules"
			buttonText="Go to Course"
		/>
	);
};

export default Learn;
