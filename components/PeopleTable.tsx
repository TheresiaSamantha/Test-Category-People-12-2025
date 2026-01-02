"use client";

import { useEffect, useState } from "react";
import type { People } from "@/types/PeopleTypes";
import Swal from "sweetalert2";
import Link from "next/link";
import { Trash2, Edit } from "lucide-react";

export default function PeopleTable() {
  const [people, setPeople] = useState<People[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/people", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Gagal memuat data");
      }

      const data = await res.json();
      setPeople(data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat memuat data"
      );
      console.log("[v0] Error fetching people:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string | undefined, nama: string) => {
    if (!id) return;

    const result = await Swal.fire({
      title: "Hapus Data",
      text: `Apakah Anda yakin ingin menghapus ${nama}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/people/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Gagal menghapus data");
        }

        Swal.fire("Terhapus!", "Data berhasil dihapus", "success");
        fetchPeople(); // Refresh data
      } catch (err) {
        Swal.fire(
          "Error",
          err instanceof Error ? err.message : "Gagal menghapus data",
          "error"
        );
        console.log("[v0] Error deleting people:", err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Memuat data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  if (people.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Tidak ada data masyarakat</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                No. Aplikasi
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Nama
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Tempat Lahir
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Tanggal Lahir
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Jenis Kelamin
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Alamat
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {people.map((person) => (
              <tr key={person._id?.toString()} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">
                  {person.noApp}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  {person.nama}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {person.tempatLahir}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(person.tanggalLahir).toLocaleDateString("id-ID")}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {person.Kelamin === "Laki-laki" ? "Laki-laki" : "Perempuan"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {person.alamat}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex gap-2 justify-end">
                    <Link
                      href={`/people/${person._id}`}
                      className="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                      title="Edit"
                    >
                      <Edit size={16} />
                      <span className="text-xs font-medium">Edit</span>
                    </Link>
                    <button
                      onClick={() =>
                        handleDelete(person._id?.toString(), person.nama)
                      }
                      className="inline-flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                      title="Hapus"
                    >
                      <Trash2 size={16} />
                      <span className="text-xs font-medium">Hapus</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
