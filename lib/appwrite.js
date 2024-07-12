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
