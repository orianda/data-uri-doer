"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataUriDoer = void 0;
const DataUriDoerAttr_1 = require("./DataUriDoerAttr");
class DataUriDoer {
    constructor(data, type = DataUriDoer.DEFAULT_TYPE, attr = new DataUriDoerAttr_1.DataUriDoerAttr()) {
        this.data = data;
        this.type = type;
        this.attr = attr instanceof DataUriDoerAttr_1.DataUriDoerAttr ? attr : new DataUriDoerAttr_1.DataUriDoerAttr(attr);
    }
    static parse(uri) {
        const match = uri
            .trim()
            .match(/^data:([^;,]*)((?:;[^;,]*)*?),(.*)$/);
        if (!match) {
            throw new Error('Invalid data uri.');
        }
        const [, prefix, suffix, body] = match;
        const attr = DataUriDoerAttr_1.DataUriDoerAttr.parse(suffix);
        const data = attr.base64
            ? Buffer
                .from(body, 'base64')
            : decodeURIComponent(body);
        const type = prefix || DataUriDoer.DEFAULT_TYPE;
        return new DataUriDoer(data, type, attr);
    }
    toString() {
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
    toJSON() {
        return {
            data: this.data,
            type: this.type,
            attr: this.attr.toJSON()
        };
    }
    isEqual(dud) {
        return (this.data === dud.data &&
            this.type.toLowerCase() === dud.type.toLowerCase() &&
            this.attr.isEqual(dud.attr));
    }
    clone() {
        return new DataUriDoer(this.data, this.type, this.attr.clone());
    }
}
exports.DataUriDoer = DataUriDoer;
DataUriDoer.DEFAULT_TYPE = 'text/plain';
//# sourceMappingURL=DataUriDoer.js.map