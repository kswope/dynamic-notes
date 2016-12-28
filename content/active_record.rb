
=begin
<div class='header'>
 <span><a href='http://guides.rubyonrails.org/active_record_basics.html'>AR Basics</a></span> 
</div>
=end

# ActiveRecord::Base is out, ApplicationRecord is in
class Product < ApplicationRecord
end


# didn't know about this one, or have had any reason to use it
# skips validations!
Model.update_all "deleted = 1"


=begin
<div class='header'>
 <span><a href='http://guides.rubyonrails.org/active_record_migrations.html'>AR Migrations</a></span> 
 <span>
</div>
=end



# looks good (set it to run with every rake db:migrate)
"The annotate_models gem automatically adds and updates comments at the top of
each model summarizing the schema if you desire that functionality."


# if your have a migration that executes custom SQL sql statements that cannot
# be expressed in schema.rb then switch the schema output to to :sql in
# config/application.rb ( doesn't look like its there when the default is :ruby
# )




=begin
<div class='header'>
 <span><a href='http://guides.rubyonrails.org/active_record_validations.html'>AR Validations</a></span> 
 <span>
</div>
=end


# These (among more obscure ones) skip validations so watch out!  These just
# seem dangerous to me, especially since they are so readily available.  They
# also update the DB.  I might write a gem that overrides these with a warning.
# Name it "no_invalid_updates" and rename to update_all_without_validation?,
# update_all_without_further_consideration?  update_all_with_extreme_prejudice
# update_attributes_without_validations?
obj.update_all
obj.update_attribute
obj.update_column
obj.update_columns

# Update will updated the DB but run the validations.
obj.update(attributes)
Model.update(id, attributes)

# Note that validations are only run when validation is saved() or create(), so
# errors will not be reported.  valid? is another way to run the validations,
# which will fill errors.messages.  In other words, dont look in object.errors
# until you've run either saved, create, or valid?

# get errors for specific field with ( but only after validations have been run )
obj.errors[:attribute]

irb> Person.new.errors[:name].any? #=> false
irb> Person.create.errors[:name].any? #=> true

# These should work too but I can't test them now
irb> p.valid?
irb> p.errros[:name].any? #=> true

irb> p.validate # alias of valid?
irb> p.errros[:name].any? #=> true


# finally rails 5 stopped being stupid and gives you access to error messges as
# keys and not strings, not sure yet if you can add your own
class Person < ApplicationRecord
  validates :name, presence: true
end
 
>> person = Person.new
>> person.valid?
>> person.errors.details[:name] #=> [{error: :blank}]

# validation: acceptance, if not in database a virutal field will be created for it
validates :terms_of_service, acceptance: true # for checkboxes

# if using confirmation validation don't forget the presence validation too
class Person < ApplicationRecord
  validates :email, confirmation: true
  validates :email_confirmation, presence: true
end


# uniqueness validations are case sensitive by default!  But mysql is case
# insensitive by default!
# email must be case insensitive
# username probably should be case sensitive, or should it?
validates :username, uniqueness: { case_sensitive: true } # <--- default!
validates :email, uniqueness: { case_sensitive: false }


# A Proc :message value is given two arguments: the object being validated, and
# a hash with :model, :attribute, and :value key-value pairs.   I don't
# understand what :value key-value pairs are.
validates :username, message: ->(object, data) do
  "Sorry #{object.name}, is already taken" 
end

# the default ":on" in a validation is upon update and create, but you can
# change that with
validates username, uniqueness: true, on: create # dupes allowed on update
validates username, uniqueness: true, on: update # dupes allow on create

# Note: The valid? method will verify that the errors collection is empty

# errors add is same as appending an error to messages arrays 
errors.add(:username, 'blah')
errors.messages[:name] << 'blah'


errors.add(:name, :invalid_characters)
errors.add(:name, "cannot contain the characters !@#%*()_-+=")



# error details
def my_custom_validator
  errors.add(:username, 
end



=begin
<div class='header'>
 <span><a href='http://guides.rubyonrails.org/active_record_callbacks.html'>AR Callbacks</a></span> 
 <span>
</div>
=end


# the AR lifecycle callbacks can take a block
before_create |x|
  # do something
end

# after_save is run both upon create and update.

# Use after_initialize if you are tempted to override initialize.

# after_find is called whenever AR loads a record from the database, good spot
# for caching?

# The callback chain is wrapped in database transation.  If any BEFORE callback
# returns false a rollback happens.  'after' callbacks can only break out of
# transaction by raising an exception. 


=begin
<div class='header'>
 <span><a href='http://guides.rubyonrails.org/association_basics.html'>AR Associations</a></span> 
 <span>
</div>
=end

# Finally migrations support foreign key constraints, and in a nice way.
# But I dont see a cascading delete.
create_table :accounts do |t|
  t.belongs_to :supplier, index: true, unique: true, foreign_key: true
  # ...
end


# handy way to bust the cache provided by reload
@author = @book.reload.author


=begin
<div class='header'>
 <span><a href='http://guides.rubyonrails.org/active_record_querying.html'>AR Querying</a></span> 
 <span>
</div>
=end


# Don't forget take(), seems useful but I've never used it before.  I'd
# describe it as a limited all(), in which case it prefer it was named some(x)
client = Client.take # defaults to 1
clients = Client.take(2)

# To avoid big record set memory problems you can use find_each
User.find_each do |user|
  # do something
end

# can end a more complicated query also
# NOTE: cannot use order or limit
User.where(weekly_subscriber: true).find_each do |user|
  # ...
end

# also returns an enumerator
Person.find_each.with_index do |person, index|
  # ...
end

# if you prefer batches (defaults to 1000)
Person.where("age > 21").find_in_batches do |group|
end



<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

