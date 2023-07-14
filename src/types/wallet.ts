export type Bank = {
  id: number;
  name: string;
};

export type BankOption = Bank[];

export type PostTopUpForm = {
  bank_id: number;
  jumlah: number;
};
export type TopUpForm = {
  bank_id: string;
  jumlah: number;
};

export type TarikForm = {
  jumlah_penarikan: string;
  no_rek: string;
  bank_id: string;
};

export type PostTarikForm = {
  jumlah_penarikan: number;
  no_rek: string;
  bank_id: number;
};
