export interface ITeacher {
    id?: number;
    tName?: string;
    periodsId?: number;
}

export class Teacher implements ITeacher {
    constructor(public id?: number, public tName?: string, public periodsId?: number) {}
}
