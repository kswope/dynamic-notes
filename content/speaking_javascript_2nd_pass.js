/*
<!--
// emit
'use strict'

function log(...args){
  console.log(...args)
}

// /emit
-->
*/

/* 

<div class='header'>
 <span>Named blocks</span> 
</div>

*/

leBlock: {

  let x = 1
  for (;;) {
    log("outer loop")
    for (;;) {
      log("inner loop")
      break leBlock
    }
  }

}

//=> outer loop
//=> inner loop

/* 

<div class='header'>
 <span>JavaScript has only six types</span> 
</div>

<ul>
  <li>Undefined, Null</li> 
  <li>Boolean, String, Number</li> 
  <li>Object</li> 
</ul>

<p>
Therefore, constructors technically don’t introduce new types, even though
they are said to have instances.
</p>

<div class='header'>
 <span>Primitive Values</span> 
</div>
<ul>
<li>Compared by value: the content is compared</li>
<li>Always immutable: properties can't be changed, added, or removed</li>
</ul>

<div class='header'>
 <span>Object Values</span> 
</div>
<ul>
<li>All non-primitive values are objects </li>
<li>Types</li>
<ul>
<li>Plain Objects</li>
<li>Arrays</li>
<li>Regular Expressions</li>
</ul>
<li>Compared by reference</li>
<li>Mutable by default</li>
</ul>


<div class='header'>
 <span>False</span> 
</div>
<ul>
<li>undefined and null</li>
<li>0</li>
<li>NaN</li>
<li>''</li>
</ul>

<div class='header'>
 <span>Primitives Borrow Their Methods from Wrappers</span> 
 <ul>
<li>In strict mode, methods from the wrapper prototype are used transparently</li>
 </ul>
</div>
*/

"abc".charAt === String.prototype.charAt //=> true

String.prototype.hello = () => log("hello")
"abc".hello() //=> hello

/*
<blockquote>
Technically, primitive values do not have their own properties, they borrow
them from wrapper constructors. But that is something that goes on behind the
scenes, so you don’t normally see it.
</blockquote>
*/

/*
<blockquote>
the + operator examines its operands. If one of them is a string, the other is
also converted to a string and both are concatenated, Otherwise, both operands
are converted to numbers (see Converting to Number) and added:
</blockquote>
*/

"foo" + 3 //=> 'foo3'
3 + true //=> 4

/*
<blockquote>
The typeof operator distinguishes primitives from objects and determines the
types of primitives.
</blockquote>

<blockquote>
The instanceof operator determines whether an object is an instance of a given
constructor.
</blockquote>
*/

/*
<div class='header'>
 <span>Typeof bug</span> 
</div>
*/

typeof null //=> 'object'

/*
<div class='header'>
 <span>NaN is the only value that is not equal to itself</span> 
</div>
*/

NaN === NaN //=> false

/*
<div class='header'>
 <span>Newer engines optimize string concatenation via + and use a similar
 method internally. Therefore, the plus operator is faster on those
 engines</span> 
</div>
*/

/*
<div class='header'>
 <span>substring() should be avoided in favor of slice(), which is similar, but
 can handle negative positions and is implemented more consistently across
 browsers.</span> 
</div>
*/

/*
<div class='header'>
 <span>Extract a length of string from a string</span> 
</div>
<ul>
<li>str.substr( beginIndex [, length] ) takes optionsl <b>string length</b></li>
<li>str.slice( beginIndex [, endIndex] ) takes optional <b>end index</b></li>
<li>Extract single character with str[0] or str.charAt(0)</li>
<li>str.split( [separator [, limit] ])</li>
<ul>
<li>If separator is undefined split returns entire string (seems useless)</li>
<li>If separater is '' returns array of every character.</li>
<li>Can be a regex</li>
<li>If regex has groups the matches are included, shown below</li>
</ul>
</ul>
*/

// if multiple separators, we can preserve them to reconstruct string
let strA = "a,b.c|d,e.f|"
let a = strA.split(/([,.\|])/)
log(a) //=> [ 'a', ',', 'b', '.', 'c', '|', 'd', ',', 'e', '.', 'f', '|', '' ]

let strB = a.join("")
log(strB) //=> 'a,b.c|d,e.f|'

log(strA === strB) //=> true

/*
<div class='header'>
 <span>Transforming a string, all non-destructive</span> 
</div>
<ul>
<li>' abc'.trim() removes whitespace from beginning and end.</li>
<li>str.toLowerCase()</li>
<li>str.toUpperCase()</li>
<li>str.concat(str [, str2 [, str3]])</li>
<ul>
<li>'abc'.concat() results in 'abcundefined' if x is undefined, so make sure
its initiated with x='' </li>
</ul>
</ul>
*/

/*
<div class='header'>
 <span>Search and Compare</span> 
</div>
<ul>
<li>str.indexOf(searchStr, position=0)</li>
<ul>
<li>Returns position if found, -1 if nothing found.</li>
<li>searchStr <b>cannot</b> a regex</li>
<li>case sensitive</li>
<li>/b/.test(str) is better than str.indexOf('b') >=0 </li>
</ul>
<li>str.search(regex)</li>
<ul>
<li>Like indexOf returns position of first match or -1</li>
<li>Will convert string parameter to regex</li>
<li>Unlike indexOf doesn't take an position</li>
</ul>
</ul>
*/

// does 'b' exist in str?
// sucks
log("abc".indexOf("b") >= 0) //=> true
// better
log(/b/.test("abc")) //=> true

log("abc".search(/b/)) //=> 1
log("abc".search("b")) //=> 1
log("abc".search(/B/)) //=> -1

/*
<div class='header'>
 <span>Test, Match and Replace with Regex</span> 
</div>
<ul>
<li>str.match(regex)</li>
<ul>
<li>Like str.search() takes or converts regex argument</li>
<li>Capture groups or return all matching substrings</li>
<li>Returns match group if <b>no</b> /g flag</li>
<li>Returns array of all matches if /g set</li>
</ul>
<li>str.replace(regexp|substr, newSubstr|function)
</li>
<ul>
<li>If first argument is a string it is NOT interpreted as a regex, unlike
match() and search()</li>
<li>Unless first argument is a regex/g it will only replace first match</li>
<li>The replacement function parameters are complicated, but the first position
is the match value</li>
<li>The replacement string can contain patters starting with $</li>
<ul>
<li>$$ inserts a $</li>
<li>$& inserts the matched substring</li>
<li>$` Inserts the portion of the string that precedes the matched substring.</li>
<li>$' Inserts the portion of the string that follows the matched substring.</li>
<li>$n Where n is a positive integer less than 100, inserts the nth
parenthesized submatch string, provided the first argument was a RegExp object.
Note that this is 1-indexed.</li>
</ul>
</ul>
</ul>
*/

log("abc".match(/B/)) //=> null
log("abc".match(/b/)) //=> [ 'b', index: 1, input: 'abc' ]
log("abc".match("b")) //=> [ 'b', index: 1, input: 'abc' ]
log("abc".match(/b/g)) //=> [ 'b' ]
log("abcbc".match(/b/g)) //=> [ 'b', 'b' ]

log("abc".replace("a", "A")) //=> Abc
log("abc".replace(/a/, "A")) //=> Abc
log("abcabc".replace(/a/, "A")) //=> Abcabc
log("abcabc".replace(/a/g, "A")) //=> AbcAbc

"abc".replace(/a/, x => log(`found ${x}`)) //=> found a
"abc".replace(/(a)/, (x, p1, offset, whole) => {
  log(`found ${x} ${p1} ${offset} ${whole}`)
}) //=> found a a 0 abc

/*
<div class='header'>
 <span>JS has a do-while loop, that I keep forgetting about.</span> 
</div>
*/

let i = 0,
  a = []
do {
  a.push(i++)
} while (i < 10)
log(a) //=> [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

/*
<div class='header'>
 <span>Best practice: don’t use for-in for arrays and be careful with objects</span> 
</div>
<ul>
<li>iterates over indices not values, so we just get 0,1,2,3,4... </li>
<li>iteration includes properties added to array</li>
<li>use [].forEach instead of for-in for arrays</li>
<li>iterates over all enumerable properties, including inherited ones</li>
</ul>
*/

/*
<div class='header'>
 <span>switch statement</span> 
</div>
<ul>
<li>evaluates expression and jumps to matching cases, finding it using ===</li>
<li>case can be an expression</li>
<li>cases are fall through, so you need to break</li>
<li>Use fallthrough to combine multple cases </li>
</ul>
*/

// case value can be any evaluated expression
switch ("red") {
  case "blue":
    log("color is blue")
    break
  case ["r", "e", "d"].join(""):
    log("color is red")
    break
  default:
    log("not found")
} //=> color is red

// use fallthrough for multiple conditions
switch ("red") {
  case "red":
  case "white":
  case "blue":
    log("color is american")
    break
  default:
    log("unamerican")
} //=> color is american

// use instead of confusing if else if else chains

let x = 10000
switch (true) {
  case x < 10:
    log("small number")
    break
  case x < 100:
    log("sizable number")
    break
  case x < 1000:
    log("big number")
    break
  default:
    log("huge number")
}

/*
<div class='header'>
 <span>Don't throw just anything</span> 
</div>
<p>
JavaScript has special constructors for exception objects . Use those or
subclass them. Their advantage is that JavaScript automatically adds a stack
trace (on most engines) and that they have room for additional context-specific
properties. The simplest solution is to use the built-in constructor Error():
</p>
<p>
When Error is used like a function -- without new, it will return an Error
object. Therefore, a mere call to Error will produce the same output that
constructing an Error object via the new keyword would.
</p>
<p>
  Optional finally clause, it is always called, even if try has a return statement.
  Can be used for function cleanup.
</p>
*/

try {
  throw Error("help") // <!new Error>
} catch (e) {
  log("caught ", e.stack)
} finally {
  log("always")
}

/*
<div class='header'>
 <span>If you don't return anything from a function undefined is returned</span> 
</div>
*/

/*
<div class='header'>
 <span>
 new is another way to call any function, but not always appriopriate
 </span> 
</div>
*/

/*
<div class='header'>
 <span>
  Functional expressions can be named 
  </span> 
</div>
<ul>
<li>But the name can only be accessed within the function itself</li>
<li>Not sure if f.name property is reliably supported in this situation.</li>
</ul>
*/

let f = function me() {
  console.log(me)
}

f() //=> [Function: me]
console.log(me) //=x ReferenceError: me is not defined
console.log(f.name) //=> f

/*
<div class='header'>
 <span>
  Way to write iffys that doesn't confuse prettier
  </span> 
</div>
*/

!!(function() {
  console.log("hi")
})() //=> hi

/*
<div class='header'>
 <span>
   delete deletes a property from an object
  </span> 
  <ul>
    <li>
      delete affects only the direct (“own,” noninherited) properties of an
      object. Its prototypes are not touched
    </li>
    <li>
      Use the delete operator sparingly. Most modern JavaScript engines
      optimize the performance of instances created by constructors if their
      “shape” doesn’t change (roughly: no properties are removed or added).
      Deleting a property prevents that optimization.
    </li>
  </ul>
</div>
*/

let o = {a: 1}
delete o.a
log(o) //=> {}

/*
<div class='header'>
 <span>
   Avoid the object constructor; an empty object literal is almost always a better choice
  </span> 
</div>
*/

var obj = new Object() // AVOID <!new>
var obj = {} // prefer

/*
<div class='header'>
 <span>
   When you call a function, <strong>this</strong> is always an (implicit) parameter:
  </span> 
</div>
*/

/*
<div class='header'>
 <span>
    Function.prototype.call calls a function. <br />
    Function.prototype.bind returns a new function. <br />
    Function.prototype.apply is now obsolete.
  </span> 
</div>
*/

/*
<div class='header'>
 <span>
   Fancy term for Function.prototype.bind is <i>partial function application</i>
  </span> 
</div>
*/

/*
<div class='header'>
 <span>
  Proper way to extract a method.
  </span> 
</div>
*/

let o = {
  x: 1,
  add: function(x) {
    return x + 1
  }
}

let a1 = o.add.bind(o)

log(a1(3)) //=> 4

/*
<div class='header'>
 <span>
    arr.forEach(f(), this) takes an optional this argument 
  </span> 
</div>
*/

/*
<div class='header'>
 <span>
  Toolkit for inheritance 
</span> 
<ul>
  <li>Object.create(proto [, propDescObj]</li>
  <li>Object.getPrototypeOf(jane)</li>
</ul>
</div>
*/

/*
<div class='header'>
 <span>
 Use Object.keys(o) to get own properties of and object.
</span> 
</div>
*/

/*
<div class='header'>
 <span>
  use "prop in o" to find if o has a property (looks at prototypes too)
</span> 
</div>
*/

/*
<div class='header'>
 <span>
 Avoid invoking hasOwnProperty() directly on an object, as it may be overridden
 (e.g., by an own property whose key is hasOwnProperty):
</span> 
<ul>
<li>Object.prototype.hasOwnProperty.call(obj, 'foo')</li>
<li>{}.hasOwnProperty.call(obj, 'foo')</li>
</ul>
</div>
*/

/*
<div class='header'>
 <span>
 The instanceof operator allows us to check whether an object is an instance of
 a given constructor:
</span> 
</div>
*/

/*
<div class='header'>
 <span>
 Avoid replacing a constructors prototype because its already set up correctly,
 like the constructor property.
</span> 
</div>
*/

// Avoid:
C.prototype = {
  method1: function() {}
}

// Prefer:
C.prototype.method1 = function() {}

/*
<div class='header'>
 <span>
 If you completely replace prototype then reset the constructor property.
</span> 
</div>
*/

C.prototype = {
  constructor: C,
  method1: function() {}
}

/*
<div class='header'>
 <span>
 Crockford privacy pattern
</span> 
</div>
*/

function Constructor() {

  let data = [] // private

  this.fun = function() {
    data // access to private data
  }

}

/*
<div class='header'>
 <span>
  Singleton Constructor
</span> 
</div>
*/

function Singleton() {

  // relies on function properties
  if (Singleton.inst) {
    return Singleton.inst
  } else {
    Singleton.inst = this
  }

  this.random = Math.random()

}

// Another singleton pattern, but without constructor
let o = function() {
  let instance
  return {
    getInstance: function() {
      if (!instance) {
        instance = {n: Math.random()}
      }
      return instance
    }
  }
}

let o2 = o()
log(o2.getInstance())

/*
<div class='header'>
 <span>
 Revealing module pattern
</span> 
</div>
*/

let o = function() {
  function f() {}
  return {f}
}

/*
<div class='header'>
 <span>
  Objects that are "array like", implement indexing and a length property, can
  use many Array methods, but not all. 
</span> 
<ul>
<li>concat</li>
<li>every</li>
<li>filter</li>
<li>forEach</li>
<li>indexOf</li>
<li>join</li>
<li>lastIndexOf</li>
<li>map</li>
<li>pop</li>
<li>push</li>
<li>reduce</li>
<li>reduceRight</li>
<li>reverse</li>
<li>shift</li>
<li>slice</li>
<li>some</li>
<li>sort</li>
<li>splice</li>
<li>toLocaleString</li>
<li>toString</li>
<li>unshift</li>
</ul>
</div>
*/

let o = {
  length: 3,
  0: "a",
  1: "b",
  2: "c"
}

let v = Array.prototype.map.call(o, x => x)
log(v) //=> [ 'a', 'b', 'c' ]

/*
<div class='header'>
 <span>
 The dict Pattern: Objects Without Prototypes Are Better Maps
</span> 
</div>
*/

var dict = Object.create(null)

/*
<div class='header'>
 <span>
   Do not delete elements of arrays because it creates holes, use splice
   instead.
</span> 
</div>
*/

a = [1, 2, 3][(1, 2, 3)]
delete a[1] //=x bad!
a //=> [ 1, <1 empty item>, 3 ]

/*
<div class='header'>
 <span>
 Test for array with Array.isArray
</span> 
</div>
*/

log(Array.isArray([])) //=> true

/*
<div class='header'>
 <span>
  Array.prototype.push takes multiple arguments
</span> 
<p>
Array.prototype.concat is another option, but it is not destructive.
</p>
</div>
*/

let a = []
a.push(1, 2, 3)
log(a) //=> [ 1, 2, 3 ]

a.push(...[4, 5, 6])
log(a) //=> [ 1, 2, 3, 4, 5, 6 ]

a = a.concat([7, 8, 9])
log(a) //=> [ 1, 2, 3, 4, 5, 6 ]

/*
<div class='header'>
 <span>
  Array.prototype.splice( start [, deleteCount [, element1 [, element2] ] ] )
</span> 
<p>
  start can be negative, which counts from the end.
</p>
<p>
  deleteCount is optional, if missing splice deletes all elements after start
</p>
<p>
  inserts the optional elements
</p>
</div>
*/

/*
<div class='header'>
 <span>
  Array.prototype.concat(arr1 [, arr2])
</span> 
<ul>
<li>Non destructive</li>
<li>Takes multiple arguments</li>
<li>Arguments can be arrays or elements, will automatically splat arrays</li>
<li>With no arguments creates a shallow copy.</li>
</ul>
</div>
*/

/*
<div class='header'>
 <span>
  indexOf(search [, start]) exists for both arrays and strings
</span> 
<ul>
<li>
Same with lastIndexOf
</li>
<li>
=== is used
</li>
</ul>
</div>
*/

/*
<div class='header'>
 <span>
  Iteration examination methods
</span> 
<ul>
<li>foreach(callback [, thisValue])</li>
<ul>
<li>Does not support break</li>
<li>To break use some() instead and return true to break and ignore returned true</li>
</ul>
<li>every(callback [, thisValue])</li>
<ul>
<li>returns true if callback returns true for every element</li>
<li>returns true if array is empty</li>
</ul>
<li>some(callback [, thisValue])</li>
<ul>
<li>returns true if callback returns true for at least one element</li>
<li>returns false if array is empty</li>
</ul>
</ul>
<p>
function callback(element, index, array)
</p>
</div>
*/

/*
<div class='header'>
 <span>
  Iteration transformation methods
</span> 
<ul>
<li>map(callback [, thisValue])</li>
<li>filter(callback [, thisValue])</li>
</ul>
<p>
function callback(element, index, array)
</p>
</div>
*/

/*
<div class='header'>
 <span>
  Reduction methods
</span> 
<ul>
<li>reduce(callback [, initialValue])</li>
<li>reduceRight(callback [, initialValue])</li>
</ul>
<p>
function callback(previousValue, element, index, array)
</p>
</div>
*/

/*
<div class='header'>
 <span>
  profile with console.time([name]) and console.endTime([name])
</span> 
</div>
*/

// emit
console.time("a")
for (let i = 0; i < 1000; i++) {}
console.timeEnd("a") //=> a: 0.305ms
// /emit

/*
<div class='header'>
 <span>
  Regexp.prototype.exec(str)
</span> 
<ul>
<li>If using /g flag holds state so can be use to find successive matches</li>
<li>Make sure to compile regex outside a loop or it resets state</li>
<li>exec is complicated!</li>
</ul>
</div>
*/

let str = "abc123"

let re = /(a)/g
log(re.exec(str)) //=> [ 'a', 'a', index: 0, input: 'abc123' ]
log(re.exec(str)) //=> null

/*
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
*/
