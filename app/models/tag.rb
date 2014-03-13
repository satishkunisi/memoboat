class Tag < ActiveRecord::Base

  attr_accessible :name, :id
  validates :name, :uniqueness => true

  has_many :taggings
  has_many :memos, :through => :taggings, :source => :memo

  def self.destroy_if_memoless(tag)
    tag.destroy! if tag.taggings.count < 1
  end

  def self.memos_by_user(tag_name, user)
    Memo.joins(:tags).joins(:notebook).where('notebooks.user_id = ? AND tags.name = ?', user.id, tag_name)
  end

end