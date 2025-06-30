import React from "react";
import { Employee } from "@/types/employee";
import { Button } from "@/components/ui/button";

type Props = {
  employee: Employee;
  onEdit: () => void;
  onDelete: () => void;
};

export function EmployeeCard({ employee, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold mb-2">{employee.firstName} {employee.lastName}</h3>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Telefon:</strong> {employee.phoneNumber}</p>
        <p><strong>Pozisyon:</strong> {employee.position}</p>
        <p><strong>Bölüm:</strong> {employee.department}</p>
        <p><strong>Maaş:</strong> {employee.salary} ₺</p>
        <p><strong>Durum:</strong> {employee.status}</p>
      </div>
      <div className="mt-4 flex gap-3 justify-end">
        <Button variant="secondary" onClick={onEdit}>Düzenle</Button>
        <Button variant="destructive" onClick={onDelete}>Sil</Button>
      </div>
    </div>
  );
}
