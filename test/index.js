'use strict';

var chai = require('chai'),
  expect = chai.expect,
  DataUriDoer = require('../src');

describe('DataUriDoer', function () {

  it('should exist', function () {
    expect(typeof DataUriDoer).to.equal('function');
  });

  it('should be the constructor', function () {
    expect(DataUriDoer.name).to.equal('DataUriDoer');
  });

  it('should create instance', function () {
    var dud = new DataUriDoer('data', 'type', {});
    expect(dud instanceof DataUriDoer).to.equal(true);
  });

  it('should create instance without new operation', function () {
    var dud = DataUriDoer('another test safe');
    expect(dud instanceof DataUriDoer).to.equal(true);
  });

  it('should have props', function () {
    var dud = new DataUriDoer('data', 'type', {charset: 'charset'});
    expect(dud.data).to.equal('data');
    expect(dud.type).to.equal('type');
    expect(dud.attr).to.deep.equal({charset: 'charset'});
  });

  it('should have default props', function () {
    var dud = new DataUriDoer();
    expect(dud.data).to.equal('');
    expect(dud.type).to.equal('text/plain');
    expect(dud.attr).to.deep.equal({charset: 'US-ASCII'});
  });

  it('should convert to string', function () {
    var dud = new DataUriDoer('data', 'type', {charset: 'charset'});
    expect(dud.toString()).to.equal('data:type;charset=charset,data');
  });

  it('should convert to base64', function () {
    var dud = new DataUriDoer('data', 'type', {charset: 'charset'});
    expect(dud.toString(true)).to.equal('data:type;charset=charset;base64,ZGF0YQ==');
  });

  it('should convert multiple attributes', function () {
    var dud = new DataUriDoer('data', 'type', {
      charset: 'charset',
      more: 'then',
      one: 'attribute',
      here: 12
    });
    expect(dud.toString(true)).to.equal('data:type;charset=charset;more=then;one=attribute;here=12;base64,ZGF0YQ==');
  });

  it('should convert and remove defaults', function () {
    var dud = new DataUriDoer('data');
    expect(dud.toString()).to.equal('data:,data');
  });

  it('should parse string', function () {
    var dud = new DataUriDoer.parse('data:type;charset=charset,data');
    expect(dud.data).to.equal('data');
    expect(dud.type).to.equal('type');
    expect(dud.attr).to.deep.equal({charset: 'charset'});
  });

  it('should parse base64', function () {
    var dud = new DataUriDoer.parse('data:type;charset=charset;base64,ZGF0YQ==');
    expect(dud.data).to.equal('data');
    expect(dud.type).to.equal('type');
    expect(dud.attr).to.deep.equal({charset: 'charset'});
  });

  it('should parse multiple attributes', function () {
    var dud = new DataUriDoer.parse('data:type;charset=charset;more=then;one=attribute;here=12;base64,ZGF0YQ==');
    expect(dud.data).to.equal('data');
    expect(dud.type).to.equal('type');
    expect(dud.attr).to.deep.equal({
      charset: 'charset',
      more: 'then',
      one: 'attribute',
      here: '12'
    });
  });

  it('should parse with fallback params', function () {
    var dud = new DataUriDoer.parse('data:,data', 'type', 'charset');
    expect(dud.data).to.equal('data');
    expect(dud.type).to.equal('type');
    expect(dud.attr).to.deep.equal({charset: 'charset'});
  });

  it('should parse and fill defaults', function () {
    var dud = new DataUriDoer.parse('data:,data');
    expect(dud.data).to.equal('data');
    expect(dud.type).to.equal('text/plain');
    expect(dud.attr).to.deep.equal({charset: 'US-ASCII'});
  });

  it('should clone', function () {
    var dud1 = new DataUriDoer('data', 'type', {charset: 'charset'});
    var dud2 = DataUriDoer.clone(dud1);
    expect(dud2.data).to.equal('data');
    expect(dud2.type).to.equal('type');
    expect(dud2.attr).to.deep.equal({charset: 'charset'});
    expect(dud2.attr).to.not.equal(dud1.attr);
  });
});