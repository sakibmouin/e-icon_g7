import { router, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import * as DocumentPicker from "expo-document-picker";
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
	businessesCollectionId: "66a8fe1c000d7cd1f63f",
	storageId: "6690fafe0008f8cc33fb",
	pdfStorageBucketId: "66a8fe380025252a0cc2",
};

const {
	endpoint,
	platform,
	projectId,
	databaseId,
	userCollectionId,
	businessesCollectionId,
	storageId,
	pdfStorageBucketId,
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

		// If there's a session, try to get the account
		const currentAccount = await account.get();
		console.log(currentAccount);

		// Then fetch the user document
		const currentUser = await databases.listDocuments(
			databaseId,
			userCollectionId,
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
			await signOut();
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

export const checkSession = async () => {
	const [isSessionActive, setIsSessionActive] = useState(false);
	const session = await account.getSession("current");
	if (!session) {
		console.log("No active session found");
		return null;
	} else {
		setIsSessionActive(true);
		return isSessionActive;
	}
};

// --------------------------------------------------------------------

export async function uploadFile(file) {
	if (!file) return;

	const { mimeType, ...rest } = file;
	const asset = { type: mimeType, ...rest };

	try {
		const uploadedFile = await storage.createFile(
			pdfStorageBucketId,
			ID.unique(),
			asset
		);

		const fileId = uploadedFile.$id;
		const fileUrl = await getFileUrl(fileId);
		return { fileId, fileUrl };
	} catch (error) {
		console.error("Error uploading file:", error);
		throw error;
	}
}

export async function getFileId(fileId) {
	return fileId;
}

export async function getFileUrl(fileId) {
	let fileUrl;

	try {
		fileUrl = storage.getFileView(pdfStorageBucketId, fileId);

		if (!fileUrl) throw Error;

		return fileUrl;
	} catch (error) {
		throw new Error(error);
	}
}

export async function createBusiness(form) {
	try {
		const uploadResult = await uploadFile(form.pdfFile);
		const pdfFileUrl = uploadResult.fileUrl;
		const pdfId = uploadResult.fileId;

		const newBusiness = await databases.createDocument(
			databaseId,
			businessesCollectionId,
			ID.unique(),
			{
				name: form.name,
				pdfFileUrl: pdfFileUrl,
				description: form.description,
				users: form.userId,
				pdfId: pdfId,
			}
		);

		return newBusiness;
	} catch (error) {
		console.error("Error creating business:", error);
		throw error;
	}
}

export async function deleteBusiness(business) {
	const documentId = business.$id;
	deletePdf(business.pdfId);
	const response = await databases.deleteDocument(
		databaseId,
		businessesCollectionId,
		documentId
	);
}

// --------------------------------------------------------------------

// Fetch businesses from the database
export const fetchBusinesses = async () => {
	try {
		const response = await databases.listDocuments(
			databaseId,
			businessesCollectionId
		);
		return response.documents;
	} catch (error) {
		console.error("Error fetching Businesses: ", error);
		throw error;
	}
};

// Fetch businesses for a specific user
export const getUserBusinesses = async (userId) => {
	try {
		const response = await databases.listDocuments(
			databaseId,
			businessesCollectionId,
			[Query.equal("users", userId)]
		);
		return response.documents;
	} catch (error) {
		console.error("Error fetching user's businesses: ", error);
		throw error;
	}
};

export const openPdf = async (fileId) => {
	try {
		const response = await storage.getFileDownload(pdfStorageBucketId, fileId);
		const fileUrl = response.href;
		return fileUrl;
	} catch (error) {
		console.log("Error Opening PDF: " + error);
		throw error;
	}
};

export const deletePdf = async (fileId) => {
	try {
		const resopnse = await storage.deleteFile(pdfStorageBucketId, fileId);
		return resopnse;
	} catch (error) {
		console.log("Error deleting Pdf: " + error);
		throw error;
	}
};
