(function (create) {
  'use strict';

  var Class = create();

  if (typeof module === 'object' && module instanceof Object && module.exports instanceof Object) {
    module.exports = Class;
  } else if (typeof window === 'object' && window instanceof Object) {
    window[Class.name] = Class;
  } else {
    throw new Error('No valid context available.');
  }

})(function () {
  'use strict';

  var DEFAULT_TYPE = 'text/plain',
    DEFAULT_CHARSET = 'US-ASCII';

  /**
   * Is value null or undefined
   * @param {*} value
   * @returns {boolean}
   */
  function isNil(value) {
    return typeof value === 'undefined' || value === null;
  }

  /**
   * Clone data
   * @param {*} data
   * @returns {*}
   */
  function clone(data) {
    var issue;
    if (data instanceof Array) {
      issue = [];
      for (var i = 0, l = data.length; i < l; i++) {
        issue[i] = clone(data[i]);
      }
    } else if (data instanceof Object) {
      issue = {};
      for (var k in data) {
        if (data.hasOwnProperty(k)) {
          issue[k] = clone(data[k]);
        }
      }
    } else {
      issue = data;
    }
    return issue;
  }

  /**
   * Converts attributes
   * @param {Object} attr
   * @returns {string}
   */
  function encodeAttr(attr) {
    var issue = [];
    for (var k in attr) {
      if (attr.hasOwnProperty(k)) {
        var name = encodeURIComponent(k),
          data = isNil(attr[k]) ? '' : encodeURIComponent(attr[k]);
        issue.push(';' + name + '=' + data);
      }
    }
    return issue.join('');
  }

  /**
   * Parses attributes
   * @param {string} string
   * @returns {Object}
   */
  function decodeAttr(string) {
    var attr = {},
      chunks = string.split(';');
    for (var i = 0, l = chunks.length; i < l; i++) {
      if (chunks[i]) {
        var splits = chunks[i].split('='),
          name = decodeURIComponent(splits.shift());
        attr[name] = decodeURIComponent(splits.join('='));
      }
    }
    return attr;
  }

  /**
   * Converts data uri
   * @param {string} data
   * @param {string} [type]
   * @param {Object} [attr]
   * @param {boolean} [base64=false]
   * @returns {string}
   */
  function encodeUri(data, type, attr, base64) {
    data = isNil(data) ? '' : base64 ? btoa(data) : encodeURIComponent(data);
    type = isNil(type) ? '' : type.toLowerCase() === DEFAULT_TYPE ? '' : type;
    if (attr && attr.charset === DEFAULT_CHARSET) {
      delete attr.charset;
    }
    return 'data:' + type + encodeAttr(attr) + (base64 ? ';base64' : '') + ',' + data;
  }

  /**
   * Parses data uri
   * @param {string} uri
   * @param {string} [type] Fallback mime type
   * @param {string} [charset] Fallback charset
   * @returns {Object}
   */
  function decodeUri(uri, type, charset) {
    var issue = {},
      match = isNil(uri) ? null : uri.trim().match(/^data:([^;,]*)((?:;[^;,]*)*?)(;base64)?,(.*)$/);

    if (!match) {
      throw new Error('Invalid data uri');
    }

    issue.type = match[1] || type || '';
    issue.attr = decodeAttr(match[2]);
    issue.attr.charset = issue.attr.charset || charset;
    issue.data = match[3] ? atob(match[4]) : decodeURIComponent(match[4]);

    return issue;
  }

  /**
   * Create data uri instance
   * @param {string|DataUriDoer} data
   * @param {string} [type="text/plain"]
   * @param {Object} [attr]
   * @param {string} [attr.charset="US-ASCII"]
   * @returns {DataUriDoer}
   * @constructor
   */
  function DataUriDoer(data, type, attr) {

    /**
     * Ensure this function was called using new operator
     */
    if (!(this instanceof DataUriDoer)) {
      return new DataUriDoer(data, type, attr);
    }

    this.data = data || '';
    this.type = type || DEFAULT_TYPE;
    this.attr = attr || {};
    this.attr.charset = this.attr.charset || DEFAULT_CHARSET;
  }

  /**
   * Convert data uri to string
   * @param {boolean} [base64=false]
   * @returns {string}
   */
  DataUriDoer.prototype.toString = function (base64) {
    return encodeUri(this.data, this.type, this.attr, base64);
  };

  /**
   * Parse data uri
   * @param {string} uri
   * @param {string} [type] Fallback mime type
   * @param {string} [charset] Fallback charset
   * @returns {DataUriDoer}
   */
  DataUriDoer.parse = function (uri, type, charset) {
    var parsed = decodeUri(uri, type, charset);
    return new DataUriDoer(parsed.data, parsed.type, parsed.attr);
  };

  /**
   * Clone instance
   * @param {DataUriDoer} dud
   * @returns {DataUriDoer|null}
   */
  DataUriDoer.clone = function (dud) {
    return isNil(dud) ? null : new DataUriDoer(dud.data, dud.type, clone(dud.attr));
  };

  /**
   * Polyfill atob
   */
  if (typeof atob === 'undefined') {
    global.atob = function (value) {
      return new Buffer(value, 'base64').toString();
    };
  }

  /**
   * Polyfill btoa
   */
  if (typeof btoa === 'undefined') {
    global.btoa = function (value) {
      return new Buffer(value).toString('base64');
    };
  }

  return DataUriDoer;
});