import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import React from "react";

export default function DanhSachMonHoc() {
  const router = useRouter();

  // Danh sách 5 môn học bất kỳ
  const monHoc = [
    { id: "1", ten: "Toán Cao Cấp" },
    { id: "2", ten: "Vật Lý Đại Cương" },
    { id: "3", ten: "Lập Trình Cơ Bản" },
    { id: "4", ten: "Hóa Học Cơ Bản" },
    { id: "5", ten: "Tiếng Anh Giao Tiếp" },
  ];

  const renderItem = ({ item }: { item: { id: string; ten: string } }) => (
    <TouchableOpacity
      onPress={() => router.push(`/baitap2/courseDetail/${item.id}` as any)}
      style={{
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
      }}
    >
      <Text style={{ fontSize: 18, color: "blue" }}>{item.ten}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", padding: 10 }}>
        Danh sách môn học
      </Text>
      <FlatList
        data={monHoc}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
