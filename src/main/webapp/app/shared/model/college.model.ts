export interface ICollege {
    id?: number;
    shortName?: string;
    logo?: number;
    backgroundImage?: number;
    instructionInformation?: string;
}

export class College implements ICollege {
    constructor(
        public id?: number,
        public shortName?: string,
        public logo?: number,
        public backgroundImage?: number,
        public instructionInformation?: string
    ) {}
}
