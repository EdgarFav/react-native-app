import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { useState } from 'react'
import { icons } from '../constants'

const FormField = ({ title, value, handleChangeText, otherStyles, placeholder, ...props }) => {

    const [hidePassword, setHidePassword] = useState(true)

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
            <View className="border-2 border-black-200 h-16 w-full px-4 bg-black-100 rounded-2xl items-center flex-row focus:border-secondary">
                <TextInput
                    className="flex-1 text-white font-psemibold text-base "
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor='#7b7b8b'
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password' && hidePassword}
                />
                {title === 'Password' && (
                    <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                        <Image
                            source={!hidePassword ? icons.eye : icons.eyeHide}
                            className="w-8 h-8"
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default FormField