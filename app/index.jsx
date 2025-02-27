import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Redirect, router } from 'expo-router'
import { images } from '../constants'
import CustomButton from '../components/customButton'

const index = () => {

    return (
        <SafeAreaView className="bg-primary h-full" >
            <ScrollView contentContainerStyle={{ height: '100%' }} >
                <View className="w-full min-h-[85vh] items-center justify-center">
                    <Image
                        source={images.logo}
                        resizeMode='contain'
                        className="w-[130px] h-[84px]"
                    />
                    <Image
                        source={images.cards}
                        resizeMode='contain'
                        className="max-w-[380px] w-full h-[300px]"
                    />
                    <View className="relative mt-5">
                        <Text className="text-3xl text-white font-bold text-center">
                            Discover Endless Possibilities with{" "}
                            <Text className="text-secondary-200">Aora</Text>
                        </Text>
                        <Image
                            source={images.path}
                            className="w-[135px] h-[20px] absolute -bottom-3 right-28"
                            resizeMode='contain'
                        />
                    </View>
                    <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
                        Where creativity meets innovation: embark on a journey of endless possibilities with Aora
                    </Text>
                    <CustomButton
                        title="Continue with email"
                        handlePress={() => router.push('/sign-in')}
                        containerStyles="w-full mt-7"
                    />
                </View>
            </ScrollView>
            <StatusBar backgroundColor='#161622' style='light' />
        </SafeAreaView >
    )
}

export default index
