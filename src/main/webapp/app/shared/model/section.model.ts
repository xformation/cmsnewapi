export const enum ClassSection {
    A = 'A',
    B = 'B'
}

export interface ISection {
    id?: number;
    section?: ClassSection;
    studentyearId?: number;
}

export class Section implements ISection {
    constructor(public id?: number, public section?: ClassSection, public studentyearId?: number) {}
}
