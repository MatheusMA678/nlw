import { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

import { Copyright } from "../src/components/Copyright";
import { api } from "../src/lib/api";

import NLWLogo from "../src/assets/nlw-spacetime-logo.svg";

const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint:
    "https://github.com/settings/connections/applications/9037aa74599351b06935",
};

export default function App() {
  const router = useRouter();

  const [, response, signInWithGithub] = useAuthRequest(
    {
      clientId: "9037aa74599351b06935",
      scopes: ["identity"],
      redirectUri: makeRedirectUri({
        scheme: "nlwspacetime",
      }),
    },
    discovery
  );

  async function handleGithubOAuthCode(code: string) {
    try {
      const response = await api.post("/register", {
        code,
      });

      const { token } = response.data;

      await SecureStore.setItemAsync("token", token);

      router.push("/memories");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;

      handleGithubOAuthCode(code);
    }
  }, [response]);

  return (
    <View className="flex-1 items-center px-8 py-10">
      <View className="flex-1 items-center justify-center gap-6 ">
        <NLWLogo />

        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>

        <TouchableOpacity
          className="rounded-full bg-green-500 px-5 py-2"
          activeOpacity={0.7}
          onPress={() => signInWithGithub()}
        >
          <Text className="font-alt text-sm uppercase text-black">
            começar a cadastrar
          </Text>
        </TouchableOpacity>
      </View>

      <Copyright />
    </View>
  );
}
