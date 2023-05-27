import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Link, useRouter } from "expo-router";
import Icon from "@expo/vector-icons/Feather";
import * as SecureStore from "expo-secure-store";

import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";

import { api } from "../../src/lib/api";
import NLWLogo from "../../src/assets/nlw-spacetime-logo.svg";

interface IMemories {
  id: string;
  coverUrl: string;
  excerpt: string;
  createdAt: string;
}

dayjs.locale(ptBR);

export default function Memories() {
  const [memories, setMemories] = useState<IMemories[]>([]);

  const { bottom, top } = useSafeAreaInsets();
  const router = useRouter();

  const signOut = async () => {
    await SecureStore.deleteItemAsync("token");

    router.push("/");
  };

  async function loadMemories() {
    try {
      const token = await SecureStore.getItemAsync("token");

      const response = await api.get("/memories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMemories(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadMemories();
  }, []);

  return (
    <View className="flex-1" style={{ paddingBottom: bottom, paddingTop: top }}>
      <View className="mb-4 mt-4 flex-row items-center justify-between px-8">
        <NLWLogo />

        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={signOut}
            className="h-10 w-10 items-center justify-center rounded-full bg-red-500"
          >
            <Icon name="log-out" size={16} color="black" />
          </TouchableOpacity>

          <Link href="/new" asChild>
            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-green-500">
              <Icon name="plus" size={16} color="black" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <ScrollView className="flex-1 space-y-10 pb-4">
        {memories.map((memory) => {
          return (
            <View className="space-y-4" key={memory.id}>
              <View className="flex-row items-center gap-2">
                <View className="h-px w-5 bg-gray-50" />
                <Text className="font-body text-xs text-gray-100">
                  {dayjs(memory.createdAt).format("D[ de ]MMMM[, ]YYYY")}
                </Text>
              </View>
              <View className="space-y-4 px-8">
                <Image
                  source={{
                    uri: memory.coverUrl,
                  }}
                  className="aspect-video w-full rounded-lg"
                  alt=""
                />
                <Text className="font-body text-base leading-relaxed text-gray-100">
                  {memory.excerpt}
                </Text>
                <Link
                  href={{
                    pathname: `/memories/${memory.id}`,
                    params: {
                      excerpt: memory.excerpt,
                      coverUrl: memory.coverUrl,
                    },
                  }}
                  asChild
                >
                  <TouchableOpacity className="flex-row items-center gap-2">
                    <Text className="font-body text-sm text-gray-200">
                      Ler mais
                    </Text>
                    <Icon name="arrow-right" size={16} color="#9e9ea0" />
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
