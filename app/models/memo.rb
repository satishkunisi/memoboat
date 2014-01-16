class Memo < ActiveRecord::Base
  attr_accessible :title, :body, :notebook_id

  validates :title, :body, :notebook_id, :presence => true
  validates :body, :length => {:maximum => 4000}

  belongs_to :notebook,
             :class_name => "Notebook",
             :foreign_key => :notebook_id,
             :primary_key => :id

  has_one :author, :through => :notebooks, :source => :user
  
end