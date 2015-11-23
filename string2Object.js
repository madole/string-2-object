function validateString(strings) {
    if (strings.length <= 1) {
        throw new Error('must be a valid string');
    }
    strings.forEach((str) => {
        if (!str.length) {
            throw new Error('must be a valid string');
        }
    });
}

class StringToObject {
    constructor(string) {
        if(typeof string !== 'string') {
            throw new TypeError('StringToObject needs a string passed to it');
        }
        this.string = string;
        this.stringifiedObject = this.createObject(string);
    }

    createObject(string) {
        const sides = string.split('.');
        validateString(sides);
        const statement = sides[sides.length - 1].split('=');

        sides.splice(sides.length - 1, 1)

        const trimmedStatement = statement.map(state => state.trim());

        const[left, right] = trimmedStatement;


        const allLeft = [...sides, left];

        let endString = '';

        allLeft.forEach((str, i) => {
            endString += ` { "${str}" :`;
            if (i === allLeft.length - 1) {
              endString += ` ${right}`;
              allLeft.forEach(() => {
              	endString += ' }';
              })
            }
        });

        return endString.trimLeft();

    }

    getString() {
        return this.stringifiedObject;
    }

    getObject() {
        return JSON.parse(this.stringifiedObject);
    }
}

module.exports = StringToObject;
