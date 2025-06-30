"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Employee } from "@/types/employee";

export default function EditEmployeePage() {
  const { id } = useParams();
  const router = useRouter();
  const [employee, setEmployee] = useState<Employee | null>(null);

  const fetchEmployee = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/employees/${id}`);
      setEmployee(res.data);
    } catch (err) {
      console.error("Veri alma hatası:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!employee) return;
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:3001/api/employees/${id}`, {
        ...employee,
        salary: parseFloat(employee?.salary?.toString() || "0"),
      });
      router.push("/employee");
    } catch (err) {
      console.error("Güncelleme hatası:", err);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  if (!employee) return <div>Yükleniyor...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <Card>
        <CardContent className="space-y-4 pt-4">
          <h2 className="text-xl font-bold">Personeli Güncelle</h2>
          {["firstName", "lastName","email","phoneNumber", "position", "department", "salary"].map((field) => (
            <div key={field}>
              <Label>{field}</Label>
              <Input
                name={field}
                value={(employee as any)[field]}
                onChange={handleChange}
              />
            </div>
          ))}
          <Button onClick={handleSubmit}>Kaydet</Button>
        </CardContent>
      </Card>
    </div>
  );
}
