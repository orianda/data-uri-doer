import { DataUriDoerAttr, DataUriDoerAttrValue } from "./DataUriDoerAttr";
export interface DataUriDoerType {
    readonly data: Uint8Array | string;
    readonly type: string;
    readonly attr: DataUriDoerAttrValue;
}
export declare class DataUriDoer {
    data: Uint8Array | string;
    type: string;
    static DEFAULT_TYPE: string;
    attr: DataUriDoerAttr;
    constructor(data: Uint8Array | string, type?: string, attr?: DataUriDoerAttr | Partial<DataUriDoerAttrValue>);
    static parse(uri: string): DataUriDoer;
    toString(): string;
    toJSON(): DataUriDoerType;
    isEqual(dud: DataUriDoer): boolean;
    clone(): DataUriDoer;
}
//# sourceMappingURL=DataUriDoer.d.ts.map