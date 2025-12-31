import { ObjectId } from "mongodb";

export type People = {
  _id?: ObjectId;
  noApp: string;
  nama: string;
  tempatLahir: string;
  tanggalLahir: Date;
  Kelamin: string;
  kodePos: string;
  alamat: string;
};

export type info1 = {
  _id?: ObjectId;
  umur: string;
  umurDanTenor: string;
  stsPerkawinan: string;
  pendidikan: string;
};
export type info2 = {
  _id?: ObjectId;
  alamat: string;
  kepemilikanRumah: string;
  lamaTinggal: string;
};
export type info3 = {
  _id?: ObjectId;
  kategoriPerusahaan: string;
  jabatan: string;
  lamaBekerja: string;
  pendapatanTHPP: string;
};
export type info4 = {
  _id?: ObjectId;
  rekeningBank: string;
  avgSaldoBulan: string;
  trackingPembayaran: string;
  tracjSLIK: string;
  typeKartuKredit: string;
};

export type info5 = {
  _id?: ObjectId;
  tenor: string;
  debServiceRatio: string;
};

export type info6 = {
  _id?: ObjectId;
  hasilAppraisal: string;
  luasBangunan: string;
  tujuanPembiayaan: string;
  ltv: string;
};

export type FormPeople = {
  _id?: ObjectId;
  idPeople: string;
  totalScore: number;
  categoryPeople: string;
  info1: info1;
  info2: info2;
  info3: info3;
  info4: info4;
  info5: info5;
  info6: info6;
};
