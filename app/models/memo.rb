class Memo < ActiveRecord::Base
  attr_accessible :title, :body, :notebook_id

  validates :title, :notebook_id, :presence => true
  validates :body, :length => {:maximum => 4000}

  before_validation :generate_default_title

  belongs_to :notebook,
             :class_name => "Notebook",
             :foreign_key => :notebook_id,
             :primary_key => :id

  has_one :author, :through => :notebook, :source => :user

  has_many :taggings
  has_many :tags, :through => :taggings, :source => :tag

  def generate_default_title
    return nil unless self.title.length == 0 
    random_title = "Untitled Note #{Time.now.to_i}"

    if Memo.find_by_title(random_title)
      generate_default_title
    else 
      self.title = random_title
    end
  end
  
end