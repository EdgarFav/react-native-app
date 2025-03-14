import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useVideoPlayer, VideoView } from 'expo-video'
import * as ImagePicker from 'expo-image-picker';
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { icons } from '../../constants'
import { router } from 'expo-router';
import { createVideo } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const Create = () => {
    const { user } = useGlobalContext();
    const [uploading, setUploading] = useState(false)
    const [form, setForm] = useState({
        title: "",
        video: null,
        thumbnail: null,
        promptVideo: ""
    })
    console.log(form)

    const player = useVideoPlayer(form.video, player => {
        if (!form.video) {
            player.play();
        }
    });

    const openPicker = async (selectType) => {
        let res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: selectType === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
            aspect: [4, 3],
            quality: 1,
        })

        if (!res.canceled) {
            if (selectType === 'image') {
                setForm({ ...form, thumbnail: res.assets[0] })
            }
            if (selectType === 'video') {
                setForm({ ...form, video: res.assets[0] })
            }
        }
        // else {
        //     setTimeout(() => {
        //         Alert.alert('Document picked', JSON.stringify(res, null, 2))
        //     }, 100)
        // }
    }

    const submit = async () => {
        if (form.title === "" || !form.video || !form.thumbnail || form.promptVideo === "") {
            Alert.alert('Missing fields', 'Please fill all the fields')
        }
        setUploading(true)

        try {
            await createVideo({
                ...form, userId: user.$id
            })

            Alert.alert("Success", "Video uploaded successfully")
            router.push('/home')
        } catch (error) {
            Alert.alert("Error", error.message)
        } finally {
            setForm({
                title: "",
                video: null,
                thumbnail: null,
                promptVideo: ""
            })
            setUploading(false)
        }
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView className="px-4 py-6">
                <Text className="text-2xl text-white font-psemibold">
                    Upload Video
                </Text>

                <FormField
                    title="Video Title"
                    value={form.title}
                    placeholder="Give your video an awesome title"
                    handleChangeText={(e) => setForm({ ...form, title: e })}
                    otherStyles="mt-10"
                />

                <View className="mt-7 space-y-2">
                    <Text className="text-base text-gray-100 font-pmedium">Upload a Video</Text>
                    <TouchableOpacity
                        onPress={() => openPicker('video')}
                    >
                        {form.video ? (
                            <VideoView
                                player={player}
                                style={{
                                    width: '100%',
                                    height: 200,
                                    borderRadius: 35,
                                    marginTop: 10,
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                }}
                                contentFit="contain"
                                nativeControls={false}
                                onEnd={() => {
                                    setPlay(false);
                                    // player?.pause();
                                }}
                            />
                        ) : (
                            <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                                    <Image
                                        source={icons.upload}
                                        resizeMode='contain'
                                        className="w-1/2 h-1/2"
                                    />
                                </View>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
                <View className="mt-7 space-y-2">
                    <Text className="text-base text-gray-100 font-pmedium">Thumbnail Image</Text>
                    <TouchableOpacity
                        onPress={() => openPicker('image')}
                    >
                        {form.thumbnail ? (
                            <Image
                                source={{ uri: form.thumbnail.uri }}
                                resizeMode='contain'
                                className="w-full h-64 rounded-2xl"
                            />
                        ) : (
                            <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border border-black-200 flex-row space-x-2">
                                <Image
                                    source={icons.upload}
                                    resizeMode='contain'
                                    className="w-5 h-5"
                                />
                                <Text className="text-sm font-pmedium text-white">Choose a file</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
                <FormField
                    title="AI Prompt"
                    value={form.promptVideo}
                    placeholder="The prompt you used to generate this video"
                    handleChangeText={(e) => setForm({ ...form, promptVideo: e })}
                    otherStyles="mt-7"
                />
                <CustomButton
                    title="Submit & Publish"
                    handlePress={submit}
                    containerStyles="mt-7"
                    isLoading={uploading}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Create