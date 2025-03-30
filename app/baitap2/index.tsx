import { useRouter } from "expo-router";
import React from "react";
import { View, Text } from "react-native"; // Import đúng View và Text

export default function Index() {
  // Đổi tên thành Index (viết hoa chữ cái đầu theo convention)
  const router = useRouter();
  return (
    <View>
      <Text
        onPress={() => router.push("/baitap2/danhsachmonhoc")}
        style={{ fontSize: 20, color: "blue" }}
      >
        Ấn vào đây để mở danh sách môn học
      </Text>
    </View>
  );
}
