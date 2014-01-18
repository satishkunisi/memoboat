class Notebook < ActiveRecord::Base
  attr_accessible :title, :user_id

  validates :title, :presence => true, :uniqueness => { :scope => :user_id }
  validates :user_id, :presence => true, :numericality => true

  belongs_to :user,
             :class_name => "User",
             :foreign_key => :user_id,
             :primary_key => :id

  has_many :memos,
           :class_name => "Memo",
           :foreign_key => :notebook_id,
           :primary_key => :id

end