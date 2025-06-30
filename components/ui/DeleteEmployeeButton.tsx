"use client";

import React, { useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";

type Props = {
  id: string;
  onDeleted?: () => void;
};

export default function DeleteEmployeeButton({ id, onDeleted }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (!confirm("Personeli silmek istediğinizden emin misiniz?")) return;

    setLoading(true);
    setError("");

    try {
      await api.delete(`/employees/${id}`);
      if (onDeleted) onDeleted();
      alert("Personel başarıyla silindi.");
    } catch (err) {
      setError("Silme işlemi başarısız oldu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={handleDelete} disabled={loading} variant="destructive">
        {loading ? "Siliniyor..." : "Personeli Sil"}
      </Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </>
  );
}
