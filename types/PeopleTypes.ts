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

export type bobotdanScoreType = {
  bobotOption: number;
  selectionScore: number;
};

export type OptionItemType = {
  [key: string]: {
    bobotOptions: number;
    options: bobotdanScoreType[];
  };
};

export type akumulasiScoreType = {
  info1: {
    bobotInfo: 0;
    optionScore: {
      umur: bobotdanScoreType;
      umurDanTenor: bobotdanScoreType;
      stsPerkawinan: bobotdanScoreType;
      pendidikan: bobotdanScoreType;
    };
  };
  info2: {
    bobotInfo: 0;
    optionScore: {
      alamat: bobotdanScoreType;
      kepemilikanRumah: bobotdanScoreType;
      lamaTinggal: bobotdanScoreType;
    };
  };
  info3: {
    bobotInfo: 0;
    optionScore: {
      kategoriPerusahaan: bobotdanScoreType;
      jabatan: bobotdanScoreType;
      lamaBekerja: bobotdanScoreType;
      pendapatanTHPP: bobotdanScoreType;
    };
  };
  info4: {
    bobotInfo: 0;
    optionScore: {
      rekeningBank: bobotdanScoreType;
      avgSaldoBulan: bobotdanScoreType;
      trackingPembayaran: bobotdanScoreType;
      tracjSLIK: bobotdanScoreType;
      typeKartuKredit: bobotdanScoreType;
    };
  };
  info5: {
    bobotInfo: 0;
    optionScore: {
      tenor: bobotdanScoreType;
      debServiceRatio: bobotdanScoreType;
    };
  };
  info6: {
    bobotInfo: 0;
    optionScore: {
      hasilAppraisal: bobotdanScoreType;
      luasBangunan: bobotdanScoreType;
      tujuanPembiayaan: bobotdanScoreType;
      ltv: bobotdanScoreType;
    };
  };
};
