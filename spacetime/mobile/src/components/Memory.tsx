import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import Icon from "@expo/vector-icons/Feather";

import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";

dayjs.locale(ptBR);

interface IMemories {
  id: string;
  coverUrl: string;
  excerpt: string;
  createdAt: string;
}

interface MemoryProps {
  data: IMemories;
}

export function Memory({ data }: MemoryProps) {
  return (
    <View className="mb-8 space-y-4">
      <View className="flex-row items-center gap-2">
        <View className="h-px w-5 bg-gray-50" />
        <Text className="font-body text-xs text-gray-100">
          {dayjs(data.createdAt).format("D[ de ]MMMM[, ]YYYY")}
        </Text>
      </View>
      <View className="space-y-4 px-8">
        <Image
          source={{
            uri: data.coverUrl,
          }}
          className="aspect-video w-full rounded-lg"
          alt=""
        />
        <Text className="font-body text-base leading-relaxed text-gray-100">
          {data.excerpt}
        </Text>
        <Link
          href={{
            pathname: `/memories/${data.id}`,
            params: {
              ...data,
            },
          }}
          asChild
        >
          <TouchableOpacity className="flex-row items-center gap-2">
            <Text className="font-body text-sm text-gray-200">Ler mais</Text>
            <Icon name="arrow-right" size={16} color="#9e9ea0" />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
