class User < ActiveRecord::Base
  attr_accessible :email, :session_token, :password
  attr_reader :password

  validates :email, :session_token, :presence => true
  validates :password_digest, :presence => {:message => "Password can't be blank"}
  validates :password, :length => {:minimum => 6, :allow_nil => true}

  before_validation :ensure_session_token

  has_many :notebooks,
           :class_name => "Notebook",
           :foreign_key => :user_id,
           :primary_key => :id,
           :dependent => :destroy

  def self.find_by_credentials(user_params)
    user = User.find_by_email(user_params[:email])

    if user && user.is_password?(user_params[:password])
      user
    else
      nil
    end
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
  end

  private
  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end

end
