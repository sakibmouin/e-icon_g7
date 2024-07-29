import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
	Account,
	Client,
	ID,
	Avatars,
	Databases,
	Query,
	Storage,
} from "react-native-appwrite";

export const config = {
	endpoint: "https://cloud.appwrite.io/v1",
	platform: "com.g7.starnav",
	projectId: "6690ac320023fc19ec92",
	databaseId: "6690fa64003d3dcbae68",
	userCollectionId: "6690fa70002678ec636a",
	storageId: "6690fafe0008f8cc33fb",
};

const {
	endpoint,
	platform,
	projectId,
	databaseId,
	userCollectionId,
	storageId,
} = config;

// Init the SDK
const client = new Client();

client
	.setEndpoint(endpoint) // Appwrite Endpoint
	.setProject(projectId) // Project ID
	.setPlatform(platform); // Application ID

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export async function createUser(email, password, username) {
	try {
		const newAccount = await account.create(
			ID.unique(),
			email,
			password,
			username
		);

		const avatarUrl = avatars.getInitials(username);

		// Sign in the user immediately after creation
		await signIn(email, password);

		const newUser = await databases.createDocument(
			config.databaseId,
			config.userCollectionId,
			ID.unique(),
			{
				accountId: newAccount.$id,
				email: email,
				username: username,
				avatar: avatarUrl,
			}
		);

		return newUser;
	} catch (error) {
		console.error("Error creating user:", error);
		throw error;
	}
}

// Sign In
export async function signIn(email, password) {
	try {
		const session = await account.createEmailPasswordSession(email, password);
		// Optionally, you can get and return the user info here
		const user = await getCurrentUser();
		return user;
	} catch (error) {
		console.error("Error signing in:", error);
		throw error;
	}
}

// Get Account
export async function getAccount() {
	try {
		const currentAccount = await account.get();

		return currentAccount;
	} catch (error) {
		throw new Error(error);
	}
}

// Get Current User
export async function getCurrentUser() {
	try {
		// First, check if there's an active session
		const session = await account.getSession("current");
		if (!session) {
			console.log("No active session found");
			return null;
		}

		// If there's a session, try to get the account
		const currentAccount = await account.get();

		// Then fetch the user document
		const currentUser = await databases.listDocuments(
			config.databaseId,
			config.userCollectionId,
			[Query.equal("accountId", currentAccount.$id)]
		);

		if (currentUser.documents.length === 0) {
			console.log("User document not found");
			return null;
		}

		return currentUser.documents[0];
	} catch (error) {
		console.log("Error getting current user:", error);
		if (
			error.code === 401 ||
			error.message.includes("missing scope (account)")
		) {
			console.log("User is not authenticated or lacks necessary permissions");
			// You might want to trigger a sign out or redirect to login here
			await signOut(); // Call your signOut function
			return null;
		}
		return null;
	}
}

// Sign Out
export async function signOut() {
	try {
		const session = await account.deleteSession("current");

		return session;
	} catch (error) {
		throw new Error(error);
	}
}

export const useCheckSession = () => {
	const router = useRouter();
	const [isSessionActive, setIsSessionActive] = useState(false);

	useEffect(() => {
		const checkSession = async () => {
			try {
				const user = await getCurrentUser();
				if (user) {
					setIsSessionActive(true);
				} else {
					setIsSessionActive(false);
				}
			} catch (error) {
				console.error("Error checking session:", error);
				setIsSessionActive(false);
			}
		};

		checkSession();
		const interval = setInterval(checkSession, 60000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (isSessionActive) {
			router.replace("/home");
		} else {
			router.replace("/login");
		}
	}, [isSessionActive, router]);

	return isSessionActive;
};
