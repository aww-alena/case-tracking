import { AimTask, IAim, IntermediateValue } from '../interfaces/aim';

export class Aim implements IAim {
    public name: string;
    public icon: string;
    public color: string;
    public startDate: Date;
    public endDate: Date;
    public currentValue: number;
    public targetValue: number;
    public measure: string;
    public user: string;
    public tasks: AimTask[];
    public intermediateValues: IntermediateValue[];
    public _id: string;

    constructor(aimParams: IAim) {
        this.name = aimParams.name;
        this.color = aimParams.color;
        this.icon = aimParams.icon;
        this.startDate = aimParams.startDate;
        this.endDate = aimParams.endDate;
        this.currentValue = aimParams.currentValue;
        this.targetValue = aimParams.targetValue;
        this.measure = aimParams.measure;
        this.user = (aimParams.user !== undefined) ? aimParams.user : '';
        this.intermediateValues = (aimParams.intermediateValues !== undefined) ? aimParams.intermediateValues : [];
        this.tasks = (aimParams.tasks !== undefined) ? aimParams.tasks : [];
        this._id = (aimParams._id !== undefined) ? aimParams._id : '';
    }
}
