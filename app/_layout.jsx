// Root Layout Component of the App.
// this file sets up global states and behaviors (like font loading and splash screen management), ensuring a consistent start across the app.

import { StyleSheet, Text, View } from "react-native";
import { SplashScreen, Slot, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";

import GlobalProvider from "../context/GlobalProvider";

SplashScreen.preventAutoHideAsync(); // this ensures that the splash screen remains visible until certain conditions are met, typically until all resources (like fonts) have been loaded.

const RootLayout = () => {
	const [fontsLoaded, error] = useFonts({
		"SF-Pro-Display-Black": require("../assets/fonts/display/SF-Pro-Display-Black.otf"),
		"SF-Pro-Display-BlackItalic": require("../assets/fonts/display/SF-Pro-Display-BlackItalic.otf"),
		"SF-Pro-Display-Bold": require("../assets/fonts/display/SF-Pro-Display-Bold.otf"),
		"SF-Pro-Display-BoldItalic": require("../assets/fonts/display/SF-Pro-Display-BoldItalic.otf"),
		"SF-Pro-Display-Heavy": require("../assets/fonts/display/SF-Pro-Display-Heavy.otf"),
		"SF-Pro-Display-HeavyItalic": require("../assets/fonts/display/SF-Pro-Display-HeavyItalic.otf"),
		"SF-Pro-Display-Light": require("../assets/fonts/display/SF-Pro-Display-Light.otf"),
		"SF-Pro-Display-LightItalic": require("../assets/fonts/display/SF-Pro-Display-LightItalic.otf"),
		"SF-Pro-Display-Medium": require("../assets/fonts/display/SF-Pro-Display-Medium.otf"),
		"SF-Pro-Display-MediumItalic": require("../assets/fonts/display/SF-Pro-Display-MediumItalic.otf"),
		"SF-Pro-Display-Regular": require("../assets/fonts/display/SF-Pro-Display-Regular.otf"),
		"SF-Pro-Display-RegularItalic": require("../assets/fonts/display/SF-Pro-Display-RegularItalic.otf"),
		"SF-Pro-Display-Semibold": require("../assets/fonts/display/SF-Pro-Display-Semibold.otf"),
		"SF-Pro-Display-SemiboldItalic": require("../assets/fonts/display/SF-Pro-Display-SemiboldItalic.otf"),
		"SF-Pro-Display-Thin": require("../assets/fonts/display/SF-Pro-Display-Thin.otf"),
		"SF-Pro-Display-ThinItalic": require("../assets/fonts/display/SF-Pro-Display-ThinItalic.otf"),
		"SF-Pro-Display-Ultralight": require("../assets/fonts/display/SF-Pro-Display-Ultralight.otf"),
		"SF-Pro-Display-UltralightItalic": require("../assets/fonts/display/SF-Pro-Display-UltralightItalic.otf"),
		"SF-Pro-Text-Black": require("../assets/fonts/text/SF-Pro-Text-Black.otf"),
		"SF-Pro-Text-BlackItalic": require("../assets/fonts/text/SF-Pro-Text-BlackItalic.otf"),
		"SF-Pro-Text-Bold": require("../assets/fonts/text/SF-Pro-Text-Bold.otf"),
		"SF-Pro-Text-BoldItalic": require("../assets/fonts/text/SF-Pro-Text-BoldItalic.otf"),
		"SF-Pro-Text-Heavy": require("../assets/fonts/text/SF-Pro-Text-Heavy.otf"),
		"SF-Pro-Text-HeavyItalic": require("../assets/fonts/text/SF-Pro-Text-HeavyItalic.otf"),
		"SF-Pro-Text-Light": require("../assets/fonts/text/SF-Pro-Text-Light.otf"),
		"SF-Pro-Text-LightItalic": require("../assets/fonts/text/SF-Pro-Text-LightItalic.otf"),
		"SF-Pro-Text-Medium": require("../assets/fonts/text/SF-Pro-Text-Medium.otf"),
		"SF-Pro-Text-MediumItalic": require("../assets/fonts/text/SF-Pro-Text-MediumItalic.otf"),
		"SF-Pro-Text-Regular": require("../assets/fonts/text/SF-Pro-Text-Regular.otf"),
		"SF-Pro-Text-RegularItalic": require("../assets/fonts/text/SF-Pro-Text-RegularItalic.otf"),
		"SF-Pro-Text-Semibold": require("../assets/fonts/text/SF-Pro-Text-Semibold.otf"),
		"SF-Pro-Text-SemiboldItalic": require("../assets/fonts/text/SF-Pro-Text-SemiboldItalic.otf"),
		"SF-Pro-Text-Thin": require("../assets/fonts/text/SF-Pro-Text-Thin.otf"),
		"SF-Pro-Text-ThinItalic": require("../assets/fonts/text/SF-Pro-Text-ThinItalic.otf"),
		"SF-Pro-Text-Ultralight": require("../assets/fonts/text/SF-Pro-Text-Ultralight.otf"),
		"SF-Pro-Text-UltralightItalic": require("../assets/fonts/text/SF-Pro-Text-UltralightItalic.otf"),
	}); // this hook from "expo-font" is used to load custom fonts from local assets. This is crucial for ensuring that the app displays correctly with the desired typography.

	useEffect(() => {
		if (error) throw error;

		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded, error]);

	if (!fontsLoaded && !error) {
		return null;
	} // The component conditionally renders based on whether the fonts have finished loading (fontsLoaded) or if there was an error during loading (error). If the fonts haven't loaded yet, it returns null, effectively showing nothing until the fonts are ready.

	// the operator && returns the value of the first falsy operand encountered when evaluating from left to right, or the value of the last operand if they are all truthy.

	return (
		<GlobalProvider>
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen name="(auth)" options={{ headerShown: false }} />
				<Stack.Screen name="Quiz" options={{ headerShown: false }} />
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen name="search/[query]" options={{ headerShown: false }} />
				<Stack.Screen
					name="course/[courseId]"
					options={{ headerShown: false }}
				/>
			</Stack>
		</GlobalProvider>
	);
	// the <Stack> component manages a stack of screens, allowing users to navigate forward to new screens while pushing them onto the stack, and backward by popping screens off the stack.

	// Within the <Stack> component, a <Stack.Screen> component is defined with the name "index" and options to hide the header (options={{ headerShown: false }}). This configuration indicates that the screen named "index" should be part of the stack navigator but its header should not be displayed. This is done for the initial or home screen of an app to maximize the available space for content.
};

export default RootLayout; //this defines a RootLayout component that wraps around the entire application. This component is used as the top-level component in the app's entry point, ensuring that the font loading logic and splash screen management are applied globally.
