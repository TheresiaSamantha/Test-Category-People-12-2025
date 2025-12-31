export type People = {
  noApp: string;
  nama: string;
  tempatLahir: string;
  tanggalLahir: Date;
  Kelamin: string;
  kodePos: string;
  alamat: string;
};

export type info1 = {
  umur: number;
  umurDanTenor: string;
  stsPerkawinan: string;
  pendidikan: string;
};
export type info2 = {
  alamat: string;
  kepemilikanRumah: string;
  lamaTinggal: string;
};
export type info3 = {
  kategoriPerusahaan: string;
  jabatan: string;
  lamaBekerja: string;
  pendapatanTHPP: string;
};
export type info4 = {
  rekeningBank: string;
  avgSaldoBulan: string;
  trackingPembayaran: string;
  tracjSLIK: string;
  typeKartuKredit: string;
};

export type info5 = {
  tenor: string;
  debServiceRatio: string;
};

export type info6 = {
  hasilAppraisal: string;
  luasBangunan: string;
  tujuanPembiayaan: string;
  ltv: string;
};

export type PeopleInput = {
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
