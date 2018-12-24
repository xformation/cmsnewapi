export interface ILocation {
    id?: number;
    name?: string;
    address?: string;
    appliesTo?: string;
}

export class Location implements ILocation {
    constructor(public id?: number, public name?: string, public address?: string, public appliesTo?: string) {}
}
