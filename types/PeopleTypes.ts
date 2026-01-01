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

export type info1Type = {
  umur: string;
  umurDanTenor: string;
  stsPerkawinan: string;
  pendidikan: string;
};
export type info2Type = {
  alamat: string;
  kepemilikanRumah: string;
  lamaTinggal: string;
};
export type info3Type = {
  kategoriPerusahaan: string;
  jabatan: string;
  lamaBekerja: string;
  pendapatanTHPP: string;
};
export type info4Type = {
  rekeningBank: string;
  avgSaldoBulan: string;
  trackingPembayaran: string;
  tracjSLIK: string;
  typeKartuKredit: string;
};

export type info5Type = {
  tenor: string;
  debServiceRatio: string;
};

export type info6Type = {
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
  info1: info1Type;
  info2: info2Type;
  info3: info3Type;
  info4: info4Type;
  info5: info5Type;
  info6: info6Type;
};

export type akumulasiScoreType = {
  info1: {
    bobotInfo: 0;
    optionScore: {
      umur: { bobotOption: 0; selectionScore: 0 };
      umurDanTenor: { bobotOption: 0; selectionScore: 0 };
      stsPerkawinan: { bobotOption: 0; selectionScore: 0 };
      pendidikan: { bobotOption: 0; selectionScore: 0 };
    };
  };
  info2: {
    bobotInfo: 0;
    optionScore: {
      alamat: { bobotOption: 0; selectionScore: 0 };
      kepemilikanRumah: { bobotOption: 0; selectionScore: 0 };
      lamaTinggal: { bobotOption: 0; selectionScore: 0 };
    };
  };
  info3: {
    bobotInfo: 0;
    optionScore: {
      kategoriPerusahaan: { bobotOption: 0; selectionScore: 0 };
      jabatan: { bobotOption: 0; selectionScore: 0 };
      lamaBekerja: { bobotOption: 0; selectionScore: 0 };
      pendapatanTHPP: { bobotOption: 0; selectionScore: 0 };
    };
  };
  info4: {
    bobotInfo: 0;
    optionScore: {
      rekeningBank: { bobotOption: 0; selectionScore: 0 };
      avgSaldoBulan: { bobotOption: 0; selectionScore: 0 };
      trackingPembayaran: { bobotOption: 0; selectionScore: 0 };
      tracjSLIK: { bobotOption: 0; selectionScore: 0 };
      typeKartuKredit: { bobotOption: 0; selectionScore: 0 };
    };
  };
  info5: {
    bobotInfo: 0;
    optionScore: {
      tenor: { bobotOption: 0; selectionScore: 0 };
      debServiceRatio: { bobotOption: 0; selectionScore: 0 };
    };
  };
  info6: {
    bobotInfo: 0;
    optionScore: {
      hasilAppraisal: { bobotOption: 0; selectionScore: 0 };
      luasBangunan: { bobotOption: 0; selectionScore: 0 };
      tujuanPembiayaan: { bobotOption: 0; selectionScore: 0 };
      ltv: { bobotOption: 0; selectionScore: 0 };
    };
  };
};
