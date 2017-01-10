
=begin 
<div class='header'>
 <span>Foundations</span> 
</div>
=end


=begin
<p>You must use <b>return</b> when returning multiple results from a method, or just return the array</p>
=end


# emit

def m
  return 1,2,3
end

print m #=> [1, 2, 3]

def m
  1,2,3
end

print m #=> [1, 2, 3] #=x syntax error, unexpected ',', expecting keyword_end

# /emit


=begin
<p>__send__ is an safer alternative to send if you are paranoid about somebody
monkeypatching send. Note: send can call an objects private methods.  If may be
safer to use public send for 'tainted' send parameters.</p>
=end


Object.new.send(:local_variables) #=> [:_]
Object.new.public_send(:local_variables) #=x NoMethodError: private method `local_variables' called



<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

