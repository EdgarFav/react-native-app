import { View, FlatList, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../../components/EmptyState'
import useAppwrite from '../../lib/useAppwrite'
import { searchUserPosts, signOut } from '../../lib/appwrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'
import Infobox from '../../components/Infobox'
import { router } from 'expo-router'

const Profile = () => {
    const { user, setUser, setIsLogged } = useGlobalContext()
    //Custom hook to fetch all data
    const { data: posts } = useAppwrite(() => searchUserPosts(user.$id))

    const logout = async () => {
        await signOut()
        setUser(null)
        setIsLogged(false)

        router.replace('/sign-in')
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={posts}
                // data={[]}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <VideoCard video={item} />
                )}
                ListHeaderComponent={() => (
                    <View className="w-full justify-center items-center mt-6 mb-12 px-4">
                        <TouchableOpacity
                            className="w-full items-end mb-10"
                            onPress={logout}
                        >
                            <Image
                                source={icons.logout}
                                resizeMode='contain'
                                className="w-6 h-6"
                            />
                        </TouchableOpacity>
                        <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
                            <Image
                                source={{ uri: user?.avatar }}
                                resizeMode='cover'
                                className="w-[90%] h-[90%] rounded-lg"
                            />
                        </View>

                        <Infobox
                            title={user?.username}
                            containerStyles="mt-5"
                            titleStyles="text-lg"
                        />

                        <View className="mt-5 flex-row">
                            <Infobox
                                title={posts.length || 0}
                                subtitle="Posts"
                                containerStyles="mr-10"
                                titleStyles="text-xl"
                            />
                            <Infobox
                                title="1.2K"
                                subtitle="Followers"
                                titleStyles="text-xl"
                            />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No videos found"
                        subtitle="No videos found for this search"
                    />
                )}
            />
        </SafeAreaView>
    )
}

export default Profile