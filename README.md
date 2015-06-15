# ht-tv4

This library lets you use JSON schemas with hudson-taylor.

*Requires HT >6.0.0*

## Example

```js

var httv4 = require('ht-tv4');

// setup your ht service and stuff here

var schema = httv4({
  "items": {
    "type": "boolean"
  }
});

service.on("echo", schema, function(data, callback) {
  return callback(null, data);
});

```

## License

MIT
