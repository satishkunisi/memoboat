class Memo < ActiveRecord::Base
  include PgSearch

  attr_accessible :title, :body, :notebook_id, :image

  validates :title, :notebook_id, :presence => true
  validates :body, :length => {:maximum => 4000}

  pg_search_scope :search_text, :against => {:title => 'A', :body => 'B'}
  
  before_validation :generate_default_title

  belongs_to :notebook,
             :class_name => "Notebook",
             :foreign_key => :notebook_id,
             :primary_key => :id

  has_one :author, :through => :notebook, :source => :user

  has_many :taggings, :dependent => :destroy
  has_many :tags, :through => :taggings, :source => :tag

  has_attached_file :image, :styles => {
    :big => "1000x1000>",
    :small => "100x100#"
  }

  validates_attachment_content_type :image, 
                                    :content_type => %w(image/jpeg image/jpg image/png)

  def generate_default_title
    return nil unless self.title.length == 0 
    random_title = "Untitled Note #{Time.now.to_i}"

    if Memo.find_by_title(random_title)
      generate_default_title
    else 
      self.title = random_title
    end
  end

  def image_big_url
    self.image.url(:big)
  end

  def image_small_url
    self.image.url(:small)
  end

  def image_url
    self.image.url
  end
end