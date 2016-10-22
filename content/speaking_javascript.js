
// hide
// emit
var _ = require('lodash')

function log(){
  console.log.apply(console, arguments)
}

function print() {
  var joined = _.toArray(arguments).join(' ')
  process.stdout.write( joined + '  ')
}
// /emit
// /hide


/* 
<div class='header'>
 <span>Basic Javascript</span> 
</div>
*/

/*
<p>Semicolons terminate statements but not blocks.</p>
<p>Only time a semicolon follows a block is a function expression</p>
*/


var fun1 = function( x ) { return x + 1 }; //=> has semicolon
var fun2 = ( x ) => x + 1; //=> has semicolon
log( fun1(1), fun2(1) ) //=> 2 2

if(true){ log("no semicolon")} //=> no semicolon



/*
<p>Compount assignment operator += work on strings, yay!.</p>
*/

var str = ''
str += 'one'
str += ' two'
str += ' three'
log(str) //=> one two three


/*
<p>Primitive values vs objects<p>
<ul>
<li>The primitive values are booleans, numbers, strings, null, and undefined</li>
<li>All other values are objects</li>
<li>A major difference is how they are compared.</li>
<li>Properties of primitive values cannot be changed</li>
</ul>
*/


log( true === true ) //=> true
log( 0 === 0 )       //=> true
log( {} === {} )     //=> false!

var arr = 'abc'
arr.length = 100 //=x Cannot assign to read only property 'length' of abc ( 'use strict' verion )
arr.here = 'there' //=x Cannot assign to read only property 'here' of abc ( 'use strict' version )



/*
<p>All nonprimitive values are objects</p>
<p>The most common kinds are</p>
<ul>
<li>Plain objects</li>
<li>Arrays</li>
<li>Regex</li>
</ul>
*/

<span></span>



/*
<p>Categorizing values using typeof and instanceof</p>
<ul>
<li>typeof is mainly used for primative values</li>
<li>instanceof is used for objects</li>
<li>Life is too short for this nonsense, use lodash or underscore</li>
</ul>
*/

log( typeof true ) //=> boolean
log( typeof 'abc' ) //=> string
log( typeof {} ) //=> object
log( typeof [] ) //=> object (lame)
log( typeof null ) //=> object (lame)


log( {} instanceof Object ) //=> true
log( [] instanceof Object ) //=> true ( oh thanks )
log( [] instanceof Array ) //=> true

// underscore or lodash
log(_.isBoolean(true)) //=> true
log(_.isString('abc')) //=> true
log(_.isObject({})) //=> true
log(_.isObject([])) //=> true
log(_.isNull(null)) //=> true


/*
<p>Basic String Methods</p>
*/

log( 'abc'.slice( 0 ) ) //=> abc
log( 'abc'.slice( 1 ) ) //=> bc
log( ' abc '.trim() ) //=> 'abc'



/*
<p>Conditionals</p>
*/

// its "else if"
if ( myvar === 0 ) {
  // then
} else if ( myvar === 1 ) { // <! else if >
  // else-if
} else if ( myvar === 2 ) { // <! else if >
  // else-if
} else {
  // else
}

// I'll never remember this syntax
switch (myVar) {
  case 'one': // compared via ===
    do_one()
    break
  case 'two':
    do_two()
    break
  default:
    do_default()
}

// there's a do-while loop!

do {
  do_something()
} while ( true )



/*
<p>Enforcing function arity</p>
*/

function pair( x, y ) {
  if ( arguments.length !== 2 ) {
    throw new Error( 'Need exactly 2 arguments' );
  }
}

pair()


/*
<p>Exception handling, most common way</p>
<p>My note: try/catch is sketchy for async programming, but uncaught throw is
probably fine</p>
*/

function pair( x, y ) {
  if ( arguments.length !== 2 ) {
    throw new Error( 'Need exactly 2 arguments' );
  }
}

try {
  pair(1)  
} catch(ex) {
  log(ex.name) //=> Error
}



/*
<p>Extracting methods</p>
*/

var obj = {
  first: 'john',
  last: 'doe',
  data: [1,2,3,4,5],
  full: function(){
    return [this.first, this.last].join(' ') 
  },

  all: function(){

    var dataString = function(){
      return this.data.join(' ')
    }
  
    return [this.first, this.last, dataString.bind(this)()] // <!bind>
  
  },

}

log(obj.full()) //=> john doe

var fun = obj.full.bind(obj)
log(fun()) //=> john doe

log( obj.all() ) //=> [ 'john', 'doe', '1 2 3 4 5' ]



/*
<p>Multiple places to pass context to some iterators</p>
*/

var obj = {name:'kevin', data:[1,2,3,4,5]}

log( obj.data.map( function( x ) { return this.name + x }, obj ) ) // <!obj>
log( obj.data.map( function( x ) { return this.name + x }.bind( obj ) ) ) <!obj>



/*
<p>Functions called with <b>new</b> become constructors for objects</p>
*/

function MyObject(name){
  this.name = name 
}

var obj = new MyObject('bob')
log(obj.name) //=> bob


/*
<p>Regex</p>
<ul>
<li>RegExp.prototype.test() returns a boolean</li>
<li>RegExp.prototype.exec() works with capture groups and can be looped, capture group at index 1</li>
<li>String.prototype.replace()</li>
</ul>
*/


// literal definition
var r = /^a/
log( r.test( 'abc' ) ) //=> true

log( /a(b+)c/g.exec( 'abc abbc abbbc' ) ) //=> [ 'abc', 'b', index: 0, input: 'abc abbc abbbc' ] <!'b'>

log('abc abc abc'.replace(/b/g, 'B')) //=> aBc aBc aBc



/*
<p>Wrapper objects for primitives</p>
<ul>
<li>boolean, number, and string have corresponding constructors: Boolean(), Number(), String(). </li>
<li>As constructors they are garbage, best avoided.</li>
<li>As functions they convert to that primitive type.</li>
</ul>
*/

// as constructor
log( typeof 'abc' ) //=> string
log( typeof new String( 'abc' ) ) //=> object (?)
log( 'abc' === new String( 'abc' ) ) //=> false
log( 'abc' === 'abc' ) //=> true

// as function
log( 123 + '4') //=> 1234
log( 123 + Number('4')) //=> 127

/*
<p>There is no way of comparing objects in javascript</p>
<ul>
<li>Is that unusual?</li>
</ul>
*/

<span></span><!-- spacer -->



/*
<p>The useful Math functions</p>
<ul>
<li>Math.floor()</li>
<li>Math.ceil()</li>
<li>Math.round()</li>
</ul>
*/

log( Math.floor( 1.9 ) ) //=> 1
log( Math.ceil( 1.1 ) )  //=> 2

log( Math.round( 1.4 ) ) //=> 1
log( Math.round( 1.5 ) ) //=> 2


/*
<p>parseInt</p>
<ul>
<li>parseInt() is useful for parsing strings</li>
<li>parseInt() is bad for converting numbers to integers</li>
</ul>
*/

log( parseInt( '123junk')) //=> 123
log( parseInt( 1000000000000000000000.5, 10 ) ) //=> 1, not even close
log( _.parseInt( 1000000000000000000000.5, 10 ) ) //=> 1, not even close



/* 
<div class='header'>
 <span>Strings</span> 
</div>
*/

/*
<p>charAt()</p>
*/

log( 'abc'.charAt( 2 ) ) //=> c
log( 'abc' [ 2 ] )       //=> c



/*
<p>Converting to string</p>
<ul>
<li>String(value) preferred</li>
<li>'' + value</li>
<li>value.toString() doesn't work with undefined and null!</li>
</ul>
*/

log( String( 123 ) ) //=> '123'
log( '' + 123 ) //=> '123'

var value = 123
log( value.toString()) //=> '123

var value = null
log( String( value ) ) //=> null
log( value.toString()) //=x TypeError: Cannot read property 'toString' of null 

/*
<p>String.prototype.slice(start, end?)</p>
<ul>
<li>Preferred over substring</li>
</ul>
*/


log( 'abc'.slice(-1)) //=> c
log( 'abc'.slice(-2)) //=> bc
log( 'abc'.slice(1)) //=> bc
log( 'abc'.slice(0,2)) //=> ab



/*
<p>String.prototype.split(separator?, limit?)</p>
<ul>
<li>Preferred over substring</li>
<li>separator is regex or string</li>
<li>capture groups are also returned</li>
</ul>
*/

log('fred, barney, & pebbles'.split(/[, ]+/)) //=> [ 'fred', 'barney', '&', 'pebbles' ]
log('fred, barney, & pebbles'.split(/([, ]+)/)) //=> [ 'fred', ', ', 'barney', ', ', '&', ' ', 'pebbles' ]



/*
<p>String.prototype.trim()</p>
<ul>
<li>Non-destructive</li>
</ul>
*/

log( ' abc '.trim() ) //=> 'abc'



/*
<p>String.prototype.concat(str1, str2, ...)</p>
<ul>
<li>Non-destructive</li>
</ul>
*/

log( ''.concat( 'a', 'b', 'c' ) ) //=> 'abc'



/*
<p>String.prototype.indexOf(str, position?)</p>
<ul>
<li>Reverse: lastIndexOf(str, position?)</li>
<li></li>
</ul>
*/

log( 'abcabc'.indexOf( 'c' ) ) //=> 2
log( 'abcabc'.indexOf( 'c', 2+1 ) ) //=> 5

log( 'abcabc'.lastIndexOf( 'c' ) ) //=> 5


/* 
<div class='header'>
 <span>Test, Match, and Replace with Regular Expressions</span> 
</div>
*/


/*
<p>String.prototype.search(regexp)</p>
<ul>
<li>Returns <b>index</b> of first match</li>
<li>Returns -1 if no match</li>
<li>Captures seem to have no effect</li>
</ul>
*/

log( 'abc'.search(/b/)) //=> 1
log( 'abc'.search(/(b)/)) //=> 1



/*
<p>String.prototype.match(regexp)</p>
<ul>
<li>returns match object if no /g</li>
<li>returns all matches if /g</li>
<li>captures also affect result but only if no /g ?</li>
</ul>
*/

log( '-abb--aaab-'.match( /a+b?/ ) ) //=> [ 'ab', index: 1, input: '-abb--aaab-' ]
log( '-abb--aaab-'.match( /a+b?/g ) ) //=> [ 'ab', 'aaab' ]

log( '-abb--aaab-'.match( /(a+)b?/ ) ) //=> [ 'ab', 'a', index: 1, input: '-abb--aaab-' ]
log( '-abb--aaab-'.match( /(a+)b?/g ) ) //=> [ 'ab', 'aaab' ]


/*
<p>String.prototype.replace(search, replacement)</p>
<ul>
<li>search can be string or regex</li>
<li>replacement can be string or function</li>
</ul>
*/

log( 'abc'.replace( /./g, ( x ) => x.toUpperCase() ) ) //=> ABC



/* 
<div class='header'>
 <span>Exception handling</span> 
</div>
*/


/*
<p>Use the Error constructor</p>
*/

// Don't do this
if ( somethingBad ) {
  throw "Something bad happened"
}

// Do this instead
if ( somethingBad ) {
  throw new Error( "Something bad happened" )
}


/*
<p>Finally is always executed</p>
*/

try {
  throw new Error('whoops!')
} catch ( ex ) {
  log('caught ' + ex) //=> caught Error: whoops!
} finally {
  log('always') //=> always
}



/*
<p>Finally doesn't need catch</p>
*/


try {
  throw new Error( 'whoops!' ) //=x Error: whoops!
} finally {
  log( 'always' ) //=> always
}




/* 
<div class='header'>
 <span>Functions</span> 
</div>
*/


/*
<p> func.apply( thisValue, *array ) </p>
 <ul>
  <li>Is this needed when the ...rest operator is available?</li>
  <li>Is passing thisValue a common use case?</li>
  <li>Is this anything more than a glorified splat?</li>
 </ul>
*/

log( Math.max( 1, 2, 3 ) ) //=> 3
log( Math.max.apply( null, [ 1, 2, 3 ] ) ) //=> 3

// using ...rest operator (needed babel-node to not throw error)
log( Math.max( ...[ 1, 2, 3 ] ) ) //=> 3



/*
<p> func.bind( thisValue, arg1, ..., argN ) </p>
 <ul>
  <li>Performs partial function application (suspect rare use case)</li>
  <li>Unlike apply and call, this returns a new function</li>
  <li>Is binding callback to thisValue the most common use case?</li>
 </ul>
*/

// data and its formatter
var obj = {
  format: function( x ) {
    return [ '-', x, '-' ].join( '' )
  },
  data: [ 1, 2, 3, 4, 5 ]
}

// using bind instead of passing this to forEach
obj.data.forEach( function( x ) {
  print( this.format(x) ) //=> -1-  -2-  -3-  -4-  -5-  
}.bind( obj ) ) // <!bind>


// passing this to forEach instead of using bind
obj.data.forEach( function( x ) {
  print( this.format(x) ) //=> -1-  -2-  -3-  -4-  -5-  
}, obj ) // <!bind>



/*
<p> arguments </p>
 <ul>
  <li>array like - has .length(), but not .forEach(), .slice(), etc</li>
  <li>strict mode forbids assignment</li>
  <li>In nonstrict mode arguments keeps up to date with assignment to parameters</li>
  <li>In strict mode arguments doesn't keep up to date with assignment to parameters</li>
 </ul>
*/

// enforce arity by checking arguments.length
if ( arguments.length < 1 ) {
  throw new Error( 'You need to provide at least 1 argument' );
}

// idiomatic way to converting arguments to real array
function fun() {
  var args = [].slice.call( arguments ) // one way
  var args = Array.prototype.slice.call( arguments ) // another
  args.forEach( ( x ) => log( x ) )
}

fun('a', 'b', 'c')
//=> a
//=> b
//=> c



/*
<p> pass by reference </p>
 <ul>
  <li>Parameters don't pass by reference (good, fewer side effects)</li>
  <li>Wrap in something to pass by reference</li>
  <li>I don't think this is so simple</li>
 </ul>
*/

function fun(arg){
  arg.replace(/./g, (x) => x.toUpperCase() )
}

var str = 'abc'
fun(str)
log( str ) //=> abc

function fun(arg){
  log('arg=', arg)
  arg[0] = arg[0].replace(/./g, (x) => x.toUpperCase() )
}

// this doesn't work, I don't know why!
var str = 'abc'
fun( [ str ] )
log( str ) //=> abc

// this does, I don't know why!
var str = ['abc']
fun( str )
log( str[0] ) //=> ABC

// Maybe answer here http://docstore.mik.ua/orelly/webprog/jscript/ch11_02.htm
//
// Since strings are immutable, our original question is moot: there is no way
// to tell if strings are passed by value or by reference. We can assume that,
// for efficiency, JavaScript is implemented so that strings are passed by
// reference, but in actuality it doesn't matter, since it has no practical
// bearing on the code we write.


/* 
<div class='header'>
 <span>Objects</span> 
<ul>
<li>Don't forget functions are object too</li>
</ul>
</div>
*/


/*
<p>Object.keys and hasOwnProperty</p>
*/

var obj = { a: 1, b: 2, c: 3 }

Object.keys( obj ).forEach( function( x ) {
  log( x, obj.hasOwnProperty( x ) )
} )

//=> a true
//=> b true
//=> c true

for( var x in obj) {
  log( x, obj.hasOwnProperty( x ) )
}

//=> a true
//=> b true
//=> c true



/*
<p>Avoid object constructor</p>
*/

var obj = new Object(); // avoid
var obj = {}; // prefer



/*
<p>"But you frequently just create an empty object and then manually add
properties, because descriptors are verbose"</p>
*/

var proto = { a: 1 }
var obj = Object.create( proto )
obj.b = 2
log( obj.a ) //=> 1
log( obj.b ) //=> 2


/*
<p>Object.getPrototypeOf()</p>
*/

var obj = Object.create( String.prototype )
log( Object.getPrototypeOf( obj ) ) //=> [String: '']
log( String.prototype.isPrototypeOf( obj ) ) //=> true

// not doing it right (String is a constructor function)
var obj = Object.create( String )
log( Object.getPrototypeOf( obj ) ) //=> [Function: String]
log( String.isPrototypeOf( obj ) ) //=> true

// basic case
var proto = {}
var obj = Object.create( proto )
log( proto.isPrototypeOf( obj ) ) //=> true



/*
<p>Avoid invoking hasOwnProperty() directly on an object, as it may be overridden</p>
*/

Object.prototype.hasOwnProperty.call(obj, 'foo')

{}.hasOwnProperty.call(obj, 'foo') // shorter



/*
<p>Getters and Setters</p>
<ul>
<li>Do I care?</li>
</ul>
*/

var obj = {
  x: 1,
  get getter() {
    return this.x
  },
  set setter( x ) {
    this.x = x
  }
}

obj.setter = 100
log(obj.getter) //=> 100



/*
<p>The only operations affected by enumerability are</p>
<ul>
<li>for in loop</li>
<li>Object.keys()</li>
<li>JSON.stringify()</li>
<li>Best Practices
<ul>
<li>For your own code, you can usually ignore enumerability and should avoid the for-in loop</li>
<li>You normally shouldn't add properties to built-in prototypes and objects. But if you
do, you should make them nonenumerable to avoid breaking existing code.</li>
</ul>
</ul>
*/

<span></span>


/* 
<div class='header'>
 <span>Arrays</span> 
<ul>
<li>Arrays are maps and not touples because they can have holes.</li>
<li>Note that most JavaScript engines optimize arrays without holes internally and store
them contiguously.</li>
<li>Arrays can also have properties (duh length)</li>
</ul>
</div>
*/

/*
<p>Use array length to remove and append elements</p>
<ul>
<li>I'd probably use push() to append elements</li>
</ul>
*/

var a = [1,2,3]
a.length = 2
log(a) //=> [ 1, 2 ]

a[a.length] = 3
log(a) //=> [ 1, 2, 3 ]


/*
<p>in operator works</p>
<ul>
<li>Awkward looking operator isn't it?</li>
<li>use something like _.includes instead</li>
<li>Don't use in for loops, what are you thinking?</li>
</ul>
*/

var a = [1,2,3]
log( 1 in a ) //=> true
log( _.include( a, 1 ) ) //=> true

a.forEach((x,y) => log(x))


/*
<div class='header'>
 <span>Regular expressions</span> 
</div>
*/


/*
<p>Literal vs Constructor</p>
<ul>
<li>Literal compiled at load time.</li>
<li>Constructor compiled at runtime.</li>
<li>If you can prefer literals because of load time compilation errors</li>
</ul>
*/



