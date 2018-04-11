
// hide
// emit

'use strict'

function log(){
  console.log.apply(null, arguments)
}

function print() {
  var joined = Array.prototype.slice.call( arguments ).join( ' ' )
  process.stdout.write( joined + '  ')
}

// /emit
// /hide



/* 
<div class='header'>
 <span>Useful String Methods and Properties</span> 
 <ul>
   <li>.length</li>
   <li>.indexOf(str, [offset]) ES1</li>
   <li>.search(str) ES3</li>
   <li>.lastIndexOf(str) ES1</li>
   <li>.includes(str) ES6</li>
   <li>.startsWith(str) ES6</li>
   <li>.endsWith(str) ES6</li>
   <li>.slice(start, [end]) ES3</li>
   <li>.substring(start, [indexEnd]) ES3</li>
   <li>.substr(start, [length]) ES3</li>
   <li>.replace(find, replace)</li>
   <li>.charAt(number) ES1</li>
   <li>.concat(str) ES3</li>
   <li>.repeat(number) ES6</li>
   <li>.match(regexp) ES3</li>
   <li>.trim() ES5</li>
   <li>.split(separator, [limit]) (sep is string or regex) ES3</li>
   <li>.toLowerCase(str) ES1</li>
   <li>.toUpperCase(str) ES1</li>
   <li>.toString() ES3 (like ruby inspect, I think console.log calls this)</li>
   <li>[@@iterator]()</li>
 </ul>
</div>
*/

// length not a method
log( 'str'.length ) //=> 3

// return character at any index
log( 'str' [ 1 ] ) //=> t

// find location of substring
log( 'this is a string'.indexOf( ' is ' ) ) //=> 4
log( 'this is a string'.lastIndexOf( ' is ' ) ) //=> 4

// indexOf returns -1 if nothing found
log( 'this is a string'.indexOf( 'banana' ) ) //=> -1

if ( 'this is a string'.indexOf( 'banana' ) === -1 ) {
  log( 'no bananas' )
} //=> no bananas

// search is like indexOf but uses a regex (indexOf takes a start position, search doesnt)
// search forces a regex match so its slower.
log( 'this is a string'.search( ' is ' ) ) //=> 4

// slice returns a substring, isn't well named because it doesn't modufy
// existing string, second argument, the terminator (optional), isn't included,
// its "up to", if not specified will default to end of string.
let str = 'this-is-a-string'
let str2 = str.slice( 0, 4 )
log( str ) //=> 'this is a string
log(str2) //=> this

// with negative second argument it works like this
log( str.slice( 0, (str.length - 3) ) ) //=> this-is-a-str
log( str.slice( 0, -3 ) ) //=> this-is-a-str

// omit last character
log( str.slice( 0, -1 ) ) //=> this-is-a-strin

// substring() seems to be a version of slice but with weird behavior, reorders first two parameters

// while slice uses indexes, substr uses index and length
log( str.substr( 0, 3 ) ) //=> thi

// replace() finds and replaces a substring, takes regex, even /regex/g
log( 'one two three'.replace( 'two', 'TWO' ) ) //=> one TWO three

// charAt seems like indexing
log( 'string'.charAt( 2 ) === 'string' [ 2 ] ) //=> true

// concat two strings
log( 'hello '.concat( 'world' ) )

// three related es6 methods
log( 'one two three'.startsWith( 'one' ) ) //=> true
// includes looks like indexOf() but without the ugly -1
log( 'one two three'.includes( 'two' ) ) //=> true
log( 'one two three'.endsWith( 'three' ) ) //=> true

// repeat, who cares
log( '*'.repeat( 5 ) ) //=> *****

//emit

// split
log( 'abc'.split( ) ) //=> ['abc'] does nothing
log( 'abc'.split( '' ) ) //=> ['a', 'b', 'c'] separates on all characters
log( 'abc'.split( 'b' ) ) //=> ['a', 'c'] separator is string
log( 'abc'.split( /b/ ) ) //=> ['a', 'c'] separator is regex
log( 'abc'.split( /(b)/ ) ) //=> ['a', 'b', 'c'] includes separator

let i = 'hello'[Symbol.iterator]()
log( i.next().value ) //=> h
log( i.next().value ) //=> e
log( i.next().value ) //=> l
log( i.next().value ) //=> l
log( i.next().value ) //=> o

// /emit


<br />
<br />
<br />
<br />
<br />
