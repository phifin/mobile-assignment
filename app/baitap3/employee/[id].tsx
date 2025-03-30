import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

interface Employee {
  id: string;
  employee_name: string;
  employee_age: number;
  employee_salary: number;
  profile_image: string | null;
}

export default function EmployeeDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [salary, setSalary] = useState("");

  // Lấy thông tin chi tiết nhân viên
  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await fetch(
        `http://blackntt.net:88/api/v1/employees/${id}`
      );
      const data = await response.json();
      setEmployee(data);
      setName(data.employee_name);
      setAge(data.employee_age.toString());
      setSalary(data.employee_salary.toString());
    } catch (error) {
      console.error("Error fetching employee:", error);
      Alert.alert("Lỗi", "Không thể tải thông tin nhân viên");
    }
  };

  // Cập nhật thông tin nhân viên
  const updateEmployee = async () => {
    try {
      const updatedData = {
        employee_name: name,
        employee_age: parseInt(age),
        employee_salary: parseInt(salary),
        profile_image: employee?.profile_image || null,
      };
      const response = await fetch(
        `http://blackntt.net:88/api/v1/employees/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );
      if (response.ok) {
        Alert.alert("Thành công", "Đã cập nhật thông tin nhân viên");
        router.back(); // Quay lại danh sách
      } else {
        Alert.alert("Lỗi", "Không thể cập nhật nhân viên");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi cập nhật");
    }
  };

  if (!employee) {
    return <Text>Đang tải...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chi tiết nhân viên</Text>
      {employee.profile_image && (
        <Image source={{ uri: employee.profile_image }} style={styles.image} />
      )}
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Tên nhân viên"
      />
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        placeholder="Tuổi"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={salary}
        onChangeText={setSalary}
        placeholder="Lương"
        keyboardType="numeric"
      />
      <Button title="Cập nhật" onPress={updateEmployee} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  image: { width: 100, height: 100, marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
