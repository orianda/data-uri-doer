"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataUriDoerAttr = void 0;
class DataUriDoerAttr {
    constructor(attr = {}) {
        this.attr = {
            charset: DataUriDoerAttr.DEFAULT_CHARSET,
            base64: false
        };
        this.attr = { ...this.attr, ...attr };
    }
    get charset() {
        return this.attr.charset;
    }
    set charset(charset) {
        this.attr = { ...this.attr, charset };
    }
    get base64() {
        return this.attr.base64;
    }
    set base64(base64) {
        this.attr = { ...this.attr, base64 };
    }
    static parse(value) {
        const attr = value
            .split(';')
            .map((chunk) => chunk.trim())
            .filter((chunks) => !!chunks)
            .reduce((attr, chunk) => {
            const [prefix, suffix] = chunk.split('=');
            const name = decodeURIComponent(prefix);
            attr[name] = suffix ? decodeURIComponent(suffix) : true;
            return attr;
        }, {
            charset: DataUriDoerAttr.DEFAULT_CHARSET,
            base64: false
        });
        return new DataUriDoerAttr(attr);
    }
    toString() {
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
            .filter((chunk) => !!chunk)
            .join('');
    }
    toJSON() {
        return { ...this.attr };
    }
    isEqual(attr) {
        const sourceKeys = Object
            .keys(this.attr)
            .sort();
        const targetKeys = Object
            .keys(attr.attr)
            .sort();
        if (sourceKeys.length !== targetKeys.length) {
            return false;
        }
        return sourceKeys.every((key, index) => (key === targetKeys[index] &&
            this.attr[key] === attr.attr[key]));
    }
    clone() {
        return new DataUriDoerAttr({ ...this.attr });
    }
}
DataUriDoerAttr.DEFAULT_CHARSET = 'US-ASCII';
exports.DataUriDoerAttr = DataUriDoerAttr;
//# sourceMappingURL=DataUriDoerAttr.js.map