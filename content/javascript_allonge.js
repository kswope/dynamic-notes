
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
 <span>Producing undefined</span> 
</div>
*/


// can sometimes cause problems if undefined is defined
log( undefined ) //=> undefined

// void anything is undefined
log( void 0 ) //=> undefined

// a function that doesn't return a value returns undefined
log( ( () => {} )() ) //=> undefined




/* 
<div class='header'>
 <span>function.length is the arity</span> 
</div>
*/

log( (() => {}).length ) //=> 0
log( ((x) => {}).length ) //=> 1
log( ((x,y) => {}).length ) //=> 2

// emit


let tap = ( x ) => ( y ) => y( x )

log( tap( 1 )( x => x + 1 ) )



// /emit





/*
<br /> <br /> <br /> <br /> <br />
<br /> <br /> <br /> <br /> <br />
<br /> <br /> <br /> <br /> <br />
 */
