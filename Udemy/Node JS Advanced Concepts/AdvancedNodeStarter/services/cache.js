const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');
const keys = require('../config/keys');

const client = redis.createClient(keys.redisUrl);
client.hget = util.promisify(client.hget);
// referencujeme puvodni exec funkci
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || '');

  return this;
};

// chceme function aby jsme mohli pristupovat ke mongoose.Query (this) arrow function na tom to nedovoli
mongoose.Query.prototype.exec = async function() {
  if (!this.useCache) {
    // arguments jsou argumenty ktere jsou passnute do exec(...args) - mongoose.Query.prototype.exec
    return exec.apply(this, arguments);
  }

  // this.getQuery() nam vrati query objekt - krome query potrebujeme take collection
  // query: { _id: 123456789 }
  // collection: users
  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name
    })
  );

  // See if we have a value for 'key' in redis
  const cacheValue = await client.hget(this.hashKey, key);

  // If we do, return that
  if (cacheValue) {
    // musime vraptit mongoose model
    const doc = JSON.parse(cacheValue);

    return Array.isArray(doc)
      ? doc.map(d => new this.model(d))
      : new this.model(doc);
  }

  // Otherwise, issue the query and store the result in redis
  // pokud neposkytneme callback do exec tak se defautne vraci promise
  const result = await exec.apply(this, arguments);

  client.hset(this.hashKey, key, JSON.stringify(result), 'EX', 10);

  return result;
};

module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  }
};
