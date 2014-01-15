class Notebook < ActiveRecord::Base
  attr_accessible :title, :user_id

  validates :title, :presence => true, :uniqueness => true
  validates :user_id, :presence => true, :numericality => true

  belongs_to :user,
             :class_name => "User",
             :foreign_key => :user_id,
             :primary_key => :id

end