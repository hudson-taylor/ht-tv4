
var assert = require('assert');
var ht     = require('hudson-taylor');

var httv4 = require('../lib');

describe("HT tv4", function() {

  var service, client;

  before(function() {

    var transport = new ht.Transports.Local();

    service = new ht.Service(transport);

    var schema = httv4({
      "items": {
        "type": "boolean"
      }
    });

    service.on("arr", schema, function(data, callback) {
      return callback(null, data);
    });

    client = new ht.Client({
      s1: transport
    });

  });

  it("should wrap schemas", function(done) {

    client.call("s1", "arr", [
      true,
      false,
      true,
      false
    ], function(err, data) {
      assert.ifError(err);
      assert.equal(data[0], true);
      assert.equal(data[3], false);
      done();
    });

  });

  it("should properly return errors", function(done) {

    client.call("s1", "arr", [
      true,
      "one",
      5,
      {}
    ], function(err) {
      assert.equal(err.$htValidationError, true);
      assert.equal(err.error, 'Invalid type: string (expected boolean)');
      done();
    });

  });

  describe("document", function() {

    it("should return JSON when fn is called", function() {

      var schema = {
        items: {
          type: "string"
        }
      }

      var validator = httv4(schema);

      assert.deepEqual(validator.document(), schema);

    });

  });

  describe("generate", function() {

    it("should return a validator", function(done) {

      var schema = {
        items: {
          type: "string"
        }
      }

      var validator = httv4.generate(schema);

      validator.validate({
        items: "blah"
      }, function(err, data) {
        assert.ifError(err);
        assert.deepEqual(data, {
          items: "blah"
        });
        done();
      });

    });

  });

});
