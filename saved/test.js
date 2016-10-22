
'use strict'

var _ = require('underscore')

// truthy conditional and foundation of others
_.cond = function(condition, trueValue, falseValue){
  return condition ? trueValue : falseValue
}


// these functions get a corresponding condFunction
var langMethods = ['isUndefined', 'isNull']

_.each(langMethods, function(langMethod){

  _['cond' + langMethod.slice(2)] = function(conditionValue, trueValue, falseValue){
    return _.cond(_[langMethod].call(null, conditionValue), trueValue, falseValue)
  }

})


// basic truthy
// _.cond( condition, ifTrueValue, ifFalseValue )

// all following have a generated matching lodash predicate "Lang" method

// _.condUndefined(value, trueValue, falseValue)
// _.condNull(value, trueValue, falseValue)
// _.condNaN(value, trueValue, falseValue)


// example of use
function MyConstructor(x,y){
  this.x = _.condUndefined(x, 0, x)
  this.y = _.condUndefined(y, 0, x)
}

var obj = new MyConstructor(1,2)
console.log(obj)



