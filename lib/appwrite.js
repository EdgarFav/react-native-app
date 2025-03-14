import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite';

export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.nahucodes.aora",
    projectId: "67c2a4f9001aa67a2ecf",
    databaseId: "67c2a7ae000b7d101c56",
    userCollectionId: "67c2a7d1003473329f24",
    videoCollectionId: "67c2a7f6000e6d7ecf81",
    storageId: "67c2ab56001c3d3d800c"
}

const { endpoint, platform, projectId, databaseId, userCollectionId, videoCollectionId, storageId } = config;

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(endpoint) // Your Appwrite Endpoint
    .setProject(projectId) // Your project ID
    .setPlatform(platform) // Your application ID or bundle ID.
    ;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

// Register User
export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if (!newAccount) throw Error

        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password)

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )
        return newUser

    } catch (error) {
        throw new Error(error)
    }
}

// Sign in
export const signIn = async (email, password) => {
    try {

        // // Cerrar todas las sesiones activas
        // const sessions = await account.listSessions();
        // for (const session of sessions.sessions) {
        //     await account.deleteSession(session.$id);
        // }

        const session = await account.createEmailPasswordSession(email, password)
        return session
    } catch (error) {
        throw new Error(error)
    }
}

// Get Account
export const getAccount = async () => {
    try {
        const currentAccount = await account.get();

        return currentAccount;
    } catch (error) {
        throw new Error(error);
    }
}

// Get current user
export const getCurrentUser = async () => {
    try {
        const currentAccount = await getAccount();

        if (!currentAccount) throw Error

        const currentUser = await databases.listDocuments(
            databaseId,
            userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        )

        if (!currentUser) throw Error

        return currentUser.documents[0]
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId
        )
        return posts.documents
    } catch (error) {
        throw new Error(error)

    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc("$createdAt"), Query.limit(7)]
        )
        return posts.documents
    } catch (error) {
        throw new Error(error)

    }
}

export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.search("title", query)]
        )
        return posts.documents
    } catch (error) {
        throw new Error(error)

    }
}

export const searchUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.equal("creator", userId)]
        )
        return posts.documents
    } catch (error) {
        throw new Error(error)

    }
}

export const signOut = async () => {
    try {
        const session = await account.deleteSession('current')
        return session
    } catch (error) {
        throw new Error(error)

    }
}

export const getFilePreview = async (fileId, type) => {
    let fileUrl

    try {
        if (type === "video") {
            fileUrl = storage.getFileView(storageId, fileId)
        } else if (type === "image") {
            fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, 'top', 100)
        } else {
            throw new Error("Invalid file type")
        }
    } catch (error) {
        console.log("soy el primer error", error)
        throw new Error(error)
    }
    if (!fileUrl) throw new Error
    return fileUrl
}

export const uploadFile = async (file, type) => {
    if (!file) return

    const { mimetype, ...rest } = file
    const asset = { type: mimetype, ...rest }
    try {
        const uploadedFile = await storage.createFile(
            storageId,
            ID.unique(),
            asset,
        );

        const fileUrl = await getFilePreview(uploadedFile.$id, type)
        return fileUrl
    } catch (error) {
        console.log("soy el penultimo error", error)
        throw new Error(error)
    }
}

export const createVideo = async (form) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, "image"),
            uploadFile(form.video, "video"),
        ])

        const newPost = await databases.createDocument(databaseId, videoCollectionId, ID.unique(), {
            title: form.title,
            thumbnail: thumbnailUrl,
            video: videoUrl,
            promptVideo: form.promptVideo,
            creator: form.userId
        })
        return newPost
    } catch (error) {
        console.log("soy el ultimo error", error);
        throw new Error(error)
    }
}