
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
 <span>Item 3: Beware of Implicit Coercions</span> 
</div>
*/

/*
<p>Objects are coerced to numbers via valueOf() and to strings via toString().</p>
<ul>
<li>Warning: valueOf takes precedence over toString </li>
</ul>
*/


// redefine valueOf() for custom objects
var obj = {value:1}
log( obj + 1) //=> [object Object]1

obj.valueOf = function(){ return this.value}
log( obj + 1) //=> 2





/* 
<div class='header'>
 <span>Item 12: Understand Variable Hoisting</span> 
</div>
*/

/*
<p>Variable declarations within a block are implicitly hoisted to the top
of their enclosing function.</p>
<p>Redeclarations of a variable are treated as a single variable.</p>
<p>Consider manually hoisting local variable declarations to avoid confusion.</p>
<p>My addendum: Don't forget let.</p>
*/

/*
*/

<span></span><!-- spacer -->

/* 
<div class='header'>
 <span>Item 13: Use Immediately Invoked Function Expressions to Create Local Scopes</span> 
</div>
*/

/*
<p>Closures store their outer variables by reference, not by value.</p>
<p>Immediate invoked functions are a work around for lack of block scoping.</p>
<p>let is the solution of block level scoping</p>
*/

// without let the following is a disaster (or you could use a immediate function, bleh)
function wrapElements( a ) {
  var result = [], i, n;
  for ( let i = 0, n = a.length; i < n; i++ ) { //=> <!let>
    result[ i ] = function() {
      return a[ i ];
    };
  }
  return result;
}
var wrapped = wrapElements( [ 10, 20, 30, 40, 50 ] );
var f = wrapped[ 0 ];
log(f()) // ?



/* 
<div class='header'>
 <span>Item 14: Beware of Unportable Scoping of Named Function Expressions</span> 
</div>
*/

/*
<p>Depending on where it appears, this could be either a function declaration
or a named function expression. </p>
<p>Nevermind: If you are shipping in properly implemented ES5 environments, you've got nothing to worry about!</p>
*/

function double(x) { return x * 2; }

var obj = { a: 1 }
var fun = function() { log( this.a ) }

fun.call(obj)



/* 
<div class='header'>
 <span>Item 23: Never Modify the arguments Object</span> 
</div>
*/

/*
<p>Use the following idiom to get a copy</p>
*/

[].slice.call(arguments)

  
/* 
<div class='header'>
 <span>Item 25: Use bind to Extract Methods with a Fixed Receiver </span> 
</div>
*/

/*
<p>Beware that extracting a method does not bind the method's receiver to its object.</p>
<p>Use bind as a shorthand for creating a function bound to the appropriate receiver.</p>
*/

var buffer = {
  entries: [],
  add: function( s ) {
    this.entries.push( s );
  },
  join: function() {
    return this.entries.join( "" );
  },
  clear: function(){
    this.entries = [] 
  }
};

var source = [ "867", "-", "5309" ];

// error
// source.forEach(buffer.add) //=> Cannot read property 'entries' of undefined

// using bind
source.forEach( buffer.add.bind( buffer ) );
log( buffer.join() ) //=> 867-5309

// clear for next example
buffer.clear()

// using context
source.forEach( buffer.add, buffer )
log( buffer.join() ) //=> 867-5309


/* 
<div class='header'>
 <span>Item 31: Prefer Object.getPrototypeOf to __proto__</span> 
<ul>
<li>Access prototype of an object without a constructor</li>
<li> Alter prototype of existing object( no Object.create() )</li>
<li>Unlike __proto__ you can only modify existing prototype, not assign a new one</li>
</ul>
</div>
*/

var obj = {}
var proto = Object.getPrototypeOf( obj )
proto.fun = function() {
  return "fun"
}
log( obj.fun() ) //=> fun



/* 
<div class='header'>
 <span>Item 40: Avoid Inheriting from Standard Classes</span> 
<ul>
<li>Inheriting from standard classes tends to break due to special internal
properties such as [[Class]].</li>
<li>Prefer delegating to properties instead of inheriting from standard
classes.</li>
</ul>
</div>
*/


//// bad idea, breaks .length
function Dir() {
  // stuff
}

Dir.prototype = Object.create(Array.prototype);

// delegate instead
function MyArray(array){
  this.array = array
}

MyArray.prototype.forEach = function( fun, context ) {
  context = context ? context : this
  context.array.forEach( fun, context ) // delegate to real array
}

var a = new MyArray([1,2,3])

a.forEach( x => log( x ) )
//=> 1
//=> 2
//=> 3





/* 
<div class='header'>
 <span>Arrays and Dictionaries</span> 
<ul>
</ul>
</div>
*/

/*
<p>Item 44: Use null Prototypes to Prevent Prototype Pollution</p>
<ul>
<li>In ES5, use Object.create(null) to create prototype-free empty
objects that are less susceptible to pollution.</li>
</ul>
*/

// This doesn't work
function C() { }
C.prototype = null;

var o = new C
log( Object.getPrototypeOf( o ) === Object.prototype ) //=> true , didn't work

// works
var o = Object.create( null )
log( Object.getPrototypeOf( o ) === Object.prototype ) //=> false
log( Object.getPrototypeOf( o ) === null ) //=> true



/*
<p>Item 48: Avoid Modifying an Object during Enumeration</p>
<ul>
<li>ECMAScript Standard: If new properties are added to the object being enumerated
during enumeration, the newly added properties are not guaranteed
to be visited in the active enumeration.</li>
</ul>
*/

<span></span>



/*
<p>Item 51: Reuse Generic Array Methods on Array-Like Objects</p>
<ul>
<li>Any object can be used with generic Array methods if it has indexed
properties and an appropriate length property.</li>
</ul>
*/

function fun1(){
  [].forEach.call( arguments, x => log( x ) )
}

fun1(1,2,3)
//=> 1
//=> 2
//=> 3

function fun2(){
  var args = [].slice.call(arguments) // slice with no args means all
  args.forEach( x => log( x ) )
}

fun2(1,2,3)
//=> 1
//=> 2
//=> 3



/*
<p>Item 54: Treat undefined As "No Value"</p>
<ul>
<li>The undefined value is special: Whenever JavaScript has no specific
value to provide it just produces undefined. Unassigned variables
start out with the value undefined</li>
<li>Avoid using undefined to represent anything other than the absence
of a specific value.</li>
<li>Test for undefined instead of checking arguments.length to provide
parameter default values.</li>
<li>Never use truthiness tests for parameter default values that should allow
0, NaN, or the empty string as valid arguments.</li>
</ul>
*/

var x;
log(x) //=> undefined

log( ( function(){ return } )() ) //=> undefined
log( ( function() {} )() ) //=> undefined
log( ( function( x ) { return x } )() ) //=> undefined

// More robust test to avoid relying on truthyness for parameters
function Element( width, height ) {
  this.width = width === undefined ? 320 : width; // test with undefined, not just trutyness
  this.height = height === undefined ? 240 : height; // test with undefined, not just trutyness
  // ...
}
var c1 = new Element( 0, 0 ); // this would be assigned default values if testing args only for truthyness

this.width = _.condUndefined(width, 320) // if cond width is undefined return 320

this.width = _.cond()

_.condUndefined = function(value, other){
  return _isUndefined(value) ? other : value
}



/*
<p>Item 55: Accept Options Objects for Keyword Arguments</p>
<ul>
<li>use some implementation of extend to merge defaults</li>
</ul>
*/

function Constructor( argsObject ) {
  var defaults = { x: 0, y: 0 }

  argsObject = _.extend(defaults, argsObject)
  log(argsObject)

}

new Constructor( { x: 100 } ) //=> { x: 100, y: 0 }

