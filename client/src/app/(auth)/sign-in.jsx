import { View, Text, Alert, FlatList, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from "expo-router";
import { useSignIn } from '@clerk/clerk-expo';
import { AuthStyles } from '../../../assets/styles/auth.style.js'
import { Image } from 'expo-image'
import { COLORS } from '../../../constants/colors.js';
import { Ionicons } from "@expo/vector-icons";
const sign_in = () => {

  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)


  const handelSignIn = async () => {
    Alert.alert("Error", "please fill the fields")


    if (!isLoaded) return

    try {
      const signInAttampt = await signIn.create({
        identifier: email,
        password
      })
      if (signInAttampt.status === "complete") {
        const active = await setActive({ session: signInAttampt.createdSessionId })
      } else
        Alert.alert("error", "sign in filed please try again")
      console.log(JSON.stringify(signInAttampt, null, 2))
    }

    catch (err) {
      Alert.alert("Error", err.errors?.[0]?.message || "Sign in failed")
      console.log(JSON.stringify(err, null, 2))

    } finally {
      setLoading(false)

    }
  }



  return (
    <View style={AuthStyles.container} >
      <KeyboardAvoidingView
        style={AuthStyles.keyboardView}
        behavior={Platform.OS === "android" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 :0 }
      >

        <ScrollView
          contentContainerStyle={AuthStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={AuthStyles.imageContainer}>
            <Image
              source={require("../../../assets/expo.icon/Assets/images/i1.png")}
              style={AuthStyles.image}
              contentFit='contain'
            />
            <Text style={AuthStyles.title}>Welcome Back</Text>

            <View style={AuthStyles.formContainer}>

              <View style={AuthStyles.inputContainer}>

                <TextInput
                  style={AuthStyles.textInput}
                  placeholder="Enter Email"
                  placeholderTextColor={COLORS.textLight}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize='none'
                />



                {/* password input */}
                <View style={AuthStyles.inputContainer}>
                  <TextInput
                    style={AuthStyles.textInput}
                    placeholder='Enter Password'
                    placeholderTextColor={COLORS.textLight}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize='none'
                  />
                  <TouchableOpacity
                    style={AuthStyles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}

                  >
                    <Ionicons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={20}
                      color={COLORS.textLight}
                    />

                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                style={[AuthStyles.authButton, loading && AuthStyles.buttonDisabled]}
                onPress={handelSignIn}
                disabled={loading}
                activeOpacity={0.8}
                >
                  <Text style={AuthStyles.buttonText}>{loading ? "Signing In ...": "Sing in"}</Text>
                </TouchableOpacity>



                {/* sing up in link */}

                
                <TouchableOpacity
                style={AuthStyles.linkContainer}
                onPress={() =>router.push("/(auth)/sing-up")}
                >

                  <Text style={AuthStyles.linkText}>
                    Don&apos;t have an account? <Text style={AuthStyles.link} >Sign up</Text> 
                  </Text>

                
                </TouchableOpacity>

              </View>

            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

export default sign_in