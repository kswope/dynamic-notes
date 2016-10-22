
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
 <span>Header</span> 
</div>
*/

// emit

let f = ( x ) => ( y ) => x + y
  
let g = f(1)
log( g(1) )

// /emit





/*
<br /> <br /> <br /> <br /> <br />
<br /> <br /> <br /> <br /> <br />
<br /> <br /> <br /> <br /> <br />
 */
