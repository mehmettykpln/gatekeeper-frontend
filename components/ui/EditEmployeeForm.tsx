"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
type Props = {
  id: string;
};

export default function EditEmployeeForm({ id }: Props) {
  const router = useRouter();
  const [employee, setEmployee] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");    

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/employees/${id}`);
        const data = res.data;

        
        if (data.hiredAt) data.hiredAt = new Date(data.hiredAt).toISOString().split("T")[0];
        if (data.statusUpdatedAt) data.statusUpdatedAt = new Date(data.statusUpdatedAt).toISOString().split("T")[0];

        setEmployee(data);
      } catch (err) {
        setError("Veri çekilemedi.");
      } finally {
        setLoading(false);
      }
    };

  fetchData();
}, [id]);


 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!employee) return;
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

 const handleSubmit = async () => {
  try {
    await api.put(`/employees/${id}`, {
      ...employee,
      salary: parseFloat(employee.salary?.toString() || "0"),
      hiredAt: new Date(employee.hiredAt),
      statusUpdatedAt: new Date(employee.statusUpdatedAt),
      email: employee.email,

    });
    router.push("/employee");
  } catch (err) {
    setError("Güncelleme başarısız.");
  }
  };


  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-4 p-4 max-w-md mx-auto">
      <Input
        name="firstName"
        value={employee?.firstName || ""}
        onChange={handleChange}
        placeholder="Ad"
      />
      <Input
        name="lastName"
        value={employee?.lastName || ""}
        onChange={handleChange}
        placeholder="Soyad"
      />
      <Input
        name="position"
        value={employee?.position || ""}
        onChange={handleChange}
        placeholder="Pozisyon"
      />
      <Input
        name="department"
        value={employee?.department || ""}
        onChange={handleChange}
        placeholder="Departman"
      />
      <Input
        name="salary"
        value={employee?.salary?.toString() || ""}
        onChange={handleChange}
        placeholder="Maaş"
      />
              
        <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={employee?.isActive || false}
          onChange={(e) => setEmployee({ ...employee, isActive: e.target.checked })}
        />
        <span>Aktif mi?</span>
      </label>
      <Input
        name="hiredAt"
        type="date"
        value={employee?.hiredAt ? employee.hiredAt.slice(0, 10) : ""}
        onChange={(e) =>
          setEmployee({ ...employee, hiredAt: e.target.value })
        }
        placeholder="İşe Alım Tarihi"
      />
      <select
        name="status"
        value={employee?.status || ""}
        onChange={(e) => setEmployee({ ...employee, status: e.target.value })}
        className="w-full p-2 border rounded"
      >
        <option value="">Durum Seç</option>
        <option value="active">Aktif</option>
        <option value="terminated">İşten Çıkarıldı</option>
        <option value="resigned">İstifa Etti</option>
        <option value="retired">Emekli</option>
      </select>
      <Input
        name="statusUpdatedAt"
        type="date"
        value={
          employee?.statusUpdatedAt
            ? employee.statusUpdatedAt.slice(0, 10)
            : ""
        }
        onChange={(e) =>
          setEmployee({ ...employee, statusUpdatedAt: e.target.value })
        }
        placeholder="Durum Güncelleme Tarihi"
      />
      <Input
          name="email"
          value={employee?.email || ""}
          onChange={handleChange}
          placeholder="Email"
      />

      <Button onClick={handleSubmit}>Güncelle</Button>
    </div>
  );
}
