
var tv4 = require("tv4");

module.exports = function(schema) {
  return {
    validate: function(data, callback) {
      var valid = tv4.validate(data, schema);
      if(valid) {
        return callback(null, data);
      }
      return callback(new Error(tv4.error.message));
    }
  }
}
