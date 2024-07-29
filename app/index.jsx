import { View, StyleSheet } from "react-native";
import { Redirect } from "expo-router";
import Animated, {
	useAnimatedRef,
	useAnimatedScrollHandler,
	useSharedValue,
} from "react-native-reanimated";

import { useGlobalContext } from "../context/GlobalProvider";
import Pagination from "../components/onboarding/Pagination";
import OnboardingButton from "../components/onboarding/OnboardingButton";
import RenderItem from "../components/onboarding/RenderItem";
import data from "./data/onboarding";

const App = () => {
	const { loading, isLogged } = useGlobalContext();
	const flatListRef = useAnimatedRef();
	const x = useSharedValue(0);
	const flatListIndex = useSharedValue(0);

	console.log(isLogged);

	const onViewableItemsChanged = ({ viewableItems }) => {
		if (viewableItems && viewableItems[0] && viewableItems[0].index !== null) {
			flatListIndex.value = viewableItems[0].index;
		}
	};

	const onScroll = useAnimatedScrollHandler({
		onScroll: (event) => {
			x.value = event.contentOffset.x;
		},
	});

	if (!loading && isLogged) {
		return <Redirect href="/home" />;
	} else {
		return (
			<View style={styles.container}>
				<Animated.FlatList
					ref={flatListRef}
					onScroll={onScroll}
					data={data}
					renderItem={({ item, index }) => {
						return <RenderItem item={item} index={index} x={x} />;
					}}
					keyExtractor={(item) => item.id.toString()}
					scrollEventThrottle={16}
					horizontal={true}
					bounces={false}
					pagingEnabled={true}
					showsHorizontalScrollIndicator={false}
					onViewableItemsChanged={onViewableItemsChanged}
					viewabilityConfig={{
						minimumViewTime: 300,
						viewAreaCoveragePercentThreshold: 10,
					}}
				/>
				<View style={styles.bottomContainer}>
					<Pagination data={data} x={x} />
					<OnboardingButton
						flatListRef={flatListRef}
						flatListIndex={flatListIndex}
						dataLength={data.length}
						x={x}
					/>
				</View>
			</View>
		);
	}
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	bottomContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginHorizontal: 30,
		paddingVertical: 30,
		position: "absolute",
		bottom: 20,
		left: 0,
		right: 0,
	},
});

export default App;
