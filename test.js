const StringToObject = require('./stringToObject');
const { expect, assert } = require('chai');
const isJson = require('is-json');
const _ = require('lodash');

describe('StringToObject', function() {
    describe('constructor', function() {
        let stringToObject;
        beforeEach(function() {
            stringToObject = new StringToObject('foo.bar.baz = "dog"');
        });

        it('should create a stringToObject instance with a stringifiedObject on it', function() {
            expect(stringToObject.stringifiedObject).to.be.ok;
        });

        it('should have a getString function on the instance', function() {
            expect(typeof stringToObject.getString).to.equal('function');
        });

        it('should have a getObject function on the instance', function() {
            expect(typeof stringToObject.getObject).to.equal('function');
        });
    });

    describe('getString', function() {
        it('should return a string in the correct JSON form', function() {
            const sto = new StringToObject('foo.bar = "baz"');
            expect(isJson(sto.getString())).to.be.ok;
        });

        it('should return a string with the correct data', function() {
            const sto = new StringToObject('foo.bar = "baz"');
            expect(sto.getString()).to.equal('{ "foo" : { "bar" : "baz" } }');
        });

        it('should still return valid json even if the object is deeply nested', function() {
            const sto = new StringToObject('foo.bar.baz.baa.bab.bac.bad.bae.baf = "baz"');
            expect(isJson(sto.getString())).to.be.ok;
        });
    });

    describe('getObject', function() {
        it('should return an object', function() {
            const sto = new StringToObject('foo.bar = "baz"');
            expect(typeof sto.getObject()).to.equal('object');
        });
        it('should return an object with the correct keys', function() {
            const sto = new StringToObject('foo.bar.bab = "baz"');
            const obj = sto.getObject();
            const keys = deepKeys(obj);
            expect(keys).to.contain('foo', 'bar', 'bab')

        })
    });

    describe('unhappy path', function() {
      it('should throw an error if a string is not passed to constructor', function() {
          assert.throw(function() {
              new StringToObject();
          }, Error);
      });

      it('shoud throw an error if the string is not valid for parsing', function() {
        assert.throw(function() {
            new StringToObject('this is an invalid string');
        }, Error);
        assert.throw(function() {
            new StringToObject('.....');
        }, Error);
      });
    });
});


function deepKeys(obj) {
    if (typeof obj !== 'object') {
        return [];
    }
    let keys = Object.keys(obj);
    let result = [...keys];

    function getDeepKeys(keys, object) {
        keys.forEach((key) => {
            if (object.hasOwnProperty(key)) {
                const deepObj = object[key];
                const deepKeys = Object.keys(deepObj);
                if(typeof deepObj === 'object') {
                    result = result.concat(deepKeys);
                    return getDeepKeys(deepKeys, deepObj);
                }
            }
        })
    }
    getDeepKeys(keys, obj);
    return result;
}
