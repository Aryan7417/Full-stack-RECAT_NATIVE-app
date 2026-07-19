import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import { useState } from "react";
import { AuthStyles } from '../../../assets/styles/auth.style.js'
import { Image } from "expo-image";
import { COLORS } from '../../../constants/colors.js';

import { Ionicons } from "@expo/vector-icons";
import VerifyEmail from "./verify-email.jsx";

const SignUpScreen = () => {
  const router = useRouter();
  const { isLoaded, signUp } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password) return Alert.alert("Error", "Please fill in all fields");
    if (password.length < 6) return Alert.alert("Error", "Password must be at least 6 characters");

    if (!isLoaded) return;

    setLoading(true);

    try {
      await signUp.create({ emailAddress: email, password });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err) { {
  if (err instanceof Error) {
    Alert.alert("Error", err.message);
  } else {
    Alert.alert("Error", "Sign in failed");
  }

  console.log(err);
}
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  if (pendingVerification)
    return <VerifyEmail email={email} onBack={() => setPendingVerification(false)} />;



  return (
    <View style={AuthStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        style={AuthStyles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={AuthStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Image Container */}
          <View style={AuthStyles.imageContainer}>
            <Image
              source={require("../../../assets/expo.icon/Assets/images/i2.png")}
              style={AuthStyles.image}
              contentFit="contain"
            />
          </View>

          <Text style={AuthStyles.title}>Create Account</Text>

          <View style={AuthStyles.formContainer}>
            {/* Email Input */}
            <View style={AuthStyles.inputContainer}>
              <TextInput
                style={AuthStyles.textInput}
                placeholder="Enter email"
                placeholderTextColor={COLORS.textLight}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View style={AuthStyles.inputContainer}>
              <TextInput
                style={AuthStyles.textInput}
                placeholder="Enter password"
                placeholderTextColor={COLORS.textLight}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
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

            {/* Sign Up Button */}
            <TouchableOpacity
              style={[AuthStyles.authButton, loading && AuthStyles.buttonDisabled]}
              onPress={handleSignUp}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={AuthStyles.buttonText}>
                {loading ? "Creating Account..." : "Sign Up"}
              </Text>
            </TouchableOpacity>

            {/* Sign In Link */}
            <TouchableOpacity style={AuthStyles.linkContainer} onPress={() => router.back()}>
              <Text style={AuthStyles.linkText}>
                Already have an account? <Text style={AuthStyles.link}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
export default SignUpScreen;