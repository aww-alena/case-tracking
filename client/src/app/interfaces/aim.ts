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
    intermediateValues: IntermediateValue[];
    _id: string;
}

export interface IntermediateValue {
    value: number;
    done: Date;
}

export interface AimTask {
    name: string;
    numberPerWeek: number;
    completion: CompletionEntry[];
}

export interface CompletionEntry {
    done: Date;
}


