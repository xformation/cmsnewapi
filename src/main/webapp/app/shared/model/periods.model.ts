export const enum ClassPeriods {
    ONE = 'ONE',
    TWO = 'TWO',
    THREE = 'THREE',
    FOUR = 'FOUR',
    FIVE = 'FIVE'
}

export interface IPeriods {
    id?: number;
    periods?: ClassPeriods;
    sectionId?: number;
    teacherId?: number;
}

export class Periods implements IPeriods {
    constructor(public id?: number, public periods?: ClassPeriods, public sectionId?: number, public teacherId?: number) {}
}
