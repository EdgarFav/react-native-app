import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'
import FormField from '../../components/formField'
import CustomButton from '../../components/customButton'
import { images } from '../../constants'
import { useGlobalContext } from '../../context/GlobalProvider'


const SignUp = () => {

    const { setUser, setIsLogged } = useGlobalContext()

    const [isSubmitting, setisSubmitting] = useState(false)

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    })

    const submit = async () => {
        if (form.email === "" || form.password === "" || form.username === "") {
            Alert.alert("Please fill in all fields")
        }

        setisSubmitting(true)

        try {
            const result = await createUser(form.email, form.password, form.username)

            // Set it to global state
            setUser(result)
            setIsLogged(true)
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
                        Sign up to Aora
                    </Text>
                    <FormField
                        title="Username"
                        value={form.username}
                        handleChangeText={(e) => setForm({ ...form, username: e })}
                        otherStyles="mt-7"
                    />
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
                        title="Sign Up"
                        handlePress={submit}
                        containerStyles="mt-7"
                        isLoading={isSubmitting}
                    />
                    <View className="justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">
                            Have an account?
                        </Text>
                        <Link href="/sign-in" className='text-lg font-psemibold text-secondary'>
                            Sign in
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUp