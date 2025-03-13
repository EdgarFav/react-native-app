import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import { useState } from 'react'
import { icons } from '../constants'
import { router, usePathname } from 'expo-router'

const SearchInput = ({ initialQuery }) => {

    const pathName = usePathname()
    const [query, setQuery] = useState(initialQuery || "")

    return (
        <View className="border-2 border-black-200 h-16 w-full px-4 bg-black-100 rounded-2xl items-center flex-row focus:border-secondary space-x-4">
            <TextInput
                className="text-base mt-0.5 font-pregular text-white flex-1"
                value={query}
                placeholder="Search for a video topic"
                placeholderTextColor='#CDCDE0'
                onChangeText={(e) => setQuery(e)}
            />
            <TouchableOpacity
                onPress={() => {
                    if (!query) {
                        Alert.alert("Missing query", "Please input something to search")
                    }

                    if (pathName.startsWith("/search")) router.setParams({ query })
                    else router.push(`/search/${query}`)
                }}
            >
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