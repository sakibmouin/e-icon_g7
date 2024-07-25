import { ScrollView, View, Text, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenList from "../../components/ScreenList";

const list = [
	{
		name: "Sheikh Jamal Innovation Grant",
		$id: "kjlk34j5kj23h4k5jhl234jh23kj4l",
		icon: "https://cloud.appwrite.io/v1/storage/buckets/6696751b002a0827d855/files/66976b4600333fefd6c3/view?project=6690ac320023fc19ec92&mode=admin",
		bg: "primary",
		path: "/pages/sjig",
	},
	{
		name: "K-Sartup Grand Challenge 2024",
		$id: "dsfdasfd",
		icon: "https://cloud.appwrite.io/v1/storage/buckets/6696751b002a0827d855/files/66976b64000f8a471cb4/view?project=6690ac320023fc19ec92&mode=admin",
		bg: "",
		path: "/pages/kstartup",
	},
	{
		name: "Tech Incubator Program Korea",
		$id: "kjlk34sdfj5kj23h4k5jhl234jasdfa23kj4l",
		icon: "https://cloud.appwrite.io/v1/storage/buckets/6696751b002a0827d855/files/66976b5b0014a833677f/view?project=6690ac320023fc19ec92&mode=admin",
		bg: "primary",
		path: "/pages/tipskorea",
	},
	{
		name: "Bangabandhu Innovation Grant",
		$id: "dsfdasfdfsdfasdfasdfd",
		icon: "https://cloud.appwrite.io/v1/storage/buckets/6696751b002a0827d855/files/66976b370030027512ec/view?project=6690ac320023fc19ec92&mode=admin",
		bg: "primary",
		path: "/pages/big",
	},
];

const Fund = () => {
	return <ScreenList list={list} header="Funding Opportunities" />;
};

export default Fund;
