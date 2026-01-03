"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Swal from "sweetalert2";
import type {
  FormPeople,
  akumulasiScoreType,
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

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      const cookies = document.cookie.split(";");
      const authCookie = cookies.find((c) =>
        c.trim().startsWith("Authorization=")
      );

      if (!authCookie) {
        router.push("/login");
      }
    };
    checkAuth();
  }, [router]);

  // Initial state following FormPeople structure
  const [formData, setFormData] = useState<FormPeople>({
    idPeople: id as string,
    totalScore: 0,
    categoryPeople: "",
    info1: {} as info1Type,
    info2: {} as info2Type,
    info3: {} as info3Type,
    info4: {} as info4Type,
    info5: {} as info5Type,
    info6: {} as info6Type,
  });

  const [akumulasi, setAkumulasi] = useState<akumulasiScoreType>();

  // Fetch options from infoList API
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch("/api/infoList");
        if (response.ok) {
          const data: FormOptionDocument[] = await response.json();
          setInfoList(data);

          // Build akumulasi structure from data
          const akumulasiData: Record<
            string,
            {
              bobotInfo: number;
              optionScore: Record<
                string,
                { bobotOption: number; selectionScore: number }
              >;
            }
          > = {};

          data.forEach((doc) => {
            const infoName = doc.name; // e.g., "info1", "info2", etc.

            akumulasiData[infoName] = {
              bobotInfo: doc.bobotInfo,
              optionScore: {},
            };

            // Process each field in the document
            Object.keys(doc.fields).forEach((fieldKey) => {
              const field = doc.fields[fieldKey];
              akumulasiData[infoName].optionScore[fieldKey] = {
                bobotOption: field.bobotOptions,
                selectionScore: 0, // Initial value, will be updated on selection
              };
            });
          });

          setAkumulasi(akumulasiData as akumulasiScoreType);
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
  console.log("🚀 ~ PeopleFormPage ~ akumulasi:", akumulasi);

  const handleInfoChange = (
    section: keyof FormPeople,
    field: string,
    value: string,
    score: number = 0
  ) => {
    // Update akumulasi and calculate total from it
    if (akumulasi) {
      const sectionData = akumulasi[section as keyof typeof akumulasi];
      // console.log("🚀 ~ handleInfoChange ~ sectionData:", sectionData);

      if (sectionData && typeof sectionData === "object") {
        // Get current option data with proper typing
        const currentOptionData = (
          sectionData.optionScore as Record<
            string,
            { bobotOption: number; selectionScore: number }
          >
        )[field];

        if (!currentOptionData) return;

        // Create new akumulasi with updated selectionScore
        const updatedAkumulasi = {
          ...akumulasi,
          [section]: {
            ...sectionData,
            optionScore: {
              ...sectionData.optionScore,
              [field]: {
                bobotOption: currentOptionData.bobotOption,
                selectionScore: score,
              },
            },
          },
        };

        // Calculate total score from all selectionScore in akumulasi
        let newTotalScore = 0;
        Object.keys(updatedAkumulasi).forEach((infoKey) => {
          const infoData =
            updatedAkumulasi[infoKey as keyof typeof updatedAkumulasi];
          if (
            infoData &&
            typeof infoData === "object" &&
            "optionScore" in infoData
          ) {
            let totalInfo = 0;
            Object.values(infoData.optionScore).forEach((optionData) => {
              if (
                typeof optionData === "object" &&
                "selectionScore" in optionData
              ) {
                const calculatedAkumulasi =
                  (optionData.bobotOption / 100) * optionData.selectionScore;
                totalInfo += calculatedAkumulasi;
              }
            });
            newTotalScore += totalInfo * (infoData.bobotInfo / 100);
          }
        });
        let newCategory = "";
        if (newTotalScore > 70 && newTotalScore <= 100) {
          newCategory = "LOW RISK";
        } else if (newTotalScore > 55 && newTotalScore <= 70) {
          newCategory = "MEDIUM RISK";
        } else if (newTotalScore <= 55) {
          newCategory = "HIGH RISK";
        }

        // Update akumulasi state
        setAkumulasi(updatedAkumulasi as akumulasiScoreType);

        // Update formData with new total
        setFormData((prevData) => {
          const sectionData = prevData[section] as Record<
            string,
            string | number
          >;
          return {
            ...prevData,
            totalScore: newTotalScore,
            categoryPeople: newCategory,
            [section]: {
              ...sectionData,
              [field]: value,
            },
          };
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const checkExisting = await (await fetch(`/api/people/${id}`)).json();
      console.log("🚀 ~ handleSubmit ~ checkExisting:", checkExisting);
      if (checkExisting) {
        throw new Error("Form scoring untuk orang ini sudah ada.");
      }
      if (
        !formData.info1.umur ||
        !formData.info1.umurDanTenor ||
        !formData.info1.stsPerkawinan ||
        !formData.info1.pendidikan ||
        !formData.info2.alamat ||
        !formData.info2.kepemilikanRumah ||
        !formData.info2.lamaTinggal ||
        !formData.info3.kategoriPerusahaan ||
        !formData.info3.jabatan ||
        !formData.info3.lamaBekerja ||
        !formData.info3.pendapatanTHPP ||
        !formData.info4.rekeningBank ||
        !formData.info4.avgSaldoBulan ||
        !formData.info4.trackingPembayaran ||
        !formData.info4.tracjSLIK ||
        !formData.info4.typeKartuKredit ||
        !formData.info5.tenor ||
        !formData.info5.debServiceRatio ||
        !formData.info6.hasilAppraisal ||
        !formData.info6.luasBangunan ||
        !formData.info6.tujuanPembiayaan ||
        !formData.info6.ltv
      ) {
        throw new Error("Semua bagian formulir harus diisi lengkap.");
      }
      const res = await fetch(`/api/people/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (!res.ok) {
        throw json;
      }

      const successSwal = await Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data scoring berhasil disimpan",
        confirmButtonText: "OK",
      });
      if (successSwal.isConfirmed) {
        router.push("/");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan yang tidak diketahui";
      console.log("🚀 ~ handleSubmit ~ err.message:", errorMessage);
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
      if (doc.fields.hasOwnProperty(fieldKey)) {
        options = doc.fields[fieldKey].options;
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
          onChange={(e) => {
            const selectedOption = options.find(
              (opt) => opt.value === e.target.value
            );
            const score = selectedOption?.score || 0;
            return handleInfoChange(section, field, e.target.value, score);
          }}
          className="border-4 border-foreground p-4 bg-background focus:bg-primary/5 focus:outline-none font-bold cursor-pointer appearance-none"
        >
          <option value="">Pilih {label}</option>
          {options.map((opt: OptionItem, idx: number) => (
            <option key={idx} value={opt.value}>
              {opt.label}
              {/*  (Score: {opt.score}) */}
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
        </header>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Section 1: Data Personal */}
          <section className="space-y-6">
            <div className="bg-primary text-primary-foreground inline-block px-4 py-1 border-4 border-foreground font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              INFO 01. PERSONAL & STATUS
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
              {renderSelect("info1", "umur", "Umur Pemohon", "umur")}
              {renderSelect(
                "info1",
                "umurDanTenor",
                "Umur Pemohon & Tenor",
                "umurDanTenor"
              )}
              {renderSelect(
                "info1",
                "stsPerkawinan",
                "Status Perkawinan",
                "stsPerkawinan"
              )}
              {renderSelect("info1", "pendidikan", "Pendidikan", "pendidikan")}
            </div>
          </section>

          {/* Section 2: Domisili */}
          <section className="space-y-6">
            <div className="bg-primary text-primary-foreground inline-block px-4 py-1 border-4 border-foreground font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              INFO 02. TEMPAT TINGGAL
            </div>
            <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-6">
              {renderSelect(
                "info2",
                "alamat",
                "Alamat Tempat Tinggal",
                "alamat"
              )}
              {renderSelect(
                "info2",
                "kepemilikanRumah",
                "Kepemilikan Tempat Tinggal",
                "kepemilikanRumah"
              )}
              {renderSelect(
                "info2",
                "lamaTinggal",
                "Lama Menempati",
                "lamaTinggal"
              )}
            </div>
          </section>

          {/* Section 3: Pekerjaan */}
          <section className="space-y-6">
            <div className="bg-primary text-primary-foreground inline-block px-4 py-1 border-4 border-foreground font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              INFO 03. PEKERJAAN & PENDAPATAN
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
              {renderSelect(
                "info3",
                "kategoriPerusahaan",
                "Kategori Perusahaan",
                "kategoriPerusahaan"
              )}
              {renderSelect("info3", "jabatan", "Jabatan", "jabatan")}
              {renderSelect(
                "info3",
                "lamaBekerja",
                "Lama Berkerja",
                "lamaBekerja"
              )}
              {renderSelect(
                "info3",
                "pendapatanTHPP",
                "Pendapatan THP",
                "pendapatanTHPP"
              )}
            </div>
          </section>

          {/* Section 4: Perbankan & SLIK */}
          <section className="space-y-6">
            <div className="bg-primary text-primary-foreground inline-block px-4 py-1 border-4 border-foreground font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              INFO 04. KEUANGAN & SLIK
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
              {renderSelect(
                "info4",
                "rekeningBank",
                "Rekening Bank",
                "rekeningBank"
              )}
              {renderSelect(
                "info4",
                "avgSaldoBulan",
                "Rata - Rata Saldo Bulanan",
                "avgSaldoBulan"
              )}
              {renderSelect(
                "info4",
                "trackingPembayaran",
                "Track Record pembayaran ansuran",
                "trackingPembayaran"
              )}
              {renderSelect(
                "info4",
                "tracjSLIK",
                "Track Data SLIK",
                "tracjSLIK"
              )}
              {renderSelect(
                "info4",
                "typeKartuKredit",
                "Kepemilikan Kartu Kredit",
                "typeKartuKredit"
              )}
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-6">
            <div className="bg-primary text-primary-foreground inline-block px-4 py-1 border-4 border-foreground font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              INFO 05. PINJAMAN
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
              {renderSelect("info5", "tenor", "Tenor", "tenor")}
              {renderSelect(
                "info5",
                "debServiceRatio",
                "Debt Service Ratio",
                "debServiceRatio"
              )}
            </div>
          </section>

          {/* Section 6 */}
          <section className="space-y-6">
            <div className="bg-primary text-primary-foreground inline-block px-4 py-1 border-4 border-foreground font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              INFO 06. JAMINAN
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
              {renderSelect(
                "info6",
                "hasilAppraisal",
                "Hasil Appraisal",
                "hasilAppraisal"
              )}
              {renderSelect(
                "info6",
                "luasBangunan",
                "Luas Bangunan (m2)",
                "luasBangunan"
              )}
              {renderSelect(
                "info6",
                "tujuanPembiayaan",
                "Tujuan dari Pembiayaan",
                "tujuanPembiayaan"
              )}
              {renderSelect("info6", "ltv", "LTV", "ltv")}
            </div>
          </section>

          {/* Hasil */}
          <section className="space-y-6">
            <div className="bg-primary text-primary-foreground inline-block px-4 py-1 border-4 border-foreground font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Hasil:
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-yellow-400 border-4 border-foreground p-4 font-black text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                SCORE: {formData.totalScore}
              </div>
              <div className=" border-4 border-foreground p-4 font-black text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                Kategori: {formData.categoryPeople || "-"}
              </div>
            </div>
          </section>

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
