import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useRouter, useSearchParams } from "expo-router";

export default function MoreDetails() {
  const { excerpt, coverUrl } = useSearchParams();

  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center">
      <Image
        source={{
          uri: coverUrl as string,
        }}
      />
      <Text className="font-body text-4xl text-gray-50">{excerpt}</Text>
      <TouchableOpacity
        className="rounded-full bg-green-500 px-5 py-2"
        activeOpacity={0.7}
        onPress={() => router.back()}
      >
        <Text className="font-alt text-sm uppercase text-black">Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}
