export interface DataUriDoerAttrValue extends Record<string, string | number | boolean | undefined> {
    charset: string;
    base64: boolean;
}
export declare class DataUriDoerAttr {
    static DEFAULT_CHARSET: string;
    attr: DataUriDoerAttrValue;
    constructor(attr?: Partial<DataUriDoerAttrValue>);
    get charset(): string;
    set charset(charset: string);
    get base64(): boolean;
    set base64(base64: boolean);
    static parse(value: string): DataUriDoerAttr;
    toString(): string;
    toJSON(): DataUriDoerAttrValue;
    isEqual(attr: DataUriDoerAttr): boolean;
    clone(): DataUriDoerAttr;
}
//# sourceMappingURL=DataUriDoerAttr.d.ts.map