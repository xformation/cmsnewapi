export interface IDepartments {
    id?: number;
    name?: string;
    description?: string;
    deptHead?: string;
}

export class Departments implements IDepartments {
    constructor(public id?: number, public name?: string, public description?: string, public deptHead?: string) {}
}
