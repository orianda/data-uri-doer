# Data Uri Doer

Encode and decode data uris as specified in [RFC2397](https://tools.ietf.org/html/rfc2397).
 
## Install

```
npm install data-uri-doer
```

## API

### Instance

Initialize uri instance

```javascript
var data = '<p>Some data to encode.</p>';
var type = 'text/html';
var attr = {
  charset: 'UTF-8'
};
var dud = new DataUriDoer(data, type, attr);
```

Access uri properties

```javascript
var data = dud.data;
dud.data = data;
```
```javascript
var type = dud.type;
dud.type = type;
```
```javascript
var attr = dud.attr;
dud.attr = attr;
var charset = dud.attr.charset;
dud.attr.charset = charset;
```

### Converting

Convert instance to string

```javascript
var string = dud.toString()
```

Convert instance to base64 string

```javascript
var base64 = dud.toString(true)
```

### Parsing

Parse string

```javascript
var dud = DataUriDoer.parse(string)
```

Parse string using fallback mime type and charset,
which will be used in case it is not specified by the data uri.

```javascript
var dud = DataUriDoer.parse(string, 'text/html', 'UTF-8')
```

### Default mime type and charset

As specified in [RFC2397](https://tools.ietf.org/html/rfc2397) the default mime type is `text/plain` and the default charset is `US-ASCII`.

During parsing, these values will be used as fallback if is not given:
  
```javascript
var dud = DataUriDoer.parse('data:,some%20data');

console.log(dud.data);          // -> data
console.log(dud.mime);          // -> text/plain
console.log(dud.attr.charset);  // -> US-ASCII
```

During converting, the default values will be removed:
 
```javascript
var dud = new DataUriDoer('some data', 'text/plain', {charset: 'US-ASCII'});

console.log(dud.toString());    // -> data:,some%20data
```
