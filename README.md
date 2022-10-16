# Data Uri Doer

Encode and decode data uris as specified in [RFC2397](https://tools.ietf.org/html/rfc2397).
 
## Install

```
npm install data-uri-doer
```

## Usage

```typescript
import {DataUriDoer} from "data-uri-doer";
```

or

```javascript
const {DataUriDoer} = require('data-uri-doer');
```

## API

### Instance

Initialize uri instance

```typescript
const data = '<p>Some data to encode.</p>';
const type = 'text/html';
const attr = {
  charset: 'UTF-8'
};
const dud = new DataUriDoer(data, type, attr);
```

Access uri properties

```typescript
const data = dud.data;
dud.data = data;
```
```typescript
const type = dud.type;
dud.type = type;
```
```typescript
const attr = dud.attr;
dud.attr = attr;
const charset = dud.attr.charset;
dud.attr.charset = charset;
const base64 = dud.attr.base64;
dud.attr.base64 = base64;
```

### Converting

Convert instance to string uri

```typescript
const dud = new DataUriDoer('data');
const string = dud.toString();
```

Convert instance to base64 string uri

```typescript
const data = Buffer.from('data');
const dud = new DataUriDoer(data);
const base64 = dud.toString();
```
or
```typescript
const dud = new DataUriDoer('data', undefined, {base46: true});
const base64 = dud.toString();
```

### Parsing

Parse string

```typescript
const dud = DataUriDoer.parse(string)
```

### Default mime type and charset

As specified in [RFC2397](https://tools.ietf.org/html/rfc2397) the default mime type is `text/plain` and the default charset is `US-ASCII`.

During parsing, these values will be used as fallback if is not given:
  
```typescript
const dud = DataUriDoer.parse('data:,some%20data');

console.log(dud.data);          // -> data
console.log(dud.mime);          // -> text/plain
console.log(dud.attr.charset);  // -> US-ASCII
```

During converting, the default values will be removed:
 
```typescript
const dud = new DataUriDoer('some data', 'text/plain', {charset: 'US-ASCII'});

console.log(dud.toString());    // -> data:,some%20data
```
