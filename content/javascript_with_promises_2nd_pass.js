
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
 <span>
   Promise constructor and resolver
 </span> 
</div>
<blockquote>
  When Promise is used as a constructor it requires a callback known as a
  resolver function. The resolver serves two purposes: it receives the resolve
  and reject arguments, which are functions used to update the promise once
  the outcome is known, and any error thrown from the resolver is implicitly
  used to reject the promise.
</blockquote>
*/

/*
<div class='header'>
 <span>
 Promise convenience functions
 </span> 
</div>
*/

//// Equivalent ways to create a resolved promise.

new Promise((resolve) => {
  resolve('the long way')
})

Promise.resolve('the short way')


/*
<div class='header'>
 <span>
  As a general rule, any function that uses a promise should also return a
  promise.
 </span> 
</div>
<blockquote>
When a promise is not propagated, the calling code cannot know when the
promise is fulfilled and thus cannot effectively perform work after the fact.
It’s easy to ignore this rule when writing a function whose caller does not
care when the async work is finished, but don’t be fooled. It’s much easier
to return a promise that initially goes unused than to retrofit promises into
a series of functions later on.
</blockquote>
*/








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





