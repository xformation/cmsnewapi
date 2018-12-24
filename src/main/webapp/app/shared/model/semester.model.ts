export const enum Sem {
    SEMI = 'SEMI',
    SEMII = 'SEMII'
}

export interface ISemester {
    id?: number;
    sem?: Sem;
}

export class Semester implements ISemester {
    constructor(public id?: number, public sem?: Sem) {}
}
