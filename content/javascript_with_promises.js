
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



// emit



// /emit


/*
<br /> <br /> <br /> <br /> <br />
<br /> <br /> <br /> <br /> <br />
<br /> <br /> <br /> <br /> <br />
 */
