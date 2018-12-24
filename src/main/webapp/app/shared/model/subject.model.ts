export const enum Common {
    MATHS = 'MATHS',
    PHYSICS = 'PHYSICS',
    CHEMISTRY = 'CHEMISTRY',
    DBMS = 'DBMS'
}

export const enum Elective {
    JAVA = 'JAVA',
    C = 'C'
}

export interface ISubject {
    id?: number;
    commonSub?: Common;
    electiveSub?: Elective;
    periodsId?: number;
    studentId?: number;
    teacherId?: number;
}

export class Subject implements ISubject {
    constructor(
        public id?: number,
        public commonSub?: Common,
        public electiveSub?: Elective,
        public periodsId?: number,
        public studentId?: number,
        public teacherId?: number
    ) {}
}
