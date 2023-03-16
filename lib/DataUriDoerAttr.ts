export interface DataUriDoerAttrValue extends Readonly<Record<string, string | number | boolean | undefined>> {
  readonly charset: string;
  readonly base64: boolean;
}

export class DataUriDoerAttr {

  static DEFAULT_CHARSET = 'US-ASCII';

  public attr: DataUriDoerAttrValue = {
    charset: DataUriDoerAttr.DEFAULT_CHARSET,
    base64: false
  };

  constructor(attr: Partial<DataUriDoerAttrValue> = {}) {
    this.attr = {...this.attr, ...attr};
  }

  get charset(): string {
    return this.attr.charset;
  }

  set charset(charset: string) {
    this.attr = {...this.attr, charset};
  }

  get base64(): boolean {
    return this.attr.base64;
  }

  set base64(base64: boolean) {
    this.attr = {...this.attr, base64};
  }

  static parse(value: string): DataUriDoerAttr {
    const attr = value
      .split(';')
      .map((chunk) => chunk.trim())
      .filter((chunks) => !!chunks)
      .reduce<Record<string, string | number | boolean | undefined>>((attr, chunk) => {
        const [prefix, suffix] = chunk.split('=') as [prefix: string, suffix?: string];
        const name = decodeURIComponent(prefix);
        attr[name] = suffix ? decodeURIComponent(suffix) : true;
        return attr;
      }, {
        charset: DataUriDoerAttr.DEFAULT_CHARSET,
        base64: false
      });
    return new DataUriDoerAttr(attr);
  }

  toString(): string {
    return Object
      .keys(this.attr)
      .map((key) => {
        const value = this.attr[key];
        if (value === DataUriDoerAttr.DEFAULT_CHARSET && key === 'charset') {
          return;
        }
        if (value === true) {
          return `;${encodeURIComponent(key)}`;
        }
        if (value) {
          return `;${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        }
        return;
      })
      .filter((chunk): chunk is string => !!chunk)
      .join('');
  }

  toJSON(): DataUriDoerAttrValue {
    return {...this.attr};
  }

  isEqual(attr: DataUriDoerAttr): boolean {
    const sourceKeys = Object
      .keys(this.attr)
      .sort();
    const targetKeys = Object
      .keys(attr.attr)
      .sort();
    if (sourceKeys.length !== targetKeys.length) {
      return false;
    }

    return sourceKeys.every((key, index) => (
      key === targetKeys[index] &&
      this.attr[key] === attr.attr[key]
    ));
  }

  clone(): DataUriDoerAttr {
    return new DataUriDoerAttr({...this.attr});
  }
}
