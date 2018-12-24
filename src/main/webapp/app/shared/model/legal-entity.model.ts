import { Moment } from 'moment';

export const enum TypeOfCollege {
    PRIVATE = 'PRIVATE',
    PUBLIC = 'PUBLIC'
}

export interface ILegalEntity {
    id?: number;
    logo?: number;
    legalNameOfTheCollege?: string;
    typeOfCollege?: TypeOfCollege;
    dateOfIncorporation?: Moment;
    registeredOfficeAddress?: string;
    collegeIdentificationNumber?: string;
    pan?: string;
    tan?: string;
    tanCircleNumber?: string;
    citTdsLocation?: string;
    formSignatory?: string;
    pfNumber?: string;
    registrationDate?: Moment;
    esiNumber?: number;
    ptRegistrationDate?: Moment;
    ptSignatory?: string;
    ptNumber?: number;
    authorizedSignatoryId?: number;
}

export class LegalEntity implements ILegalEntity {
    constructor(
        public id?: number,
        public logo?: number,
        public legalNameOfTheCollege?: string,
        public typeOfCollege?: TypeOfCollege,
        public dateOfIncorporation?: Moment,
        public registeredOfficeAddress?: string,
        public collegeIdentificationNumber?: string,
        public pan?: string,
        public tan?: string,
        public tanCircleNumber?: string,
        public citTdsLocation?: string,
        public formSignatory?: string,
        public pfNumber?: string,
        public registrationDate?: Moment,
        public esiNumber?: number,
        public ptRegistrationDate?: Moment,
        public ptSignatory?: string,
        public ptNumber?: number,
        public authorizedSignatoryId?: number
    ) {}
}
