
# emit
# hide
def println(*str)
  print *str.join(' '), "\n"
end
# /hide
# /emit


=begin 
<div class='header'>
 <span>Pickaxe Ruby Crystallized (stuff I keep forgetting, and more)</span> 
</div>
=end



# use %w and %W to create arrays *of strings*
a = %w{one two three}
println a #=> ["one", "two", "three"]

# interpolation works with %W
var = 'four'
a = %W{one two three #{var}}
println a #=> ["one", "two", "three", "four"]

# if keys in hashes are symbols you can use : notation, but JSON won't convert them back to symbols
require 'json'
h = {a:1, b:2, c:3}
p h #=> {:a=>1, :b=>2, :c=>3}
h = JSON.parse(h.to_json)
p h #=> {"a"=>1, "b"=>2, "c"=>3}

# using a string as a hash key will dupe and freeze the key
key = 'the-key'
h = {key => 'the-value'}
println h #=> {"the-key"=>"the-value"}
key.chop!
p key #=> the-ke
println h #=> {"the-key"=>"the-value"} <! the-key >

# constants can't be reassigned but they can be messed with unless you freeze them
MyConstant = 'red'
MyConstant.gsub! /^.*$/, 'blue'
p MyConstant #=> blue
MyConstant.freeze
MyConstant.gsub! /^.*$/, 'green' #=x can't modify frozen String

# one liner
MyConstant = 'red'.freeze

### "super" without () calls method of same name in parent class with original args

class Top
  def hi(name)
    puts 'here in Top ' + name <! name >
  end
end

class Bottom < Top
  def hi(name) <! name >
    super <! super >
    puts 'here in Bottom ' + name
  end
end

Bottom.new.hi('kevin')
#=> here in Top kevin
#=> here in Bottom kevin


### blocks and scope, defined outside block

a = 'outside'
1.times do
  puts a #=> outside
end

puts a #=> outside

### blocks and scope, defined inside block
1.times do
  b = 'inside'
  puts b #=> inside
end

puts b #=x undefined local variable or method `b' for main:Object (NameError)

### blocks and scope, defined inside || shadows

c = 'outside'
1.times do |;c| <! ;c >
  c = 'inside'
  puts c #=> inside
end

puts c #=> outside


### array acting method (doesn't work with plain functions) and bonus class instance variable

class MySingletonArray
  
  @data = [] # class instance variable

  class << self

    def [](*indices)
      @data[*indices]
    end

    def []=(*indices, value)
      @data[*indices] = value
    end

  end

end

MySingletonArray[1] = :one
MySingletonArray[2] = :two
MySingletonArray[3] = :three

p MySingletonArray[1] #=> :one
p MySingletonArray[2] #=> :two 
p MySingletonArray[3] #=> :three
p MySingletonArray[1..3] #=> [:one, :two, :three]


### ruby "block expression" is not scoped like ruby blocks ( not like javascript { let a = 1 } )

begin
  a = "in 'block'"
end
puts a #=> "in block"

1.times do
  b = "in 'block'"
end
puts b #=x undefined local variable or method `b' for main:Object (NameError)



### a method definition can contain other method definitions - never ever used this before
### partial function or currying?  Do I care?
def add_it(x)
  $gAdd = x # NOTE: no closures happen here, so this has to be a global
  def add_it(x)
    $gAdd + x
  end
end

add_it(5)
puts add_it(1) #=> 6
puts add_it(2) #=> 7
puts add_it(3) #=> 8

### keyword arguments, ( look the same from a caller point of view? )

def myf(args)
  println args
end
myf(a:1, b:2) #=> {:a=>1, :b=>2}

def myf(**args)
  println args
end
myf(a:1, b:2) #=> {:a=>1, :b=>2}

def myf(a:undefined, b:undefined)
  println a, b
end
myf(a:1, b:2) #=> 1 2

### weird class "can-opener" syntax that comes up sometimes

class MyClass; end

class << MyClass
  def hello
    puts :hello
  end
end

p MyClass.hello #=> hello

obj = MyClass.new

class << obj
  def goodbye
    puts :goodbye
  end
end

obj.goodbye #=> goodbye

### class macros are just class methods of the parent class

# "Class attribute declarations are not part of the Ruby syntax; they are simply
# methods defined in class Module that create accessor methods automatically."

class One
  def self.macro
    puts 'in macro'
  end
end

class Two < One
  macro
end

# if you override new, don't forget to call super or you get nowhere

class MyClass
  def self.new
  end
end

MyClass.new #=> nil
# emit

# Interesting?  I don't think there is any possible way to call an instance
# method defined in a module without mixing it in to another class, which makes
# sense because 'new' is the only way to reach a method (by way of its
# instantiated class) and a module is like class but without the 'new'
#
# I spoke too soon, you can use module_function macro to copy them to module methods


module MyMod
  def hello
    puts :hello
  end
end

class MyClass
  include MyMod
end

MyClass.new.hello #=> hello


# /emit






=begin
<br /> <br /> <br />
<br /> <br /> <br />
<br /> <br /> <br />
=end


