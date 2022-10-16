import {expect} from "chai";
import {DataUriDoer, DataUriDoerAttr} from "../src";

describe('DataUriDoer', () => {

  describe('constructor', () => {

    it('should have default', () => {
      const dud = new DataUriDoer('data');

      expect(dud.toJSON()).to.deep.equal({
        data: 'data',
        type: DataUriDoer.DEFAULT_TYPE,
        attr: {
          charset: DataUriDoerAttr.DEFAULT_CHARSET,
          base64: false
        }
      });
    });

    it('should have custom', () => {
      const dud = new DataUriDoer('data', 'type', {
        charset: 'UTF-8',
        base64: true,
        hallo: 'du',
        eumel: true
      });

      expect(dud.toJSON()).to.deep.equal({
        data: 'data',
        type: 'type',
        attr: {
          charset: 'UTF-8',
          base64: true,
          hallo: 'du',
          eumel: true
        }
      });
    });
  });

  describe('parse', () => {

    it('should parse string', () => {
      const dud = DataUriDoer.parse('data:type;charset=charset,data');

      expect(dud.toJSON()).to.deep.equal({
        data: 'data',
        type: 'type',
        attr: {
          charset: 'charset',
          base64: false
        }
      });
    });

    it('should parse base64', () => {
      const dud = DataUriDoer.parse('data:type;charset=charset;base64,ZGF0YQ==');

      expect(dud.toJSON()).to.deep.equal({
        data: Buffer.from('data'),
        type: 'type',
        attr: {
          charset: 'charset',
          base64: true
        }
      });
    });

    it('should parse multiple attributes', () => {
      const dud = DataUriDoer.parse('data:type;charset=charset;more=then;one=attribute;here=12;base64,ZGF0YQ==');

      expect(dud.toJSON()).to.deep.equal({
        data: Buffer.from('data'),
        type: 'type',
        attr: {
          charset: 'charset',
          base64: true,
          more: 'then',
          one: 'attribute',
          here: '12'
        }
      });
    });

    it('should parse and fill defaults', () => {
      const dud = DataUriDoer.parse('data:,data');

      expect(dud.toJSON()).to.deep.equal({
        data: 'data',
        type: DataUriDoer.DEFAULT_TYPE,
        attr: {
          charset: DataUriDoerAttr.DEFAULT_CHARSET,
          base64: false
        }
      });
    });

    it('should fail', () => {
      expect(() => DataUriDoer.parse('')).to.throw('Invalid data uri.');
    });
  });

  describe('toString', () => {

    it('should convert to string', () => {
      const dud = new DataUriDoer('data', 'type', {charset: 'charset'});

      expect(dud.toString()).to.equal('data:type;charset=charset,data');
    });

    it('should convert to base64 by attr', () => {
      const dud = new DataUriDoer('data', 'type', {charset: 'charset', base64: true});

      expect(dud.toString()).to.equal('data:type;charset=charset;base64,ZGF0YQ==');
    });

    it('should convert to base64 by data', () => {
      const dud = new DataUriDoer(Buffer.from('data'), 'type', {charset: 'charset'});

      expect(dud.toString()).to.equal('data:type;charset=charset;base64,ZGF0YQ==');
    });

    it('should convert multiple attributes', () => {
      const dud = new DataUriDoer('data', 'type', {
        charset: 'charset',
        base64: true,
        more: 'then',
        one: 'attribute',
        here: 12
      });

      expect(dud.toString()).to.equal('data:type;charset=charset;base64;more=then;one=attribute;here=12,ZGF0YQ==');
    });

    it('should convert and remove defaults', () => {
      const dud = new DataUriDoer('data');

      expect(dud.toString()).to.equal('data:,data');
    });
  });

  describe('isEqual', () => {

    it('should equal same', () => {
      const attr = new DataUriDoer('data');
      const equal = attr.isEqual(attr);

      expect(equal).to.be.true;
    });

    it('should equal defaults', () => {
      const attr1 = new DataUriDoer('data');
      const attr2 = new DataUriDoer('data');
      const equal = attr1.isEqual(attr2);

      expect(equal).to.be.true;
    });

    it('should equal custom', () => {
      const attr1 = new DataUriDoer('data', 'type', {charset: 'UTF-8'});
      const attr2 = new DataUriDoer('data', 'type', {charset: 'UTF-8'});
      const equal = attr1.isEqual(attr2);

      expect(equal).to.be.true;
    });

    it('should not equal by data', () => {
      const attr1 = new DataUriDoer('data1', 'type', {charset: 'UTF-8'});
      const attr2 = new DataUriDoer('data2', 'type', {charset: 'UTF-8'});
      const equal = attr1.isEqual(attr2);

      expect(equal).to.be.false;
    });

    it('should not equal by type', () => {
      const attr1 = new DataUriDoer('data', 'type1', {charset: 'UTF-8'});
      const attr2 = new DataUriDoer('data', 'type2', {charset: 'UTF-8'});
      const equal = attr1.isEqual(attr2);

      expect(equal).to.be.false;
    });

    it('should not equal by attr', () => {
      const attr1 = new DataUriDoer('data', 'type', {charset: 'UTF-8'});
      const attr2 = new DataUriDoer('data', 'type', {charset: 'UTF-16'});
      const equal = attr1.isEqual(attr2);

      expect(equal).to.be.false;
    });
  });

  describe('clone', () => {

    it('should clone', () => {
      const dud1 = new DataUriDoer('data', 'type', {charset: 'charset'});
      const dud2 = dud1.clone();

      expect(dud1).to.deep.equal(dud2);
    });
  });
});
