"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Swal from "sweetalert2";
import type {
  FormPeople,
  info1Type,
  info2Type,
  info3Type,
  info4Type,
  info5Type,
  info6Type,
} from "@/types/PeopleTypes";
import type { FormOptionDocument, OptionItem } from "@/types/InfoListTypes";

export default function PeopleFormPage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [infoList, setInfoList] = useState<FormOptionDocument[]>([]);

  // Initial state following FormPeople structure
  const [formData, setFormData] = useState<FormPeople>({
    idPeople: (id as string) || "",
    totalScore: 0,
    categoryPeople: "",
    info1: {} as info1Type,
    info2: {} as info2Type,
    info3: {} as info3Type,
    info4: {} as info4Type,
    info5: {} as info5Type,
    info6: {} as info6Type,
  });

  // Fetch options from infoList API
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch("/api/infoList");
        if (response.ok) {
          const data = await response.json();
          setInfoList(data);
        }
      } catch (error) {
        console.error(
          "[v0] Error fetching infoList:",
          (error as Error).message
        );
      }
    };
    fetchOptions();
  }, []);

  const handleInfoChange = (
    section: keyof FormPeople,
    field: string,
    value: string
  ) => {
    setFormData((prev) => {
      const sectionData = prev[section] as Record<string, string | number>;
      return {
        ...prev,
        [section]: {
          ...sectionData,
          [field]: value,
        },
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("[v0] Submitting form data:", formData);
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data scoring berhasil disimpan",
        confirmButtonText: "OK",
      });
      router.push("/people");
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

  // Helper to render select from infoList data
  const renderSelect = (
    section: keyof FormPeople,
    field: string,
    label: string,
    fieldKey: string
  ) => {
    // Find the document and get options from fields
    let options: OptionItem[] = [];

    for (const doc of infoList) {
      console.log("🚀 ~ renderSelect ~ doc:", doc);
      if (doc.fields.hasOwnProperty(fieldKey)) {
        options = doc.fields[fieldKey];
        break;
      }
    }

    const sectionData = formData[section] as Record<string, string | number>;

    return (
      <div className="flex flex-col gap-2">
        <label className="font-black uppercase text-xs tracking-widest">
          {label}
        </label>
        <select
          value={sectionData[field]}
          onChange={(e) => handleInfoChange(section, field, e.target.value)}
          className="border-4 border-foreground p-4 bg-background focus:bg-primary/5 focus:outline-none font-bold cursor-pointer appearance-none"
        >
          <option value="">Pilih {label}</option>
          {options.map((opt: OptionItem, idx: number) => (
            <option key={idx} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <main className="min-h-screen p-8 md:p-16 max-w-6xl mx-auto font-sans">
      <div className="border-[6px] border-foreground p-8 bg-card shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
        <header className="mb-12 border-b-4 border-foreground pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-5xl font-black uppercase tracking-tighter mb-2 italic">
              People Scoring
            </h1>
            <p className="text-xl font-medium">
              Formulir Penilaian Detail (ID: {id})
            </p>
          </div>
          <div className="bg-yellow-400 border-4 border-foreground p-4 font-black text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            SCORE: {formData.totalScore}
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Section 1: Data Personal */}
          <section className="space-y-6">
            <div className="bg-primary text-primary-foreground inline-block px-4 py-1 border-4 border-foreground font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              INFO 01. PERSONAL & STATUS
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {renderSelect("info1", "umur", "Kategori Umur", "umur")}
              {renderSelect(
                "info1",
                "umurDanTenor",
                "Umur & Tenor",
                "umur_tenor"
              )}
              {renderSelect(
                "info1",
                "stsPerkawinan",
                "Status Nikah",
                "perkawinan"
              )}
              {renderSelect("info1", "pendidikan", "Pendidikan", "pendidikan")}
            </div>
          </section>

          {/* Section 2: Domisili */}
          <section className="space-y-6">
            <div className="bg-primary text-primary-foreground inline-block px-4 py-1 border-4 border-foreground font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              INFO 02. TEMPAT TINGGAL
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {renderSelect("info2", "alamat", "Wilayah Alamat", "wilayah")}
              {renderSelect(
                "info2",
                "kepemilikanRumah",
                "Status Rumah",
                "rumah"
              )}
              {renderSelect(
                "info2",
                "lamaTinggal",
                "Lama Tinggal",
                "lama_tinggal"
              )}
            </div>
          </section>

          {/* Section 3: Pekerjaan */}
          <section className="space-y-6">
            <div className="bg-primary text-primary-foreground inline-block px-4 py-1 border-4 border-foreground font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              INFO 03. PEKERJAAN & PENDAPATAN
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {renderSelect(
                "info3",
                "kategoriPerusahaan",
                "Tipe Company",
                "perusahaan"
              )}
              {renderSelect("info3", "jabatan", "Level Jabatan", "jabatan")}
              {renderSelect("info3", "lamaBekerja", "Masa Kerja", "masa_kerja")}
              {renderSelect(
                "info3",
                "pendapatanTHPP",
                "Income/THP",
                "pendapatan"
              )}
            </div>
          </section>

          {/* Section 4: Perbankan & SLIK */}
          <section className="space-y-6">
            <div className="bg-primary text-primary-foreground inline-block px-4 py-1 border-4 border-foreground font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              INFO 04. KEUANGAN & SLIK
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {renderSelect("info4", "rekeningBank", "Bank Account", "bank")}
              {renderSelect("info4", "avgSaldoBulan", "Avg Saldo", "saldo")}
              {renderSelect(
                "info4",
                "trackingPembayaran",
                "Payment Track",
                "payment"
              )}
              {renderSelect("info4", "tracjSLIK", "SLIK Status", "slik")}
              {renderSelect(
                "info4",
                "typeKartuKredit",
                "CC Type",
                "kartu_kredit"
              )}
            </div>
          </section>

          {/* Section 5 & 6: Loan & Appraisal */}
          <div className="grid md:grid-cols-2 gap-12">
            <section className="space-y-6">
              <div className="bg-primary text-primary-foreground inline-block px-4 py-1 border-4 border-foreground font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                INFO 05. PINJAMAN
              </div>
              <div className="grid gap-4">
                {renderSelect("info5", "tenor", "Tenor", "tenor")}
                {renderSelect("info5", "debServiceRatio", "DSR Ratio", "dsr")}
              </div>
            </section>

            <section className="space-y-6">
              <div className="bg-primary text-primary-foreground inline-block px-4 py-1 border-4 border-foreground font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                INFO 06. JAMINAN
              </div>
              <div className="grid gap-4">
                {renderSelect(
                  "info6",
                  "hasilAppraisal",
                  "Appraisal",
                  "appraisal"
                )}
                {renderSelect(
                  "info6",
                  "luasBangunan",
                  "Luas M2",
                  "luas_bangunan"
                )}
              </div>
            </section>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground border-4 border-foreground p-6 font-black uppercase text-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all disabled:opacity-50"
          >
            {loading ? "SAVING..." : "SIMPAN SCORING"}
          </button>
        </form>
      </div>
    </main>
  );
}
