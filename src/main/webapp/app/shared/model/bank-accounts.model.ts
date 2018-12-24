export const enum NameOfBank {
    HDFC = 'HDFC',
    SBI = 'SBI',
    ICICI = 'ICICI',
    ANDHRABANK = 'ANDHRABANK'
}

export interface IBankAccounts {
    id?: number;
    nameOfBank?: NameOfBank;
    accountNumber?: number;
    typeOfAccount?: string;
    ifsCode?: string;
    branch?: string;
    corporateId?: number;
}

export class BankAccounts implements IBankAccounts {
    constructor(
        public id?: number,
        public nameOfBank?: NameOfBank,
        public accountNumber?: number,
        public typeOfAccount?: string,
        public ifsCode?: string,
        public branch?: string,
        public corporateId?: number
    ) {}
}
