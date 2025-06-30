"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Employee } from "@/types/employee";
import { useRouter } from "next/navigation";
import { StyledInput } from "@/components/ui/StyledInput";
import { EmployeeCard } from "@/components/ui/EmployeeCard";

export default function EmployeePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    position: "",
    department: "",
    salary: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error("Listeleme hatası:", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.firstName) newErrors.firstName = "Ad zorunludur.";
    if (!form.lastName) newErrors.lastName = "Soyad zorunludur.";
    if (!form.email) newErrors.email = "Email zorunludur.";
    if (!form.phoneNumber) newErrors.phoneNumber = "Telefon zorunludur.";
    if (!form.position) newErrors.position = "Pozisyon zorunludur.";
    if (!form.department) newErrors.department = "Bölüm zorunludur.";
    if (!form.salary || isNaN(Number(form.salary))) newErrors.salary = "Geçerli maaş giriniz.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const newEmployee = {
        ...form,
        id: crypto.randomUUID(),
        userId: "admin",
        salary: parseFloat(form.salary),
        isActive: true,
        hiredAt: new Date().toISOString(),
        status: "active",
        statusUpdatedAt: new Date().toISOString(),
      };

      await axios.post("http://localhost:3001/api/employees", newEmployee);
      await fetchEmployees();
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        position: "",
        department: "",
        salary: "",
      });
      setErrors({});
    } catch (err) {
      console.error("Ekleme hatası:", err);
    }
  };

  const handleDeleteEmployee = async (id: string) => {
    if (!confirm("Personeli silmek istediğinizden emin misiniz?")) return;

    try {
      await axios.delete(`http://localhost:3001/api/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      alert("Silme işlemi başarısız oldu.");
    }
  };

  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      <Card>
        <CardContent className="space-y-4 pt-4">
          <h2 className="text-2xl font-bold">Yeni Personel Ekle</h2>

          {[
            { label: "Ad", name: "firstName" },
            { label: "Soyad", name: "lastName" },
            { label: "Email", name: "email" },
            { label: "Telefon Numarası", name: "phoneNumber" },
            { label: "Pozisyon", name: "position" },
            { label: "Bölüm", name: "department" },
            { label: "Maaş", name: "salary" },
          ].map(({ label, name }) => (
            <StyledInput
              key={name}
              label={label}
              name={name}
              placeholder={label}
              value={(form as any)[name]}
              onChange={(e) =>
                setForm({ ...form, [name]: e.target.value })
              }
              error={errors[name]}
              type={name === "salary" ? "number" : "text"}
            />
          ))}

          <Button onClick={handleSubmit}>Ekle</Button>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-bold mb-4">Personel Listesi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {employees.map((emp) => (
            <EmployeeCard
              key={emp._id}
              employee={emp}
              onEdit={() => router.push(`/employee/edit/${emp._id}`)}
              onDelete={() => handleDeleteEmployee(emp._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
