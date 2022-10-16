import {expect} from "chai";
import {DataUriDoerAttr} from "./DataUriDoerAttr";

describe('DataUriDoerAttr', () => {

  describe('constructor', () => {

    it('should have default', () => {
      const attr = new DataUriDoerAttr();

      expect(attr.attr).to.deep.equal({
        charset: DataUriDoerAttr.DEFAULT_CHARSET,
        base64: false
      });
    });

    it('should overwrite', () => {
      const props = {
        charset: 'UTF-8',
        base64: true
      };
      const attr = new DataUriDoerAttr(props);

      expect(attr.attr).to.deep.equal(props);
    });

    it('should extend', () => {
      const attr = new DataUriDoerAttr({
        other: 'prop',
        bool: true
      });

      expect(attr.attr).to.deep.equal({
        charset: DataUriDoerAttr.DEFAULT_CHARSET,
        base64: false,
        other: 'prop',
        bool: true
      });
    })
  });

  describe('charset', () => {

    it('should get', () => {
      const attr = new DataUriDoerAttr({
        charset: 'UTF-8'
      });

      expect(attr.charset).to.equal('UTF-8');
    });

    it('should set', () => {
      const attr = new DataUriDoerAttr();
      attr.charset = 'UTF-8';

      expect(attr.charset).to.equal('UTF-8');
    });
  });

  describe('base64', () => {

    it('should get', () => {
      const attr = new DataUriDoerAttr({
        base64: true
      });

      expect(attr.base64).to.equal(true);
    });

    it('should set', () => {
      const attr = new DataUriDoerAttr();
      attr.base64 = true;

      expect(attr.base64).to.equal(true);
    });
  });

  describe('parse', () => {

    it('should overwrite', () => {
      const attr = DataUriDoerAttr.parse(';charset=UTF-8;hallo=du;eumel;base64');

      expect(attr.attr).to.deep.equal({
        charset: 'UTF-8',
        base64: true,
        hallo: 'du',
        eumel: true
      });
    });

    it('should extend', () => {
      const attr = DataUriDoerAttr.parse(';hallo=du;eumel');

      expect(attr.attr).to.deep.equal({
        charset: DataUriDoerAttr.DEFAULT_CHARSET,
        base64: false,
        hallo: 'du',
        eumel: true
      });
    });
  });

  describe('toString', () => {

    it('should be empty', () => {
      const attr = new DataUriDoerAttr().toString();

      expect(attr).to.equal('');
    });

    it('should not be empty', () => {
      const attr = new DataUriDoerAttr({
        charset: 'UTF-8',
        base64: true,
        hallo: 'du',
        eumel: true
      }).toString();

      expect(attr).to.equal(';charset=UTF-8;base64;hallo=du;eumel');
    });

    it('should ignore', () => {
      const attr = new DataUriDoerAttr({
        hallo: undefined,
        eumel: false
      }).toString();

      expect(attr).to.equal('');
    });
  });

  describe('toJSON', () => {

    it('should have defaults', () => {
      const attr = new DataUriDoerAttr();

      expect(attr.toJSON()).to.deep.equal({
        charset: DataUriDoerAttr.DEFAULT_CHARSET,
        base64: false
      });
    });

    it('should have custom', () => {
      const attr = new DataUriDoerAttr({
        charset: 'UTF-8',
        base64: true
      });

      expect(attr.toJSON()).to.deep.equal({
        charset: 'UTF-8',
        base64: true
      });
    });

    it('should have extended', () => {
      const attr = new DataUriDoerAttr({
        hallo: 'du',
        eumel: true
      });

      expect(attr.toJSON()).to.deep.equal({
        charset: DataUriDoerAttr.DEFAULT_CHARSET,
        base64: false,
        hallo: 'du',
        eumel: true
      });
    });
  });

  describe('isEqual', () => {

    it('should equal same', () => {
      const attr = new DataUriDoerAttr();
      const equal = attr.isEqual(attr);

      expect(equal).to.be.true;
    });

    it('should equal defaults', () => {
      const attr1 = new DataUriDoerAttr();
      const attr2 = new DataUriDoerAttr();
      const equal = attr1.isEqual(attr2);

      expect(equal).to.be.true;
    });

    it('should equal custom', () => {
      const attr1 = new DataUriDoerAttr({
        hallo: 'du',
        eumel: true
      });
      const attr2 = new DataUriDoerAttr({
        hallo: 'du',
        eumel: true
      });
      const equal = attr1.isEqual(attr2);

      expect(equal).to.be.true;
    });

    it('should not equal by value', () => {
      const attr1 = new DataUriDoerAttr({
        hallo: undefined,
        eumel: false
      });
      const attr2 = new DataUriDoerAttr({
        hallo: 'du',
        eumel: true
      });
      const equal = attr1.isEqual(attr2);

      expect(equal).to.be.false;
    });

    it('should not equal by name', () => {
      const attr1 = new DataUriDoerAttr({
        hallo: 'du',
      });
      const attr2 = new DataUriDoerAttr({
        eumel: true
      });
      const equal = attr1.isEqual(attr2);

      expect(equal).to.be.false;
    });

    it('should not equal by count', () => {
      const attr1 = new DataUriDoerAttr();
      const attr2 = new DataUriDoerAttr({
        hallo: 'du'
      });
      const equal = attr1.isEqual(attr2);

      expect(equal).to.be.false;
    });
  });

  describe('clone', () => {

    it('should clone defaults', () => {
      const attr1 = new DataUriDoerAttr();
      const attr2 = attr1.clone();

      expect(attr1).to.deep.equal(attr2);
    });

    it('should clone custom', () => {
      const attr1 = new DataUriDoerAttr({
        hallo: 'du',
        eumel: true
      });
      const attr2 = attr1.clone();

      expect(attr1).to.deep.equal(attr2);
    });
  });
});
