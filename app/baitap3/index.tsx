import { useRouter } from "expo-router";
import React from "react";
import { View, Text } from "react-native"; // Import đúng View và Text

export default function Index() {
  // Đổi tên thành Index (viết hoa chữ cái đầu theo convention)
  const router = useRouter();
  return (
    <View>
      <Text
        onPress={() => router.push("/baitap3/danhsachnhanvien")}
        style={{ fontSize: 20, color: "blue" }}
      >
        Ấn vào đây để xem danh sách nhân viên
      </Text>
    </View>
  );
}
