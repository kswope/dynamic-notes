
=begin 
<div class='header'>
 <span>Foundations</span> 
</div>
=end


=begin
<p>You must use <b>return</b> when returning multiple results from a method, or just return the array</p>
=end


def m
  return 1,2,3
end

print m #=> [1, 2, 3]

def m
  1,2,3
end

print m #=> [1, 2, 3] #=x syntax error, unexpected ',', expecting keyword_end


=begin
<p>__send__ is an safer alternative to send if you are paranoid about somebody
monkeypatching send. Note: send can call an objects private methods.  If may be
safer to use public send for 'tainted' send parameters.</p>
=end


Object.new.send(:local_variables) #=> [:_]
Object.new.public_send(:local_variables) #=x NoMethodError: private method `local_variables' called


=begin
<p>Beware that setter methods will return the set value, not what the method returns, for consistency</p>
=end

class My
  def x=(x)
    @x = x
    'boooo' # <!'boooo'>
  end
  def x
    @x
  end
end

o = My.new
p o.x = 1 #=> <!1> 1, not 'boooo'



=begin
<p>The default superclass of a class is Object </p>
=end

class MyClass
end

# same as

class MyClass < Object
end


=begin
<p>You can make a class like this:</p>
=end

my_class = Class.new do

  def hello
    puts :hello
  end

end

my_class.new.hello #=> hello


page 119


<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

