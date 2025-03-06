import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { useState } from 'react'
import { icons } from '../constants'

const SearchInput = ({ title, value, handleChangeText, otherStyles, placeholder, ...props }) => {

    const [hidePassword, setHidePassword] = useState(true)

    return (
        <View className="border-2 border-black-200 h-16 w-full px-4 bg-black-100 rounded-2xl items-center flex-row focus:border-secondary space-x-4">
            <TextInput
                className="text-base mt-0.5 font-pregular text-white flex-1"
                value={value}
                placeholder="Search for a video topic"
                placeholderTextColor='#7b7b8b'
                onChangeText={handleChangeText}
                secureTextEntry={title === 'Password' && hidePassword}
            />
            <TouchableOpacity>
                <Image
                    source={icons.search}
                    className="w-5 h-5"
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View>
    )
}

export default SearchInput