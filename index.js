// super magical 8ball function. pass it 1-3 params and never shall it probably most not lie

var ithas = function() {}
var _     = require('lodash')

// TODO: make these not globally scoped
var itHasDataCallCount = 0
var itHasKeyCallCount  = 0

// ithas.value has been repalced by new lodash function _.get. Just keeping it in
// here for backward compatibility of people already using ithas module
ithas.value = function(obj, str, val) {
  return _.get(obj, str) === val
}

//ithas.data has been cleaned up
ithas.data = function(obj, str) {

  // faster shallower check
  const IsData = item => !(_.isUndefined(item) || _.isNull(item) || _.isNaN(item) || item === "")

  // SAVE AS A FUTURE OPTION FOR A FOR A DEEPER BUT SLOWER CHECK - that's what said
  // const IsData = item => !(_.isUndefined(item) || _.isNull(item) || _.isNaN(item) || item === "" || IsObjThatHasNoData(item)) 

  const IsObjThatHasNoData = item => _.isArray(item) || _.isObject(item) ? !_.some(_.values(item), IsData) : false

  const IsObjThatHasData = item => _.isObject(item) || _.isArray(item) ? _.some(item, IsData) : false

  // a warning to help us keep our event loop lowfat
  // if (++itHasDataCallCount % 10000 === 0 && DEV) console.warn('woah lots of ithas.data calls', itHasDataCallCount)

  // 1 param check
  if (arguments.length === 1) {
    var arg = arguments[0]
    if (IsObjThatHasData(arg)) return true
    if (IsObjThatHasNoData(arg)) return false
    if (_.isNumber(arg)) return !_.isNaN(arg)
    if (_.isBoolean(arg)) return true
    return _.size(arg) ? true : false // handles null, undefined, and empty string
  // 2 param check
  } else if (arguments.length === 2) {
    if (!_.isObject(arguments[0]) && !_.isString(arguments[1])) return false

    // i thought these mattered but tests pass when commented out... and our boxes are still standing... *shrug*
    // if (HasValue(obj, str, undefined)) return false
    // if (HasValue(obj, str, null)) return false
    // if (HasValue(obj, str, '')) return false

    if (ithas.key(obj, str)) {
      // building the str as dot notation into an Object
      var keys = str.split('.')
      // stitch the str of children keys to the parent obj:
      var key = keys.shift()
      // start at 1st node and walk...
      var node = obj[ key ]
      // use this while loop to get to the final node (in dot notation)
      while (key = keys.shift()) node = node[ key ]
      return ithas.data(node)
    }
    return false
  }
}// has.data

//ithas.key has not yet been cleaned up but the shit works... 
ithas.key = function(obj, str) {
  // if (++itHasKeyCallCount % 10000 === 0 && DEV) console.warn('woah lots of ithas.key calls', itHasKeyCallCount)
  var keys, key;

  // return false if obj is either null or undefined
  if (obj === null) return false

  if (!str || !str.length || Object.prototype.toString.call(str) !== "[object String]") {
      return false;
  }

  //if parent object does not exist and we aren't trying to create
  if (!obj || obj !== Object(obj)) {
      return false;
  }

  // if obj is not an oject return false
  if (!_.isObject(obj)) return false 

  // walk the object
  keys = str.split(".");
  var walk = "object";
  while (keys.length)
  {
    key = keys.shift();
    walk += "." + key;

    //if it's not an object, make it one
    //if obj doesn't contain the key, add it and set it to an empty object
    if (!obj || !key || obj[key] === undefined) {
      return false
    } else if (typeof obj[key] === "undefined") {
      return false
    } else if (!(key in obj)) {
      console.error("[HasKey] This " + walk + " is null")
     return false
    } else if (key in obj && !keys.length) {
      //console.log("Sucessfully walked",walk);
      return true
    }

    obj = obj[key]
  }
  return false;
}//ithas.key

module.exports = ithas
