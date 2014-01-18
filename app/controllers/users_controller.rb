class UsersController < ApplicationController
  before_filter :require_logged_out, :only => [:new, :create]
  before_filter :require_authorization, :except => [:new, :create]

  def new
    @user = User.new
  end

  def create
    @user = User.new(params[:user])

    if @user.save
      login!(@user)
      flash[:notices] = "Welcome to MemoBoat!"
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
    end
  end

  def show
  end

  def update
  end

  def edit
  end

  def destroy
  end
end
