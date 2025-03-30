import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import React from "react";

interface Course {
  ten: string;
  moTa: string;
  giangVien: string;
  thoiLuong: string;
}

interface CourseDetails {
  [key: string]: Course | undefined;
}

export default function CourseDetail() {
  const { id } = useLocalSearchParams();

  const courseDetails: CourseDetails = {
    "1": {
      ten: "Toán Cao Cấp",
      moTa: "Khóa học về giải tích và đại số nâng cao.",
      giangVien: "GS. Nguyễn Văn A",
      thoiLuong: "12 tuần",
    },
    "2": {
      ten: "Vật Lý Đại Cương",
      moTa: "Cơ học, nhiệt học và điện từ học cơ bản.",
      giangVien: "TS. Trần Thị B",
      thoiLuong: "10 tuần",
    },
    "3": {
      ten: "Lập Trình Cơ Bản",
      moTa: "Giới thiệu về lập trình với JavaScript.",
      giangVien: "ThS. Lê Văn C",
      thoiLuong: "8 tuần",
    },
    "4": {
      ten: "Hóa Học Cơ Bản",
      moTa: "Nguyên tố, phản ứng hóa học cơ bản.",
      giangVien: "PGS. Phạm Thị D",
      thoiLuong: "10 tuần",
    },
    "5": {
      ten: "Tiếng Anh Giao Tiếp",
      moTa: "Kỹ năng nghe, nói cơ bản.",
      giangVien: "Cô Nguyễn Thị E",
      thoiLuong: "6 tuần",
    },
  };

  const course = courseDetails[id as string] || {
    ten: "Không tìm thấy",
    moTa: "Không có dữ liệu",
    giangVien: "N/A",
    thoiLuong: "N/A",
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{course.ten}</Text>
      <Text style={styles.description}>{course.moTa}</Text>
      <Text style={styles.info}>Giảng viên: {course.giangVien}</Text>
      <Text style={styles.info}>Thời lượng: {course.thoiLuong}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  info: {
    fontSize: 14,
    color: "#444",
    marginBottom: 5,
  },
});
