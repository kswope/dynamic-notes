
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


left off page 119

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
<ul>
<li>
grep calls === on argument for each element
</li>
<li>
same as enumerable.select {|element| expression === element }
</li>
</ul>
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

# emit
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
# /emit






=begin
<p>Enumerators can be implemented like below (enumerators depend on fibers ).  I
wrote this in 5 minutes and it still hurts my head to think about.</p>
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
    y.yield x
  end
end

p e.next #=> 1
p e.next #=> 2
p e.next #=> 3














<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

