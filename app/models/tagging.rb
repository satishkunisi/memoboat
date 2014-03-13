class Tagging < ActiveRecord::Base
  attr_accessible :tag_id, :memo_id
  validates :tag_id, :memo_id, :presence => true
  validates :tag_id, :uniqueness => { :scope => :memo_id }

  belongs_to :tag
  belongs_to :memo

  after_create { memo.update_index }
end