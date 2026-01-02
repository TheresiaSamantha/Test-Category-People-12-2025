"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function PeopleInputPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const clearWarning = () => {
    setTimeout(() => setWarning(null), 3000);
  };

  const [formData, setFormData] = useState({
    noApp: "",
    nama: "",
    tempatLahir: "",
    tanggalLahir: "",
    Kelamin: "",
    kodePos: "",
    alamat: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/people", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menyimpan data");
      }

      const data = await response.json();

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data orang berhasil ditambahkan.",
        confirmButtonText: "OK",
      });

      setFormData({
        noApp: "",
        nama: "",
        tempatLahir: "",
        tanggalLahir: "",
        Kelamin: "",
        kodePos: "",
        alamat: "",
      });
      router.refresh();
      window.location.href = `/peopleForm/${data.insertedId}`;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan yang tidak diketahui";
      setError(errorMessage);
    } finally {
      setLoading(false);
      if (error) {
        Swal.fire({
          icon: "error",
          title: "Kesalahan",
          text: error,
          confirmButtonText: "OK",
        });
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "noApp") {
      // Memperbolehkan huruf, angka, tanda hubung, dan garis bawah untuk nomor aplikasi
      const sanitized = value.replace(/[^a-zA-Z0-9-_]/g, "");
      if (sanitized !== value) {
        setWarning(
          "Gunakan hanya huruf, angka, atau tanda hubung untuk No Aplikasi."
        );
        clearWarning();
      }
      setFormData((prev) => ({ ...prev, [name]: sanitized }));
    } else if (name === "kodePos") {
      // Hanya memperbolehkan angka untuk kode pos
      const sanitized = value.replace(/[^0-9]/g, "");
      if (sanitized !== value) {
        setWarning("Kode Pos hanya boleh berisi angka.");
        clearWarning();
      }
      setFormData((prev) => ({ ...prev, [name]: sanitized }));
    } else if (name === "nama" || name === "tempatLahir") {
      // Memperbolehkan huruf, angka, spasi, tanda hubung, dan garis bawah untuk nama dan tempat lahir
      const sanitized = value.replace(/[^a-zA-Z0-9-_ ]/g, "");
      if (sanitized !== value) {
        setWarning("Gunakan hanya huruf, angka, spasi, atau tanda hubung.");
        clearWarning();
      }
      setFormData((prev) => ({ ...prev, [name]: sanitized }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <main className="min-h-screen p-8 md:p-16 max-w-4xl mx-auto font-sans">
      {warning && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-yellow-400 border-4 border-foreground p-4 font-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-bounce">
          {warning}
        </div>
      )}
      <div className="border-[6px] border-foreground p-8 bg-card shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-all">
        <header className="mb-12 border-b-4 border-foreground pb-6">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-2 italic">
            Input Peserta
          </h1>
        </header>

        <form onSubmit={handleSubmit} className="space-y-10">
          <section>
            <div className="bg-primary text-primary-foreground inline-block px-4 py-1 border-4 border-foreground font-black uppercase text-sm mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              01. Aplikasi
            </div>
            <div className="grid gap-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="noApp"
                  className="font-black uppercase text-xs tracking-widest"
                >
                  No Aplikasi
                </label>
                <input
                  required
                  type="text"
                  id="noApp"
                  name="noApp"
                  value={formData.noApp}
                  onChange={handleChange}
                  className="border-4 border-foreground p-4 bg-background focus:bg-primary/5 focus:outline-none font-bold placeholder:text-foreground/30"
                  placeholder="EX: APP-2024-001"
                />
              </div>
            </div>
          </section>

          <section>
            <div className="bg-primary text-primary-foreground inline-block px-4 py-1 border-4 border-foreground font-black uppercase text-sm mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              02. Profil Personal
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="nama"
                  className="font-black uppercase text-xs tracking-widest"
                >
                  Nama Lengkap
                </label>
                <input
                  required
                  type="text"
                  id="nama"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className="border-4 border-foreground p-4 bg-background focus:bg-primary/5 focus:outline-none font-bold"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="Kelamin"
                  className="font-black uppercase text-xs tracking-widest"
                >
                  Jenis Kelamin
                </label>
                <select
                  required
                  id="Kelamin"
                  name="Kelamin"
                  value={formData.Kelamin}
                  onChange={handleChange}
                  className="border-4 border-foreground p-4 bg-background focus:bg-primary/5 focus:outline-none font-bold cursor-pointer appearance-none"
                >
                  <option value="">Pilih Gender</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="tempatLahir"
                  className="font-black uppercase text-xs tracking-widest"
                >
                  Tempat Lahir
                </label>
                <input
                  required
                  type="text"
                  id="tempatLahir"
                  name="tempatLahir"
                  value={formData.tempatLahir}
                  onChange={handleChange}
                  className="border-4 border-foreground p-4 bg-background focus:bg-primary/5 focus:outline-none font-bold"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="tanggalLahir"
                  className="font-black uppercase text-xs tracking-widest"
                >
                  Tanggal Lahir
                </label>
                <input
                  required
                  type="date"
                  id="tanggalLahir"
                  name="tanggalLahir"
                  value={formData.tanggalLahir}
                  onChange={handleChange}
                  className="border-4 border-foreground p-4 bg-background focus:bg-primary/5 focus:outline-none font-bold"
                />
              </div>
            </div>
          </section>

          <section>
            <div className="bg-primary text-primary-foreground inline-block px-4 py-1 border-4 border-foreground font-black uppercase text-sm mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              03. Alamat Domisili
            </div>
            <div className="grid gap-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="alamat"
                  className="font-black uppercase text-xs tracking-widest"
                >
                  Alamat Lengkap
                </label>
                <textarea
                  required
                  id="alamat"
                  name="alamat"
                  rows={4}
                  value={formData.alamat}
                  onChange={handleChange}
                  className="border-4 border-foreground p-4 bg-background focus:bg-primary/5 focus:outline-none font-bold resize-none"
                />
              </div>
              <div className="md:w-1/3 flex flex-col gap-2">
                <label
                  htmlFor="kodePos"
                  className="font-black uppercase text-xs tracking-widest"
                >
                  Kode Pos
                </label>
                <input
                  required
                  type="text"
                  id="kodePos"
                  name="kodePos"
                  value={formData.kodePos}
                  onChange={handleChange}
                  className="border-4 border-foreground p-4 bg-background focus:bg-primary/5 focus:outline-none font-bold"
                  placeholder="12345"
                />
              </div>
            </div>
          </section>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground border-4 border-foreground p-6 font-black uppercase text-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all disabled:opacity-50"
          >
            {loading ? "PROCESSING..." : "SUBMIT DATA"}
          </button>
        </form>
      </div>
    </main>
  );
}
