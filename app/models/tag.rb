class Tag < ActiveRecord::Base
  attr_accessible :name, :user_id, :id
  validates :name, :user_id, :presence => true

  belongs_to :user
  has_many :taggings
  has_many :memos, :through => :taggings, :source => :memo
end