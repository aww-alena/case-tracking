export interface IAim {
    name: string;
    icon: string;
    color: string;
    startDate: Date;
    endDate: Date;
    currentValue: number;
    targetValue: number;
    measure: string;
    user: string;
    tasks: AimTask[];
    intermediateValues?: IntermediateValue[];
    _id?: string;
}

export interface IntermediateValue {
    value: number;
    done: Date;
}

export interface AimTask {
    _id: string;
    name: string;
    numberPerWeek: number;
    completion?: CompletionEntry[];
}

export interface CompletionEntry {
    _id?: string;
    done: Date;
}


