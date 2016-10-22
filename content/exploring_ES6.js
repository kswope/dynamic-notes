
// hide
// emit

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
 <span>String Interpolation</span> 
</div>
*/

let [ a, b ] = [ 1, 2 ]
log( `${a} ${b}` ) //=> 1 2


/* 
<div class='header'>
 <span>Multiple return values</span> 
 <ul>
  <li>Use destructuring</li>
  <li>Ignore return values with blank array element</li>
 </ul>
</div>
*/

const [ , y, m, d ] = "2016-10-17".match( /(\d+)-(\d+)-(\d+)/ )

log( `y:${y}, m:${m}, d:${d}` ) //=> y:2016, m:10, d:17


/* 
<div class='header'>
 <span>Multiple return values via objects</span> 
 <ul>
  <li>Use destructuring</li>
 </ul>
</div>
*/

const data = { a: 1, b: 2, c: 3 }

let { a, b, c } = data;

// shorthand for 
// { a:a, b:b, c:c } = data

log( `a:${a}, b:${b}, c:${c}` ) //=> 1 2 3



/* 
<div class='header'>
 <span>for-of</span> 
</div>
*/


const data = [ 1, 2, 3 ]

for (const x of data){
  print(x)
} //=> 1 2 3

let m = new Map([ ['a', 1], ['b', 2], ['c', 3] ])
log(m) //=> Map { 'a' => 1, 'b' => 2, 'c' => 3 }

for (let [key, value] of m.entries()) {
  print(`${key} => ${value}`)
} //=> a => 1  b => 2  c => 3

/* 
<div class='header'>
 <span>for-of works on strings</span> 
 <ul>
  <li>Does anybody care?</li>
 </ul>
</div>
*/

const str = 'abc'
for(const x of str){
  print(x)
} //=> a b c

/* 
<div class='header'>
 <span>Spread operator works on strings</span> 
 <ul>
  <li>Does anybody care?</li>
 </ul>
</div>
*/

const chars = [...'abc']
log(chars) //=> [ 'a', 'b', 'c' ]

/* 
<div class='header'>
 <span>Symbols</span> 
 <ul>
  <li>Can be optionally tagged (only for debugging purposes?)</li>
  <li>Can only be coerced to strings by String(sym) or sym.toString()</li>
  <li>Ignored by following operations: </li>
  <ul>
    <li>Object.keys()</li>
    <li>Object.getOwnPropertyNames()</li>
    <li>for-in loop</li>
  </ul>
</div>
*/

const SYM1 = Symbol();
const SYM2 = Symbol( 'two' );
const SYM3 = Symbol( 'this is 3' );

const map = new Map
map[ SYM1 ] = 1
map[ SYM2 ] = 2
map[ SYM3 ] = 3

log( map[ SYM1 ] ) //=> 1
log( map[ SYM2 ] ) //=> 2
log( map[ SYM3 ] ) //=> 3



/* 
<div class='header'>
 <span>Destructuring</span> 
</div>
*/


// array destructuring
let [a,b] = [1,2]
log(a,b) //=> 1 2

// object destructuring
let { x, y } = { x: 1, y: 2 }
log( x, y ) //=> 1 2

// pick what you need
let { y } = { x: 1, y: 2 }
log( y ) //=> 2

// nested!
let nested = { a: { b: 10 } }
let { a: { b: x } } = nested
log( x ) //=> 10

// array destructuring works with anything iterable
let [ x, ...y ] = 'abc'
log( x, y ) //=> a [ 'b', 'c' ]

// default values
let { x = 1, y = 2 } = {}
log( x, y ) //=> 1 2

let { x = 1, y = 2 } = { y: 200 }
log( x, y ) //=> 1 200

// default values in arguments
let f = ( { a = 1, b = 1 } ) => a * b
log( f( {} ) ) //=> 1
log( f( { a: 2 } ) ) //=>2
log( f( { a: 2, b: 2 } ) ) //=>4

// destructure array in for-of loop
let array = [ [ 0, 1 ], [ 2, 3 ] ]
for ( let [ x, y ] of array ) {
  print( `[${x}, ${y}]` )
} //=> [0, 1]  [2, 3]



/* 
<div class='header'>
 <span>Parameter Handling</span> 
</div>
*/

// one use of destructuring for parameter passing
const items = [ [ 'foo', 3 ], [ 'bar', 9 ] ];
items.forEach( ( [ word, count ] ) => {
  console.log( word + ' ' + count );
} );


// another
const items = [
  { word: 'foo', count: 3 },
  { word: 'bar', count: 9 },
];

items.forEach( ( { word, count } ) => {
  console.log( word + ' ' + count );
} );


// with for-of
for ( let { word, count } of items ) {
  console.log( word + ' ' + count );
}



/* 
<div class='header'>
 <span>New OO features besides Classes</span> 
 <ul>
  <li>object literal method definitions</li>
  <li>prop shorthand</li>
  <li>computed prop keys</li>
  <li>Object.assign()</li>
  <li></li>
 </ul>
</div>
*/

// method definitions inside object literals
const obj = {
  l(){ log('l') }
}
obj.l() //=> l

// prop shorthand
let first = 'kevin'
let age = 15
let obj = { first, age }
log(obj) //=> { first: 'kevin', age: 15 }


// computed prop keys
//The main use case for computed property keys is to make it easy to use symbols as property keys.
let fname = 'f'
let sym = Symbol()
let obj = {
  [['m','y','v','a','r'].join('')]: 1,
  // works with functions, no idea what to do with this
  [fname](){ log('in f') },
  [sym](){ log('in symbol named function') }
}
obj.f() //=> in f
log(obj.myvar) //=> 1
obj[sym]() //=> in symbol named function

// Object.assign only considers 'own' properties
const source = { f(){ log('in f') } }
const dest = {}
Object.assign(dest, source)
dest.f() //=> in f


/* 
<div class='header'>
 <span>Classes</span> 
</div>
*/

// class expressions exist, I just never see them, will probably never use
let myClass = class {}
log(new myClass()) //=> myClass {}

// emit

// don't forget static methods
class MyClass {
  static f(){
    log('in f')
  }
}

MyClass.f() //=> in f

// /emit



/*
<br /> <br /> <br /> <br /> <br />
<br /> <br /> <br /> <br /> <br />
<br /> <br /> <br /> <br /> <br />
 */
