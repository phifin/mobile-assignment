import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

interface Employee {
  id: string;
  employee_name: string;
  employee_age: number;
  employee_salary: number;
  profile_image: string | null;
}

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const router = useRouter();

  // Lấy danh sách nhân viên từ API
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://blackntt.net:88/api/v1/employees");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      Alert.alert("Lỗi", "Không thể tải danh sách nhân viên");
    }
  };

  // Xóa nhân viên
  const deleteEmployee = async (id: string) => {
    try {
      const response = await fetch(
        `http://blackntt.net:88/api/v1/employees/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setEmployees(employees.filter((emp) => emp.id !== id));
        Alert.alert("Thành công", "Đã xóa nhân viên");
      } else {
        Alert.alert("Lỗi", "Không thể xóa nhân viên");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi xóa nhân viên");
    }
  };

  const renderItem = ({ item }: { item: Employee }) => (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => router.push(`/employee/${item.id}` as any)}
      >
        <Text style={styles.name}>{item.employee_name}</Text>
        <Text>Tuổi: {item.employee_age}</Text>
        <Text>Lương: {item.employee_salary}</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => router.push(`/employee/${item.id}` as any)}
        >
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            Alert.alert(
              "Xác nhận",
              `Bạn có chắc muốn xóa ${item.employee_name}?`,
              [
                { text: "Hủy", style: "cancel" },
                { text: "Xóa", onPress: () => deleteEmployee(item.id) },
              ]
            );
          }}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={employees}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>Không có nhân viên nào</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  name: { fontSize: 18, fontWeight: "bold" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  updateButton: { backgroundColor: "#007bff", padding: 8, borderRadius: 5 },
  deleteButton: { backgroundColor: "#dc3545", padding: 8, borderRadius: 5 },
  buttonText: { color: "#fff", textAlign: "center" },
});
