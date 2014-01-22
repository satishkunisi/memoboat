class Tagging < ActiveRecord::Base
  attr_accessible :tag_id, :memo_id
  validates :tag_id, :memo_id, :presence => true

  belongs_to :tag
  belongs_to :memo
end