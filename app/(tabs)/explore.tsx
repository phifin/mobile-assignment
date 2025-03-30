import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function Explore({ navigation }: { navigation: any }) {
  const router = useRouter();
  return (
    <>
      <Text
        onPress={() => router.push("/baitap1")}
        style={{ fontSize: 20, padding: 10, color: "blue" }}
      >
        Bài tập 1
      </Text>
      <Text
        onPress={() => router.push("/baitap2")}
        style={{ fontSize: 20, padding: 10, color: "blue" }}
      >
        Bài tập 2
      </Text>
      <Text
        onPress={() => router.push("/baitap3")}
        style={{ fontSize: 20, padding: 10, color: "blue" }}
      >
        Bài tập 3
      </Text>
    </>
  );
}
