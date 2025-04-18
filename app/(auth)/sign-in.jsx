import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { Link, router } from 'expo-router'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { images } from '../../constants'
import { signIn, getCurrentUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'


const SignIn = () => {

    const { setUser, setIsLogged } = useGlobalContext()

    const [isSubmitting, setisSubmitting] = useState(false)

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const submit = async () => {
        if (form.email === "" || form.password === "") {
            Alert.alert("Please fill in all fields")
        }

        setisSubmitting(true)

        try {
            await signIn(form.email, form.password)
            const result = await getCurrentUser()

            // Set it to global state
            setUser(result)
            setIsLogged(true)

            Alert.alert("Success", "You are now logged in")
            router.replace('/home')
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setisSubmitting(false)
        }
    }


    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full justify-center min-h-[85vh] px-4 py-6">
                    <Image
                        source={images.logo}
                        resizeMode='contain'
                        className="w-[115px] h-[35px]"
                    />
                    <Text className="text-2xl font-semibold text-white font-psemibold mt-10">
                        Log in to Aora
                    </Text>
                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyles="mt-7"
                        keyBoard="email-address"
                    />
                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                        otherStyles="mt-7"
                    />
                    <CustomButton
                        title="Sign In"
                        handlePress={submit}
                        containerStyles="mt-7"
                        isLoading={isSubmitting}
                    />
                    <View className="justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">
                            Don't have an account?
                        </Text>
                        <Link href="/sign-up" className='text-lg font-psemibold text-secondary'>
                            Sign up
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn