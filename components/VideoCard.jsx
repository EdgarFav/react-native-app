import { View, Text, Image, TouchableOpacity } from 'react-native'
import { icons } from '../constants'
import { useState } from 'react'
import { useVideoPlayer, VideoView } from 'expo-video'


const VideoCard = ({ video: { title, thumbnail, video, creator: { username, avatar } } }) => {
    const [play, setPlay] = useState(false)

    const player = useVideoPlayer(play ? video : null, player => {
        if (play) {
            player.play();
        }
    });

    return (
        <View className="flex-col items-center px-4 mb-14">
            <View className="gap-3 items-start flex-row">
                <View className="justify-center items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] justify-center items-center rounded-lg border border-secondary  p-0.5">
                        <Image
                            source={{ uri: avatar }}
                            className="w-full h-full rounded-lg"
                            re
                        />
                    </View>
                    <View className="justify-center flex-1 ml-3 gap-y-1">
                        <Text className="text-white font-psemibold text-sm" numberOfLines={1}>{title}</Text>
                        <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>{username}</Text>
                    </View>
                </View>
                <View className="pt-2">
                    <Image
                        source={icons.menu}
                        className="w-5 h-5"
                        resizeMode='contain'
                    />
                </View>
            </View>

            {play ? (<VideoView
                player={player}
                style={{
                    width: '100%',
                    height: 200,
                    borderRadius: 35,
                    marginTop: 10,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }}
                contentFit="contain"
                nativeControls={true}
                onEnd={() => {
                    setPlay(false);
                    // player?.pause();
                }}
            />)
                : (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => setPlay(true)}
                        className="w-full h-60 rounded-xl mt-3 relative justify-center items-center">
                        <Image
                            source={{ uri: thumbnail }}
                            className="w-full h-full rounded-xl mt-3 absolute"
                            resizeMode='cover'
                        />
                        <Image
                            source={icons.play}
                            className="w-12 h-12 absolute"
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                )}

        </View>
    )
}

export default VideoCard