
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
 <li>indexOf()</li>
 <li>includes(str)</li>
 <li>.slice(start, [end])</li>
 <li>.substr(start, [length])</li>
 <li></li>
 <li></li>
 <li></li>

 </ul>
</div>
*/

//emit
// length not a method
log( 'str'.length ) //=> 3

// return character at any index
log( 'str' [ 1 ] ) //=> t

// find location of substring
log( 'this is a string'.indexOf( ' is ' ) ) //=> 4

// indexOf returns -1 if nothing found
log( 'this is a string'.indexOf( 'banana' ) ) //=> -1

if ( 'this is a string'.indexOf( 'banana' ) === -1 ) {
  log( 'no bananas' )
} //=> no bananas


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

// substring() seems to be a version of slice but with weird behavior, avoid

// while slice uses indexes, substr uses index and length
log( str.substr( 0, 3 ) ) //=> thi

// replace() finds and replaces a substring
log( 'one two three'.replace( 'two', 'TWO' ) ) //=> one TWO three

// includes looks like a find but without the ugly -1 of indexOf()
log( 'one two three'.includes( 'two' ) ) //=> true


// /emit


<br />
<br />
<br />
<br />
<br />
