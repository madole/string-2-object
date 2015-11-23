![travis](https://travis-ci.org/madole/string-2-object.svg?branch=master)

## string2Object
A module to parse a string separated by dots into an object.

```
const sto = new StringToObject('foo.bar.bab = "baz"');

sto.getString() // returns a stringified object

sto.getObject() // returns the object

//{ "foo" : { "bar" : { "bab" : "baz" } } }

```
