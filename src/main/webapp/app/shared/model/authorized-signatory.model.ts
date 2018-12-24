export interface IAuthorizedSignatory {
    id?: number;
    signatoryName?: string;
    signatoryFatherName?: string;
    signatoryDesignation?: string;
    address?: string;
    email?: string;
    panCardNumber?: string;
}

export class AuthorizedSignatory implements IAuthorizedSignatory {
    constructor(
        public id?: number,
        public signatoryName?: string,
        public signatoryFatherName?: string,
        public signatoryDesignation?: string,
        public address?: string,
        public email?: string,
        public panCardNumber?: string
    ) {}
}
