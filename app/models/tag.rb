class Tag < ActiveRecord::Base

  include Tire::Model::Search
  include Tire::Model::Callbacks

  mapping do 
    indexes :id, :index => :not_analyzed
    indexes :title, :analyzer => :standard
    indexes :author, :index => :not_analyzed
    indexes :body, :analyzer => :standard
    indexes :tags, :analyzer => :standard
  end

  attr_accessible :name, :user_id, :id
  validates :name, :user_id, :presence => true
  validates :name, :uniqueness => {:scope => :user_id}

  belongs_to :user
  has_many :taggings
  has_many :memos, :through => :taggings, :source => :memo
end