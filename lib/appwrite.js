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

		if (!newAccount) throw Error;

		const avatarUrl = avatars.getInitials(username);

		await signIn(email, password);

		const newUser = await databases.createDocument(
			databaseId,
			userCollectionId,
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
		throw new Error(error);
	}
}

// Sign In
export async function signIn(email, password) {
	try {
		const session = await account.createEmailPasswordSession(email, password);

		return session;
	} catch (error) {
		throw new Error(error);
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
		const currentAccount = await getAccount();
		if (!currentAccount) throw Error;

		const currentUser = await databases.listDocuments(
			databaseId,
			userCollectionId,
			[Query.equal("accountId", currentAccount.$id)]
		);

		if (!currentUser) throw Error;

		return currentUser.documents[0];
	} catch (error) {
		console.log(error);
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

export const checkSession = () => {
	const router = useRouter();
	const [isSessionActive, setIsSessionActive] = useState(false);

	useEffect(() => {
		const checkSession = async () => {
			try {
				// Attempt to get the current account
				await getAccount();
				setIsSessionActive(true);
			} catch (error) {
				console.error("Failed to check session:", error);
				setIsSessionActive(false);
			}
		};

		checkSession();

		// Optionally, re-check session status periodically
		const interval = setInterval(checkSession, 60000); // Check every minute

		return () => clearInterval(interval); // Clean up interval on unmount
	}, []);

	useEffect(() => {
		if (isSessionActive) {
			router.replace("/home");
		}
	}, [isSessionActive]);
};
