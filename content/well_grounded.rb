
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
safer to use public_send for 'tainted' send parameters.</p>
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


=begin 
<div class='header'>
 <span>Built in Essentials</span> 
</div>
=end




=begin 
<div class='header'>
 <span>Collections central: Enumerable and Enumerator</span> 
</div>
=end


=begin
<p>Danger of find()ing for nil</p>
=end

p [1,2,3,nil,4,5,6].find {|n| n.nil?} #=> nil
p [1,2,3,4,5,6].find {|n| n.nil?} #=> nil

# use include? instead
p [1,2,3,nil,4,5,6].include? nil #=> true
p [1,2,3,4,5,6].include? nil #=> false


=begin
<p>select! / reject! is a handy but brutal</p>
=end

a = [1,2,3,4,5,6,7,8]
a.select! {|x| x % 2 == 1}
p a #=> [1,3,5,7]

# there's an opposite
a = [1,2,3,4,5,6,7,8]
a.reject! {|x| x % 2 == 1}
p a #=> [2,4,6,8]


=begin
<p>grep and ===</p>
<i> grep calls === on argument for each element </i><br />
<i> same as enumerable.select {|element| expression === element }</i>
=end


p [1,2,"3",4,"5",6].grep String #=> ["3", "5"]
p ['red', 'white', 'blue'].grep /w/ #=> ['white]
p [10, 20, 30, 40, 50].grep 20..40 #=> [20, 30, 40]

# grep also takes a block for mutations

p ['red', 'white', 'blue'].grep(/w/) {|x| x.upcase} #=> ['WHITE]

# or just do it like this with map and don't confuse everybody
p ['red', 'white', 'blue'].grep(/w/).map {|x| x.upcase} #=> ['WHITE]

=begin
<p>take and drop look handy</p>
=end

a = [1,2,3]
p a.take(2) #=> [1,2]
p a #=> [1,2,3] (unchanged)

p a.drop(2) #=> [3]
p a #=> [1,2,3] (unchanged)

=begin
<p>take_while and drop_while are like first and select</p>
=end

p [12,32,54,100,445,35353,333333].take_while {|x| x < 500} #=> [12, 32, 54, 100, 445]
p [12,32,54,100,445,35353,333333].drop_while {|x| x < 500} #=> [35353, 333333]


=begin
<p>min_by is less confusing than min and the spaceship operator if you aren't using numbers</p>
=end


p %w{red blue green purple yellow}.min #=> blue
p %w{red blue green purple yellow}.min_by {|x| x.size } #=> red
p %w{red blue green purple yellow}.min_by {|x| x[0].ord } #=> blue



=begin
<p>Three ways to sort an array of custom classes</p>
=end

# define a method <=> for things 
things.sort

# specify how to sort
things.sort {|a,b| a.value <=> b.value } 

# specify what to sort on
things.sort_by {|a| a.value } 


=begin
<p>Include Comparable, define <=>, and get comparison abilities for your class</p>
=end

class ComparableClass
  include Comparable
  attr_accessor :value
  def initialize(value)
    self.value = value
  end
  def <=>(other)
    value <=> other.value
  end
  def inspect
    value
  end
end

objs = 5.times.map {|x| ComparableClass.new(x) }
p objs[0] < objs[3] #=> true
p objs[2] < objs[1] #=> false






=begin
<p>Enumerators can be implemented like below (enumerators depend on fibers ).  I
wrote this in 5 minutes but it still hurts my head to think about.</p>
=end


class MyEnumerator

  def initialize(&b)

    @fiber = Fiber.new do
      yielder = ->(x){ Fiber.yield x }
      b.call(yielder)
    end

  end

  def next
    @fiber.resume
  end

end


e = MyEnumerator.new do |y|
  [1,2,3].each do |x| 
    y.yield x # y.call(x) seems to work for custom enumerator, not for standard enumerator
  end
end

p e.next #=> 1
p e.next #=> 2
p e.next #=> 3



=begin
<p>enum_for takes a method to enumerate on, and could be implemented like this</p>
=end

class Array
  def my_enum_for(method = :each)
    Enumerator.new do |y|
      send(method) do |x|
        y << x
      end
    end
  end
end

e = [1,2,3].my_enum_for(:map)

p e.next #=> 1
p e.next #=> 2
p e.next #=> 3


=begin
<p>Protect an object with its enumerable (not sure how useful this is)</p>
=end

a = (0..9).to_a
e = a.enum_for
p e.map {|x| x} #=> [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
e << 10 #=x undefined method `<<' for Enumerator:



=begin
<p>Making a class 'enumerable' without including Enumerable by hooking its each() up to enumerator</p>
=end


class MyClass
  def initialize
    @a = (0..9).to_a
  end
  def each
    @a.each {|x| yield x}
  end
end

obj = MyClass.new
obj.each {|x| print x } #=> 0123456789

p obj.enum_for(:each).min #=> 0
p obj.enum_for(:each).max #=> 9


=begin 
<div class='header'>
 <span>Regex</span> 
</div>
=end


=begin
<p>Three ways to test for regex match, ugh</p>
=end

re = /there/
string = 'here there everywhere'

puts "Match!" if re.match(string)
puts "Match!" if string =~ re
puts "Match!" if re =~ string # reverse of previous
puts "Match!" if re === string
puts "Match!" if string === re #=x doesn't work in reverse

=begin 
<div class='header'>
 <span>Object Individualization</span> 
</div>
=end


=begin
<p>extend() : "the mixing of a module into an object's singleton class"</p>
<i>From ruby-doc.org: "Adds to obj the instance methods from each module given as a parameter."</i><br />
<i>Common use: dump a modules instance methods into a class's singleton class</i><br />
<i>Difference from include(): which dumps modules instance methods into classes instance methods</p>
=end

module MyModule
  def hello
    puts :hello
  end
end

obj = Object.new
obj.extend MyModule
obj.hello #=> hello

String.extend MyModule
'asdf'.class.hello #=> hello

# this would have worked too
class << obj
  include MyModule # <!include>
end

obj.hello #=> hello


=begin 
<div class='header'>
 <span>Callable and Runnable Objects</span> 
</div>
=end


=begin
<p>Some idioms used used proc objects</p>
=end

# currying
def mult(factor)
  Proc.new do |x|
    x * factor
  end
end
mult3 = mult(3)
p mult3.call(3) #=> 9

# counter
def mk_counter
  count = 0
  Proc.new { count = count + 1 }
end

counter = mk_counter
p counter.call #=> 1
p counter.call #=> 2
p counter.call #=> 3



=begin
<p>Weird way to run runable object</p>
=end

proc = Proc.new {|x| puts x }

# normal
proc.call('asdf') #=> asdf

# not that weird
proc['asdf'] #=> asdf

# weird
proc.('asdf') #=> asdf


=begin
<p>instance_eval for more friendly configuration</p>
=end

class Person

  def initialize(&block)
    # the secret sauce - run block in context of self
    instance_eval(&block) 
  end

  # both setter and getter
  def first(name=nil)
    @first = @first || name
  end

  # both setter and getter
  def last(name=nil)
    @last = @last || name
  end

end

person = Person.new do
  first 'Bob'
  last 'Smith'
end

p person.first #=> Bob
p person.last #=> Smith



=begin 
<div class='header'>
 <span>Callbacks, hooks, and runtime introspection</span> 
</div>
=end


=begin
<p>method_missing can be used for delegation</p>
=end

class MyArray
  
  def initialize
    @array = []
  end

  def method_missing(method, *args, &b)
    @array.send(method, *args, &b)
  end

end

ma = MyArray.new
ma << 1
ma << 2
ma << 3
p ma.join(', ') #=> "1, 2, 3"


=begin
<p>use included to mixin a class method with include()</p>
<i>could use extend() but sometimes you want to mixin *both* class and instance methods</i>
=end


module MyModule

  def a_instance_method
    puts 'hello from a_instance_method'
  end

  def self.included(c)
    def c.a_class_method
      puts 'hello from a_class_method'
    end
  end

end

class MyClass
  include MyModule
end

MyClass.a_class_method #=> hello from a_class_method
MyClass.new.a_instance_method #=> hello from a_instance_method



=begin
<p>Note: Is it true there is no way to mixin module class methods?</p>
<i>Using include() we can include instance methods into a class.</i><br />
<i>Using extend() we can include instance methods into an objects singleton class.</i><br />
<i>There might be with unbind and bind, but its looking like a mess.</i>
<i></i>
=end

# emit
# /emit












<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

