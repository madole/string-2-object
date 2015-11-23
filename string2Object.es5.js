'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function validateString(strings) {
    if (strings.length <= 1) {
        throw new Error('must be a valid string');
    }
    strings.forEach(function (str) {
        if (!str.length) {
            throw new Error('must be a valid string');
        }
    });
}

var StringToObject = (function () {
    function StringToObject(string) {
        _classCallCheck(this, StringToObject);

        if (typeof string !== 'string') {
            throw new TypeError('StringToObject needs a string passed to it');
        }
        this.string = string;
        this.stringifiedObject = this.createObject(string);
    }

    _createClass(StringToObject, [{
        key: 'createObject',
        value: function createObject(string) {
            var sides = string.split('.');
            validateString(sides);
            var statement = sides[sides.length - 1].split('=');

            sides.splice(sides.length - 1, 1);

            var trimmedStatement = statement.map(function (state) {
                return state.trim();
            });

            var _trimmedStatement = _slicedToArray(trimmedStatement, 2);

            var left = _trimmedStatement[0];
            var right = _trimmedStatement[1];

            var allLeft = [].concat(_toConsumableArray(sides), [left]);

            var endString = '';

            allLeft.forEach(function (str, i) {
                endString += ' { "' + str + '" :';
                if (i === allLeft.length - 1) {
                    endString += ' ' + right;
                    allLeft.forEach(function () {
                        endString += ' }';
                    });
                }
            });

            return endString.trimLeft();
        }
    }, {
        key: 'getString',
        value: function getString() {
            return this.stringifiedObject;
        }
    }, {
        key: 'getObject',
        value: function getObject() {
            return JSON.parse(this.stringifiedObject);
        }
    }]);

    return StringToObject;
})();

module.exports = StringToObject;
