var ithas = require(`../index.js`)

// libs for testing
var _              = require('lodash')
var colors         = require('colors')
var chai           = require("chai")
var chaiAsPromised = require("chai-as-promised")
var chaiThings     = require("chai-things")
var should         = require('should')

// more assertions than you can stick a shake at
chai.should()
chai.use(chaiAsPromised)
chai.use(chaiThings)

// makes purdy colored evaluators
var is = {}
Object.defineProperty(is, 'true',  { value: ' == ' + 'true'.green })
Object.defineProperty(is, 'false', { value: ' == ' + 'false'.red  })

describe('ithas.value... not much to test since just a lodash stub now...', () => {
  var obj1 = {key:1}
  var prettyObj1 = JSON.stringify(obj1)
  var obj2 = {key1:1, key2: undefined}
  var prettyObj2 = JSON.stringify(obj2)
  var obj3 = {key:true}
  var prettyObj3 = JSON.stringify(obj3)
  it(`ithas.value(${prettyObj1}, 'key', 1)` + is.true, function () { ithas.value(obj1, 'key', 1).should.be.true })
  it(`ithas.value(${prettyObj1}, 'key', 0)` + is.false, function () { ithas.value(obj1, 'key', 0).should.be.false })
  it(`ithas.value(${prettyObj1}, 'key', undefined)` + is.false, function () { ithas.value(obj1, 'key', undefined).should.be.false })
  it(`ithas.value(${prettyObj1}, 'key', null)` + is.false, function () { ithas.value(obj1, 'key', null).should.be.false })
  it(`ithas.value(${prettyObj1}, 'key', true)` + is.false, function () { ithas.value(obj1, 'key', true).should.be.false })
  it(`ithas.value(${prettyObj1}, 'key', false)` + is.false, function () { ithas.value(obj1, 'key', true).should.be.false })
  it(`ithas.value(${prettyObj2}, 'key2', undefined)` + is.true, function () { ithas.value(obj2, 'key2', undefined).should.be.true })
  it(`ithas.value(${prettyObj2}, 'key2', null)` + is.true, function () { ithas.value(obj2, 'key2', undefined).should.be.true })
  it(`ithas.value(${prettyObj3}, 'key', true)` + is.true, function () { ithas.value(obj3, 'key', true).should.be.true })
  it(`ithas.value(${prettyObj3}, 'key', 1)` + is.false, function () { ithas.value(obj3, 'key', 1).should.be.false })
  it(`ithas.value(${prettyObj3}, 'key', false)` + is.false, function () { ithas.value(obj3, 'key', false).should.be.false })
})//ithas.value

describe('ithas.data', () => {
  describe('1 param passed of any type', () =>  { 
    describe('null || undefined', function () { 
      it('ithas.data(null)' + is.false, function () { ithas.data(null).should.be.false })
      it('ithas.data(undefined)' + is.false, function () { ithas.data(undefined).should.be.false })
    })

    describe('number', function () { 
      it('ithas.data(1)' + is.true, function () { ithas.data(1).should.be.true })
      it('ithas.data(0)' + is.true, function () { ithas.data(0).should.be.true })
      it('ithas.data(NaN)' + is.false, function () { ithas.data(NaN).should.be.false })
    })

    describe('boolean', function () { 
      it('ithas.data(true)' + is.true, function () { ithas.data(true).should.be.true })
      it('ithas.data(false)' + is.true, function () { ithas.data(true).should.be.true })
    })

    describe('string', function () { 
      it('ithas.data("string")' + is.true, function () { ithas.data("string").should.be.true })
      it('ithas.data("")' + is.false, function () { ithas.data("").should.be.false })
    })

    describe('array', function () { 
      it('ithas.data([0])' + is.true, function () { ithas.data([0]).should.be.true })
      it('ithas.data([1])' + is.true, function () { ithas.data([1]).should.be.true })
      it('ithas.data(["0"])' + is.true, function () { ithas.data(["0"]).should.be.true })
      it('ithas.data(["1"])' + is.true, function () { ithas.data(["1"]).should.be.true })
      it('ithas.data(["string"])' + is.true, function () { ithas.data(["string"]).should.be.true })
      it('ithas.data([true])' + is.true, function () { ithas.data([true]).should.be.true })
      it('ithas.data([false])' + is.true, function () { ithas.data([false]).should.be.true })

      it('ithas.data([null])' + is.false, function () { ithas.data([null]).should.be.false })
      it('ithas.data([undefined])' + is.false, function () { ithas.data([undefined]).should.be.false })
      it('ithas.data([NaN])' + is.false, function () { ithas.data([NaN]).should.be.false })
      it('ithas.data([])' + is.false, function () { ithas.data([]).should.be.false })
      it('ithas.data([""])' + is.false, function () { ithas.data([""]).should.be.false })

      // this test will only pass if we enable deep (ie slower) evaluation in ithas.data
      // it('ithas.data([{}])' + is.false, function () { ithas.data([{}]).should.be.false })

      it('ithas.data([null, undefined])' + is.false, function () { ithas.data([null, undefined]).should.be.false })
      it('ithas.data([null, undefined, NaN])' + is.false, function () { ithas.data([null, undefined, NaN]).should.be.false })

      it('ithas.data([null, 0])'  + is.true, function () { ithas.data([null, 1]).should.be.true })
      it('ithas.data([null, undefined, 0])' + is.true, function () { ithas.data([null, undefined, 0]).should.be.true })
      it('ithas.data([null, undefined, NaN, 0])' + is.true, function () { ithas.data([null, undefined, NaN, 0]).should.be.true })
    })

    describe('object', function () { 
      it('ithas.data({key:1})' + is.true, function () { ithas.data({key:1}).should.be.true })
      it('ithas.data({"key":1})' + is.true, function () { ithas.data({"key":1}).should.be.true })
      it('ithas.data({objectLiteralPropertyValueShorthand})' + is.true, function () { 
        var objectLiteralPropertyValueShorthand = 1
        var obj = {objectLiteralPropertyValueShorthand}
        ithas.data({obj}).should.be.true 
      })
      it('ithas.data({"key":null})' + is.false, function () { ithas.data({"key":null}).should.be.false })
      it('ithas.data({"key":undefined})' + is.false, function () { ithas.data({"key":undefined}).should.be.false })
      it('ithas.data({"key":NaN})' + is.false, function () { ithas.data({"key":NaN}).should.be.false })
      it('ithas.data({"key":""})' + is.false, function () { ithas.data({"key":""}).should.be.false })

      // this test will only pass if we enable deep (ie slower) evaluation in ithas.data
      // it('ithas.data({"key":[]})' + is.false, function () { ithas.data({"key":[]}).should.be.false })

      it('ithas.data({})' + is.false, function () { ithas.data({}).should.be.false })
    })
  }) // describe('Single param passed (just obj no str)'

  describe('2 params passed where param1 == obj && param2 == str of dot notation keys', function () { 
    it("ithas.data({key:'value'}, 'key')" + is.true, function () { ithas.data({key:'value'}, 'key').should.be.true })
    it(`ithas.data({key:'value'}, 'missingKey')${is.false}`, function () { ithas.data({key:'value'}, 'missingKey').should.be.false })
    it("ithas.data({key:{nestedKey:'value'}}, 'key.nestedKey')" + is.true, function () { ithas.data({key:{nestedKey:'value'}}, 'key.nestedKey').should.be.true })
    it("ithas.data({key:{nestedKey:'value'}}, 'nestedKey')" + is.false, function () { ithas.data({key:{nestedKey:'value'}}, 'nestedKey').should.be.false })
    it("ithas.data({key:{nestedKey:undefined}}, 'key.nestedKey')" + is.false, function () { ithas.data({key:{nestedKey:undefined}}, 'nestedKey').should.be.false })
    it("ithas.data({key:{nestedKey:null}}, 'key.nestedKey')" + is.false, function () { ithas.data({key:{nestedKey:null}}, 'nestedKey').should.be.false })
    it("ithas.data({key:{nestedKey:NaN}}, 'key.nestedKey')" + is.false, function () { ithas.data({key:{nestedKey:NaN}}, 'nestedKey').should.be.false })
    it("ithas.data({key:[]}, 'key')" + is.false, function () { ithas.data({key:[]}, 'key').should.be.false })
    it("ithas.data({key:[0]}, 'key')" + is.true, function () { ithas.data({key:[0]}, 'key').should.be.true })
    it("ithas.data({key:[1]}, 'key')" + is.true, function () { ithas.data({key:[1]}, 'key').should.be.true })
    it("ithas.data({key:[undefined]}, 'key')" + is.false, function () { ithas.data({key:[undefined]}, 'key').should.be.false })
    it("ithas.data({key:{nestedKey:undefined}}, 'key.nestedKey')" + is.false, function () { ithas.data({key:{nestedKey:undefined}}, 'nestedKey').should.be.false })
    it('end timer', function (done) {
      done()
    })
  })//describe('2 params passed...
})//ithas.data

describe('ithas.key', () => {
  describe('a really shitty stubby ass list of unit tests. Add more cases as neeedd', function () { 
    it(`ithas.key({key:1}, 'key')` + is.true, function () { ithas.key({key:1}, 'key').should.be.true })
    it(`ithas.key({key:1}, 'missingKey')` + is.true, function () { ithas.key({key:1}, 'missingKey').should.be.false })
  })
})//ithas.key

