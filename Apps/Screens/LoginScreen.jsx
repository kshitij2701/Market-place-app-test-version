import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {

  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View>
       <Image source={require('./../../assets/images/login.jpg')}
           className="w-full h-[400px] object-cover"
       />
       <View className="p-8 pl-6 bg-white mt-[-16px] rounded-t-3xl shadow-md">
            <Text className="text-[30px] text-left font-bold">FreeFlow Market</Text>
            <Text className="text-[15px] text-slate-500 mt-3">We have a wide range of  Free Products for you to choose from</Text>
            <TouchableOpacity onPress={onPress} className="p-4 bg-blue-500 rounded-full mt-20">
                <Text className="text-white text-center text-[18px]">Get Started</Text>
            </TouchableOpacity>
       </View>
    </View>
  )
}