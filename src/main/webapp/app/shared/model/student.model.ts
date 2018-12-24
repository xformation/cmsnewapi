export const enum Elective {
    JAVA = 'JAVA',
    C = 'C'
}

export interface IStudent {
    id?: number;
    sName?: string;
    attendance?: boolean;
    electiveSub?: Elective;
    teacherId?: number;
}

export class Student implements IStudent {
    constructor(
        public id?: number,
        public sName?: string,
        public attendance?: boolean,
        public electiveSub?: Elective,
        public teacherId?: number
    ) {
        this.attendance = this.attendance || false;
    }
}
