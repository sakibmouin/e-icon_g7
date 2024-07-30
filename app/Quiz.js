import React, { useState } from "react";

import {
	View,
	Text,
	SafeAreaView,
	StatusBar,
	Image,
	TouchableOpacity,
	Modal,
	Animated,
} from "react-native";
import { COLORS, SIZES, FONTS } from "../constants/";
import QuizData from "./data/quiz";
import Lottie from "lottie-react-native";
import { stage } from "../components/quiz/stage";
import {
	GestureHandlerRootView,
	ScrollView,
} from "react-native-gesture-handler";
import { router } from "expo-router";

const RectButton = ({ minWidth, fontSize, handlePress, ...props }) => {
	return (
		<TouchableOpacity
			style={{
				backgroundColor: COLORS.secondary,
				padding: SIZES.small,
				borderRadius: SIZES.extraLarge,
				minWidth: minWidth,
				...props,
			}}
			onPress={handlePress}
		>
			<Text
				style={{
					fontFamily: FONTS.semiBold,
					fontSize: fontSize,
					color: COLORS.white,
					textAlign: "center",
				}}
			>
				Go to Home Page
			</Text>
		</TouchableOpacity>
	);
};

let getLottie = (stage) => {
	if (stage == "Idea Stage") {
		return require("../assets/animations/anim3.json");
	} else if (stage == "Early Stage") {
		return require("../assets/animations/anim3.json");
	} else if (stage == "Seed Stage") {
		return require("../assets/animations/anim3.json");
	} else {
		return require("../assets/animations/anim3.json");
	}
};

const Quiz = () => {
	const allQuestions = QuizData;
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
	const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
	const [answers, setAnswers] = useState([]);
	const [showNextButton, setShowNextButton] = useState(false);
	const [showScoreModal, setShowScoreModal] = useState(false);

	const validateAnswer = (selectedOption, option_index) => {
		const currentQuestion = allQuestions[currentQuestionIndex];
		const answer = {
			category: currentQuestion.category,
			weight: currentQuestion.weight,
			score: currentQuestion.scores[option_index],
		};
		setAnswers([...answers, answer]);
		setCurrentOptionSelected(selectedOption);
		setIsOptionsDisabled(true);
		setShowNextButton(true);
	};

	const handleNext = () => {
		if (currentQuestionIndex == allQuestions.length - 1) {
			// Last Question
			setShowScoreModal(true);
		} else {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
			setCurrentOptionSelected(null);
			setIsOptionsDisabled(false);
			setShowNextButton(false);
		}
		Animated.timing(progress, {
			toValue: currentQuestionIndex + 1,
			duration: 1000,
			useNativeDriver: false,
		}).start();
	};

	const restartQuiz = () => {
		setShowScoreModal(false);
		setCurrentQuestionIndex(0);
		setAnswers([]);
		setCurrentOptionSelected(null);
		setIsOptionsDisabled(false);
		setShowNextButton(false);
		Animated.timing(progress, {
			toValue: 0,
			duration: 1000,
			useNativeDriver: false,
		}).start();
		router.dismissAll();
		router.replace({
			pathname: "/home",
		});
	};

	const renderQuestion = () => {
		return (
			<View
				style={{
					marginVertical: 20,
				}}
			>
				{/* Question Counter */}
				<View
					style={{
						flexDirection: "row",
						alignItems: "flex-end",
					}}
				>
					<Text
						style={{
							color: COLORS.white,
							fontSize: 13,
							opacity: 0.6,
							marginRight: 2,
							fontWeight: "bold",
						}}
					>
						{currentQuestionIndex + 1}
					</Text>
					<Text style={{ color: COLORS.white, fontSize: 13, opacity: 0.6 }}>
						/ {allQuestions.length}
					</Text>
				</View>

				{/* Question */}
				<Text
					style={{
						color: COLORS.white,
						fontSize: 20,
						// textAlign: "justify"
					}}
				>
					{allQuestions[currentQuestionIndex]?.question}
				</Text>
			</View>
		);
	};
	const renderOptions = () => {
		return (
			<View>
				{allQuestions[currentQuestionIndex]?.options.map((option, index) => (
					<TouchableOpacity
						onPress={() => validateAnswer(option, index)}
						disabled={isOptionsDisabled}
						key={option}
						style={{
							borderWidth: 3,
							borderColor:
								option == currentOptionSelected
									? COLORS.secondary
									: COLORS.secondary + "40",
							backgroundColor: COLORS.secondary + "20",
							height: 60,
							borderRadius: 20,
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
							paddingHorizontal: 20,
							marginVertical: 10,
						}}
					>
						<Text style={{ fontSize: 16, color: COLORS.white }}>{option}</Text>
					</TouchableOpacity>
				))}
			</View>
		);
	};
	const renderNextButton = () => {
		if (showNextButton) {
			return (
				<TouchableOpacity
					onPress={handleNext}
					style={{
						marginTop: 20,
						backgroundColor: COLORS.secondary,
						padding: 20,
						borderRadius: 15,
					}}
				>
					<Text
						style={{
							fontSize: 15,
							color: COLORS.white,
							textAlign: "center",
							alignItems: "center",
						}}
					>
						Next Question
					</Text>
				</TouchableOpacity>
			);
		} else {
			return null;
		}
	};

	const [progress, setProgress] = useState(new Animated.Value(0));
	const progressAnim = progress.interpolate({
		inputRange: [0, allQuestions.length],
		outputRange: ["0%", "100%"],
	});

	const renderProgressBar = () => {
		return (
			<View
				style={{
					width: "100%",
					height: 20,
					borderRadius: 20,
					backgroundColor: "#00000020",
				}}
			>
				<Animated.View
					style={[
						{
							height: 20,
							borderRadius: 20,
							backgroundColor: COLORS.secondary,
						},
						{
							width: progressAnim,
						},
					]}
				></Animated.View>
			</View>
		);
	};

	return (
		<GestureHandlerRootView
			style={{
				flex: 1,
			}}
		>
			<StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
			<View
				style={{
					flex: 1,
					paddingTop: 100,
					paddingBottom: 40,
					paddingHorizontal: 20,
					backgroundColor: COLORS.primary,
					position: "relative",
				}}
			>
				<ScrollView>
					{/* ProgressBar */}
					{renderProgressBar()}

					{/* Question */}
					{renderQuestion()}

					{/* Options */}
					{renderOptions()}

					{/* Next Button */}
					{renderNextButton()}
				</ScrollView>

				{/* Score Modal */}
				<Modal
					animationType="slide"
					transparent={true}
					visible={showScoreModal}
				>
					<View
						style={{
							flex: 1,
							backgroundColor: COLORS.primary,
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<View
							style={{
								backgroundColor: COLORS.white,
								width: "90%",
								borderRadius: 20,
								padding: 20,
								alignItems: "center",
							}}
						>
							<Lottie
								source={getLottie(stage(answers).stage)}
								autoPlay
								loop
								resizeMode="content"
								style={{
									width: 300,
									height: 300,
								}}
							/>

							<View
								style={{
									flexDirection: "row",
									justifyContent: "flex-start",
									alignItems: "center",
									marginVertical: 20,
								}}
							>
								<View
									style={{
										justifyContent: "space-between",
										alignItems: "center",
									}}
								>
									{/* <Text
										style={{
											color: "black",
											fontFamily: FONTS.semiBold,
											fontSize: 15,
										}}
									>
										Total Score: {stage(answers).scorePercentage}%
									</Text> */}
									<Text
										style={{
											color: "black",
											fontFamily: FONTS.regular,
											fontSize: 18,
											padding: 5,
										}}
									>
										Startup Stage:{" "}
										<Text
											style={{
												fontFamily: FONTS.bold,
											}}
										>
											{stage(answers).stage}
										</Text>
									</Text>
									<Text
										style={{
											color: "black",
											fontFamily: FONTS.regular,
											fontSize: 18,
										}}
									>
										Category Scores:
									</Text>
									{Object.entries(stage(answers).categoryScores).map(
										([category, score]) => (
											<View key={category} classname="bg-secondary p-2">
												<Text
													style={{
														color: "black",
														fontFamily: FONTS.semiBold,
														fontSize: 15,
													}}
												>
													{category.charAt(0).toUpperCase() + category.slice(1)}
													:{" "}
													<Text
														style={{
															fontFamily: FONTS.bold,
														}}
													>
														{score.toFixed(2)}
													</Text>
												</Text>
											</View>
										)
									)}
								</View>
							</View>
							<RectButton minWidth={200} handlePress={restartQuiz} />
						</View>
					</View>
				</Modal>

				{/* Background Image */}
				<Image
					source={require("../assets/images/DottedBG1.png")}
					style={{
						width: SIZES.width,
						height: 130,
						zIndex: -1,
						position: "absolute",
						bottom: 0,
						left: 0,
						right: 0,
						opacity: 0.5,
					}}
					resizeMode={"contain"}
				/>
			</View>
		</GestureHandlerRootView>
	);
};

export default Quiz;
