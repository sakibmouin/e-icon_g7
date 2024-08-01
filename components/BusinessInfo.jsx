import { View, Text, TouchableOpacity, Linking } from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import PropTypes from "prop-types";

const BusinessInfo = ({
	name,
	description,
	pdfFileUrl,
	deleteEnabled,
	onDelete,
}) => {
	const [showFullText, setShowFullText] = useState(false);

	const toggleFullText = () => {
		setShowFullText(!showFullText);
	};

	const openPdfFile = async (fileUrl) => {
		try {
			await Linking.openURL(fileUrl);
		} catch (error) {
			console.error("Error opening PDF:", error);
		}
	};

	const renderDelete = () => {
		return (
			<TouchableOpacity
				style={{ position: "absolute", right: 20, top: 20 }}
				onPress={onDelete}
			>
				<Entypo name="trash" size={24} color="white" />
			</TouchableOpacity>
		);
	};

	return (
		<View className="bg-opacitywhite p-5 rounded-xl flex items-center relative">
			{deleteEnabled && renderDelete()}
			<View className="items-center mb-2">
				<Text className="font-sfBold text-white text-2xl">{name}</Text>
				<Text className="font-sft text-gray-400">
					{showFullText ? description : `${description.substring(0, 300)}...`}
				</Text>
				<TouchableOpacity onPress={toggleFullText}>
					<Text className="font-sftBold text-gray-400">
						{showFullText ? "See less" : "See more"}
					</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				className="p-3 bg-secondary w-36 flex items-center justify-center rounded-3xl"
				onPress={() => openPdfFile(pdfFileUrl)}
			>
				<Text className="font-sft text-white w-fit">View Pitch Deck</Text>
			</TouchableOpacity>
		</View>
	);
};

BusinessInfo.propTypes = {
	name: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	pdfFileUrl: PropTypes.string.isRequired,
	deleteEnabled: PropTypes.bool,
};

export default BusinessInfo;
