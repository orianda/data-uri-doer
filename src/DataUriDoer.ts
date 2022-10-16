import {DataUriDoerAttr, DataUriDoerAttrValue} from "./DataUriDoerAttr";

export interface DataUriDoerType {
  data: Uint8Array | string;
  type: string;
  attr: DataUriDoerAttrValue;
}

export class DataUriDoer {

  static DEFAULT_TYPE = 'text/plain';

  public attr: DataUriDoerAttr;

  constructor(
    public data: Uint8Array | string,
    public type = DataUriDoer.DEFAULT_TYPE,
    attr: DataUriDoerAttr | Partial<DataUriDoerAttrValue> = new DataUriDoerAttr()
  ) {
    this.attr = attr instanceof DataUriDoerAttr ? attr : new DataUriDoerAttr(attr);
  }

  static parse(uri: string): DataUriDoer {
    const match = uri
      .trim()
      .match(/^data:([^;,]*)((?:;[^;,]*)*?),(.*)$/) as [
      match: string,
      prefix: string,
      suffix: string,
      body: string
    ] | null;
    if (!match) {
      throw new Error('Invalid data uri.');
    }

    const [, prefix, suffix, body] = match;
    const attr = DataUriDoerAttr.parse(suffix);
    const data = attr.base64
      ? Buffer
        .from(body, 'base64')
      : decodeURIComponent(body)
    const type = prefix || DataUriDoer.DEFAULT_TYPE;
    return new DataUriDoer(data, type, attr);
  }

  toString(): string {
    const body = this.data instanceof Uint8Array
      ? Buffer
        .from(this.data)
        .toString('base64')
      : this.attr.base64
        ? Buffer
          .from(this.data)
          .toString('base64')
        : encodeURIComponent(this.data);
    const mime = this.type.toLowerCase() === DataUriDoer.DEFAULT_TYPE ? '' : this.type;
    this.attr.base64 = this.attr.base64 || this.data instanceof Uint8Array;
    const attr = this.attr.toString();
    return `data:${mime}${attr},${body}`;
  }

  toJSON(): DataUriDoerType {
    return {
      data: this.data,
      type: this.type,
      attr: this.attr.toJSON()
    };
  }

  isEqual(dud: DataUriDoer): boolean {
    return (
      this.data === dud.data &&
      this.type.toLowerCase() === dud.type.toLowerCase() &&
      this.attr.isEqual(dud.attr)
    );
  }

  clone(): DataUriDoer {
    return new DataUriDoer(this.data, this.type, this.attr.clone());
  }
}
